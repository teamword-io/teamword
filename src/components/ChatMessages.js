import React from 'react';
import {useTranslation} from "react-i18next";
const ChatMessages = ({ messages }) => {
  const { t } = useTranslation();
  return (
    <div id="chatbox-messages" className="card-body">
      {messages.map((message, idx) => (
        <div
          key={idx}
          data-testid="chatbox-message"
          className={`msg-${message.type}`}
        >

          {message.systemMsg && (
              <em>
              {message.username} {t(message.systemMsg)}
              </em>
          )}

          {(!message.username && !message.systemMsg) && message.msg}

          {(message.username && !message.systemMsg) && (
            <>
              <b>{message.username}:</b> {message.msg}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
export default ChatMessages;
