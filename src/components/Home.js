import React from 'react';
import {SocketContext} from '../providers/SocketProvider';
import Header from "./Header";
import AvatarSettings from "./AvatarSettings";
import {useTranslation} from "react-i18next";
import {GameContext} from "../providers/GameProvider";

const Home = (props) => {
    const [usernameInput, setUsernameInput] = React.useState('');
    const [actionType, setActionType] = React.useState('');
    const [roomIDError, setRoomIDError] = React.useState(false);
    const pathname = window.location.pathname.replace(/^\/+/g, '');
    const [roomIDInput, setRoomIDInput] = React.useState(pathname);
    const [avatar, setAvatar] = React.useState({
        h: Math.floor(Math.random() * 10) + 1,
        e: Math.floor(Math.random() * 10) + 1,
        m: Math.floor(Math.random() * 10) + 1
    });
    const { settings, setSettings } = React.useContext(
        GameContext
    );
    const [activeTab] = React.useState(
        (pathname !== '') ? 'join' : 'create'
    )
    const socket = React.useContext(SocketContext);
    // translation
    const { t } = useTranslation();

    return (
        <div className="container" id="home-container">
            <Header/>
            <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className={`nav-link ${ activeTab === 'create' ? 'active' : ''}`} id="createGame-tab" data-bs-toggle="tab" data-bs-target="#createGame"
                            type="button" role="tab" aria-controls="createGame" aria-selected="true">{t('home.create')}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className={`nav-link ${ activeTab === 'join' ? 'active' : ''}`} id="joinGame-tab" data-bs-toggle="tab" data-bs-target="#joinGame"
                            type="button" role="tab" aria-controls="joinGame" aria-selected="false">{t('home.join')}
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className={`tab-pane fade ${ activeTab === 'create' ? 'show active' : ''}`} id="createGame" role="tabpanel" aria-labelledby="createGame-tab">
                    <form
                        className="create-form card"
                        onSubmit={(ev) => {
                            ev.preventDefault();
                            if (usernameInput === '') {
                                return;
                            }
                            props.setUsername(usernameInput);
                            props.setActionType(actionType);

                            if(actionType === 'create') {
                                socket.emit('createRoom', {
                                    username: usernameInput,
                                    avatar: avatar,
                                    settings: settings
                                }, ( response) =>{
                                    props.setRoomID(response.roomID);
                                    props.setSettings(settings);
                                });
                            }
                        }}
                    >
                        <div className="card-body">
                            <AvatarSettings avatar={avatar} setAvatar={setAvatar}/>
                            <div className="form-row">
                                <input
                                    type="text"
                                    placeholder={t('home.username')}
                                    className="form-control"
                                    value={usernameInput}
                                    onChange={(ev) => setUsernameInput(ev.target.value)}
                                />
                            </div>
                            <button onClick={e => {
                                setActionType('create');
                                // onSubmit(e);
                            }} type="submit" value="create" className="btn btn-primary btn-full-width">{t('home.create')}</button>
                            <br/>
                        </div>
                    </form>
                </div>
                <div className={`tab-pane fade ${ activeTab === 'join' ? 'show active' : ''}`} id="joinGame" role="tabpanel" aria-labelledby="joinGame-tab">
                    <form
                        className="join-form card"
                        onSubmit={(ev) => {
                            ev.preventDefault();
                            if (usernameInput === '' || roomIDInput === '') {
                                return;
                            }
                            props.setUsername(usernameInput);
                            props.setActionType(actionType);
                            if(actionType === 'join') {
                                socket.emit('joinRoom', {
                                    username: usernameInput,
                                    avatar: avatar,
                                    roomID: roomIDInput}, ( response) =>{
                                    if(response.roomID !== false) {
                                        setRoomIDError(false);
                                        props.setRoomID(response.roomID);
                                        setSettings(response.settings);
                                        props.setSettings(response.settings);
                                    } else {
                                        setRoomIDError(true);
                                    }
                                });
                            }
                        }}
                    >
                        <div className="card-body">
                            <AvatarSettings avatar={avatar} setAvatar={setAvatar}/>
                            <div className="form-row">
                                <input
                                    type="text"
                                    placeholder={t('home.username')}
                                    className="form-control"
                                    value={usernameInput}
                                    onChange={(ev) => setUsernameInput(ev.target.value)}
                                />
                            </div>
                            <div className="form-row">
                                <input
                                    type="text"
                                    placeholder={t('home.roomID')}
                                    className="form-control"
                                    value={roomIDInput}
                                    onChange={(ev) => setRoomIDInput(ev.target.value)}
                                />
                                {roomIDError && <div className='error errorMsg'>{t('home.roomError')}</div>}
                            </div>
                            <button onClick={e => {
                                setActionType('join');
                            }} type="submit" value="join" className="btn btn-primary btn-full-width">{t('home.join')}</button>
                        </div>
                    </form>
                </div>

                <div className="card mt-3">
                    <div className="card-header">
                        <h4>{t('home.howto.headline')}</h4>
                    </div>
                    <div className="card-body">
                        <p>
                            {t('home.howto.text1')}
                        </p>
                        <p>
                            {t('home.howto.text2')}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;