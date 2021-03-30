import React from 'react';
import TeamMessages from "./TeamMessages";
import TeamForm from "./TeamForm";
import {GameContext} from "../providers/GameProvider";
import {SocketContext} from "../providers/SocketProvider";
import {useTranslation} from "react-i18next";
const Teambox = () => {
    const [messages, setMessages] = React.useState([]);
    const {
        writingPermission,
        chooseWords
    } = React.useContext(GameContext);
    const { t } = useTranslation();
    const [isActive, setIsActive] = React.useState(writingPermission);
    const socket = React.useContext(SocketContext);

    React.useEffect(() => {
        setIsActive(writingPermission);

        setTimeout( () => {
            setIsActive(false);
            let input = document.getElementById('teambox-input');
            if(input) {
                input.focus();
            }
        }, 300);

    }, [writingPermission]);

    React.useEffect(() => {
        socket.on('wroteWord', (msg) => {
            setMessages([...messages, msg]);
        });
        socket.on('roundEnd', () => {
            setMessages([]);
        })
        return () => {
            socket.removeEventListener('wroteWord');
        };
    }, [messages,socket]);

    return (
        <div id="teambox" className="col-md-6 col-xl-7">
            <div className="card">
                <TeamMessages messages={messages}></TeamMessages>
                <div className="card-footer">
                    <TeamForm></TeamForm>
                    <div className={`your-turn ${isActive ? "active" : ""}`}>{t('game.yourTurn')}</div>
                </div>
            </div>
            <div className="chooseWord">

            </div>
        </div>
    );
};

export default Teambox;