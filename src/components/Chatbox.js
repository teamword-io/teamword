import React from 'react';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import {SocketContext} from '../providers/SocketProvider';
import useSound from 'use-sound';
import {GameContext} from "../providers/GameProvider";
const Chatbox = () => {
    const [messages, setMessages] = React.useState([]);
    const {
        haveSound
    } = React.useContext(GameContext);
    const socket = React.useContext(SocketContext);
    const [play] = useSound('/sounds/rightguess.mp3');

    React.useEffect(() => {
        socket.on('chatMsg', (msg) => {
            if(msg.systemMsg && haveSound) {
                play();
            }
            setMessages([...messages, msg]);
            let chatWrapper = document.querySelector('#chatbox-messages');
            chatWrapper.scrollTo(0, chatWrapper.offsetHeight );
        });
        return () => {
            socket.removeEventListener('chatMsg');
        };
    }, [socket, messages, haveSound, play]);
    return (
        <div id="chatbox" className="col-md-3">
            <div className="card">
                <ChatMessages messages={messages}></ChatMessages>
                <ChatForm></ChatForm>
            </div>
        </div>
    );
};

export default Chatbox;
