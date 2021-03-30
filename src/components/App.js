import React, { Suspense } from 'react';
import GameProvider from '../providers/GameProvider';
import Game from './Game';
import Home from './Home';
import Darkmode from "./Darkmode";
import CookieConsent from "./CookieConsent";
import Footer from "./Footer";
import i18n from '../i18n';
import {SocketContext, socket} from "../providers/SocketProvider";

export default function App() {
    const [username, setUsername] = React.useState(null);
    const [actionType, setActionType] = React.useState(null);
    const [roomID, setRoomID] = React.useState(null);
    const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || 'en';
    let curLng = getCurrentLng().substring(0, 2);
    const availableLng = ['en','de','fr','it','nl'];

    if(!availableLng.includes(curLng)) {
        curLng = 'en';
    }

    const [settings, setSettings] = React.useState({
        language: curLng,
        rounds: 6,
        roundTime: 80000
    });

    if (username !== null && roomID !== null && actionType !== null) {
        return (
            <>
                <Suspense fallback="loading">
                    <SocketContext.Provider value={socket}>
                        <GameProvider exitGame={() => {setUsername(null); setActionType(null); setRoomID(null);}} username={username} roomID={roomID} actionType={actionType} settings={settings}>
                            <Game></Game>
                            <Footer/>
                        </GameProvider>
                        <CookieConsent />
                    </SocketContext.Provider>
                </Suspense>
            </>
        );
    } else {
        return (
            <>
                <Suspense fallback="loading">
                    <SocketContext.Provider value={socket}>
                        <GameProvider settings={settings} setSettings={setSettings} exitGame={() => {setUsername(null); setActionType(null); setRoomID(null);}}>
                            <Darkmode></Darkmode>
                            <Home setUsername={setUsername} setActionType={setActionType} setRoomID={setRoomID} setSettings={setSettings}></Home>
                            <Footer/>
                        </GameProvider>
                        <CookieConsent />
                    </SocketContext.Provider>
                </Suspense>
            </>
        )
    }
};
