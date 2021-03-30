import React from 'react';
import {SocketContext} from '../providers/SocketProvider';
import {useTranslation} from "react-i18next";
const ChatForm = () => {
    const [chatInput, setChatInput] = React.useState('');
    const socket = React.useContext(SocketContext);
    const { t } = useTranslation();
    return (
        <>
        <div className="card-footer">
            <form
                id="chatbox-form"
                onSubmit={(ev) => {
                    ev.preventDefault();
                    if (chatInput === '') {
                    return;
                }
                    let sanitized = chatInput.toLocaleLowerCase().trim();
                    socket.emit('chatMsg', { type: 'chat', msg: sanitized });
                    setChatInput('');
                }}
            >
                <input
                    data-testid="chat-input"
                    type="text"
                    placeholder={t('game.guess')}
                    value={chatInput}
                    className="form-control"
                    onChange={(ev) => setChatInput(ev.target.value)}
                />
            </form>
        </div>
        </>
    );
};
export default ChatForm;
