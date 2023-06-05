import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import '../style/SensoryMap.css';

const SensoryMap = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const autocompleteRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/maps`);
        const data = await response.json();
        const filteredData = data.filter((location) =>
          location.address.toLowerCase().includes('new york city')
        );
        setMarkers(filteredData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      setMapCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const { rating, comment } = event.target;

    if (!isLoggedIn) {
      console.error('You must be logged in to submit a review.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/maps/${selectedMarker.id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: rating.value,
          comment: comment.value
        })
      });
      const newReview = await response.json();
      console.log('New review:', newReview);
      const reviewsResponse = await fetch(`${process.env.REACT_APP_API_URL}/maps/${selectedMarker.id}/reviews`);
      const reviewsData = await reviewsResponse.json();
      setSelectedMarker({ ...selectedMarker, reviews: reviewsData });
      rating.value = '';
      comment.value = '';
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  useEffect(() => {
    const loadMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.onload = () => setIsMapLoaded(true);
      document.head.appendChild(script);
    };

    loadMapScript();
  }, []);

  return (
    <div className="container">
      <img src="/assets/logo.png" alt="Logo" className="logo" />

      <div className="map">
        <div style={{ width: '100%', height: '400px' }}>
          {isMapLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={mapCenter}
              zoom={10}
              onLoad={(map) => setIsMapLoaded(true)}
            >
              <Autocomplete
                ref={autocompleteRef}
                style={{ width: '100%' }}
                types={['geocode']}
                bounds={{ north: 40.9176, south: 40.4774, east: -73.7004, west: -74.2591 }}
                onPlaceChanged={handlePlaceSelect}
              >
                <div>
                  {markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      position={{ lat: marker.latitude, lng: marker.longitude }}
                      onClick={() => handleMarkerClick(marker)}
                    />
                  ))}
                </div>
              </Autocomplete>

              {selectedMarker && (
                <InfoWindow
                  position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
                  onCloseClick={handleInfoWindowClose}
                >
                  <div>
                    <h2>{selectedMarker.name}</h2>
                    <p>{selectedMarker.address}</p>
                    <p>{selectedMarker.phone}</p>

                    {isLoggedIn ? (
                      <form onSubmit={handleReviewSubmit}>
                        <label>
                          Rating:
                          <input type="number" name="rating" min="1" max="5" required />
                        </label>
                        <br />
                        <label>
                          Comment:
                          <textarea name="comment" required></textarea>
                        </label>
                        <br />
                        <button type="submit">Submit Review</button>
                      </form>
                    ) : (
                      <p>You must be logged in to submit a review.</p>
                    )}

                    {selectedMarker.reviews && (
                      <div>
                        <h3>Reviews</h3>
                        {selectedMarker.reviews.map((review) => (
                          <div key={review.id}>
                            <p>Rating: {review.rating}</p>
                            <p>Comment: {review.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default SensoryMap;
