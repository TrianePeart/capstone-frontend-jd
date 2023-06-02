import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const SensoryMap = () => {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);
  const map = useRef(null);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`/${API}/locations?search=${searchQuery}`);
      const newLocations = response.data;

      setLocations(newLocations);

      newLocations.forEach((location) => {
        const marker = L.marker([location.latitude, location.longitude]).addTo(map.current);
        marker
          .bindPopup(`<b>${location.name}</b><br>${location.address}`)
          .openPopup();
      });
    } catch (error) {
      console.error('Error fetching locations:', error.response || error);
    }
  };

  useEffect(() => {
    const initializeMap = () => {
      if (map.current !== null) return; // Exit if map is already initialized

      const newMap = L.map(mapRef.current).setView([40.7128, -74.0060], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(newMap);

      map.current = newMap;
    };

    initializeMap();
    fetchLocations();
  }, [searchQuery]);

  const handleRatingChange = (rating, locationId) => {
    setLocations((prevLocations) => {
      return prevLocations.map((location) => {
        if (location.id === locationId) {
          return { ...location, rating };
        }
        return location;
      });
    });
  };

  const handleCommentChange = (comment, locationId) => {
    setLocations((prevLocations) => {
      return prevLocations.map((location) => {
        if (location.id === locationId) {
          return { ...location, reviewComment: comment };
        }
        return location;
      });
    });
  };

  const handleReviewSubmit = async (locationId, rating, comment) => {
    try {
      const response = await axios.post(
        `/${API}/locations/${locationId}/reviews`,
        { rating, comment }
      );
      const newReview = response.data;

      setLocations((prevLocations) => {
        return prevLocations.map((location) => {
          if (location.id === locationId) {
            return { ...location, reviews: [...location.reviews, newReview] };
          }
          return location;
        });
      });
    } catch (error) {
      console.error('Error submitting review:', error.response || error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLocations();
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div>
      <h1>Map</h1>
      <form onSubmit={handleSearch}>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location"
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <div id="map" ref={mapRef} style={{ height: '400px' }}></div>
      {selectedLocation && (
        <div>
          <h3>{selectedLocation.name}</h3>
          <p>{selectedLocation.address}</p>
          <ul>
            {selectedLocation.reviews.map((review) => (
              <li key={review.id}>
                <strong>Rating:</strong> {review.rating},{' '}
                <strong>Comment:</strong> {review.comment}
              </li>
            ))}
          </ul>
          <input
            type="number"
            min="1"
            max="5"
            value={selectedLocation.rating}
            onChange={(e) => handleRatingChange(e.target.value, selectedLocation.id)}
          />
          <textarea
            value={selectedLocation.reviewComment}
            onChange={(e) => handleCommentChange(e.target.value, selectedLocation.id)}
          ></textarea>
          <button
            onClick={() =>
              handleReviewSubmit(selectedLocation.id, selectedLocation.rating, selectedLocation.reviewComment)
            }
          >
            Submit Review
          </button>
        </div>
      )}
      {locations.map((location) => (
        <div key={location.id} onClick={() => handleLocationSelect(location)} role="button" tabIndex={0}>
          <h3>{location.name}</h3>
          <p>{location.address}</p>
        </div>
      ))}
    </div>
  );
};

export default SensoryMap;