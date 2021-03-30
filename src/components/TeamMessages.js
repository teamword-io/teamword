import React from 'react';
const TeamMessages = ({ messages }) => {
  return (
    <div id="teambox-messages" className="card-body">
      {messages.map((message, idx) => (
        <span
          key={idx}
          data-testid="chatbox-message"
        >
          {message.msg}
        </span>
      ))}
    </div>
  );
};
export default TeamMessages;
