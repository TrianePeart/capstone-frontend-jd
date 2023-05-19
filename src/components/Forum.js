import React from 'react';
import Forum from '../components/Forum';
import '../style/Forums.css';

const forumData = [
    {
      forum_title: "I can't stand them",
      forum_description: 'Venting Area',
      forum_created_at: '2022-05-01T12:00:00Z',
      forum_updated_at: '2022-05-01T12:00:00Z',
      forum_posts: "this b**** making me aggy",
    },
    {
      forum_title: 'How are you doing?',
      forum_description: 'Open Conversation',
      forum_created_at: '2022-05-01T12:00:00Z',
      forum_updated_at: '2022-05-01T12:00:00Z',
      forum_posts: 'I am here to let you know that you are doing great!',
    },
  ];
  
  function Forums() {
    return (
      <div className="forum-container">
        <h1>Forum Title</h1>
        <div className="post-list">
          {forumData.map((forum, index) => (
            <div className="post" key={index}>
              <h2>{forum.forum_title}</h2>
              <p>{forum.forum_description}</p>
              <p>{forum.forum_posts}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
export default Forums;