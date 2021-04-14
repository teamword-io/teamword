import React from 'react';
import { GameContext } from '../providers/GameProvider';
import Settings from "../components/Settings";
import Header from "./Header";
import Darkmode from "./Darkmode";
import {SocketContext} from '../providers/SocketProvider';
import {useTranslation} from "react-i18next";
import useSound from 'use-sound';
import Avatar from "./Avatar";
import safeGTAG from "../helper/gtag";

const Lobby = (props) => {
    const {  users, actionType, roomID, canStart, haveSound, settings, setSettings, teams } = React.useContext(
        GameContext
    );
    const [isClicked, setIsClicked] = React.useState(false);
    const [roomStatus, setRoomStatus] = React.useState(false);
    // const [counter, setCounter] = React.useState(3);
    const [teamError, setTeamError] = React.useState(false);

    // translation
    const { t } = useTranslation();
    const [joinSound] = useSound('/sounds/join.mp3');
    const [changeTeamSound] = useSound('/sounds/pop-up-on.mp3',{ volume: 0.60 });

    const socket = React.useContext(SocketContext);

    const handleChange = (evt) => {
        const value = evt.target.value;
        setSettings({
            ...settings,
            [evt.target.name]: value
        });
    }

    const changeTeam = (e) => {
        if(haveSound) {
            changeTeamSound();
        }
        let current = parseInt(e.currentTarget.dataset.team,10) +1;
        let maxTeamNo = Math.ceil(document.querySelectorAll('.player-list .lobby-users').length / 2);

        if(maxTeamNo === 1) return;
        let next = (current + 1 > maxTeamNo) ? 1 : current + 1;

        socket.emit('changeTeam', current -1, next -1);
    }

    React.useEffect(() => {
        socket.on('roomStatus', (msg) => {
            let info = '';
            if(msg === 0) {
                info = t('game.canstart');
            } else {
                info+= t('game.need')+' '+msg+' '+ t('game.moreplayers');
            }

            setRoomStatus(info);
        });


        socket.on('teamError', (msg) => {
            setTeamError(true);
            setIsClicked(false);
        });

        return () => {
            socket.removeEventListener('roomStatus');
        };
    });

    React.useEffect( () => {
        if(haveSound) {
            joinSound();
        }
    },[users, haveSound, joinSound]);

    React.useEffect(() => {
        if(actionType === 'create') {
            socket.emit('settingsChange',settings);
        }
    }, [actionType,socket,settings]);

    return (
        <>
            <div className="container lobby-container">
                <Header/>
                <Darkmode />
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>{t('lobby.settings')}</h4>
                            </div>
                            <div className="card-body">
                                <Settings values={settings} onChangeValue={handleChange} actionType={actionType}></Settings>

                                {actionType === 'create' &&
                                <button
                                    className="btn btn-primary btn-full-width"
                                    disabled={isClicked || !canStart}
                                    onClick={() => {
                                        if (isClicked || !canStart) {
                                            return;
                                        }
                                        socket.emit('gameStart', settings, ( response) =>{
                                            if(response.valid) {
                                                safeGTAG('event','start_game', {
                                                    players: document.querySelectorAll('.lobby-users').length
                                                });
                                            }
                                        });
                                        setIsClicked(true);
                                    }}
                                >
                                    {t('lobby.startGame')}
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>{t('lobby.players')}</h4>
                            </div>
                            <div className="card-body">
                                <div id="room-info" className="mb-2">
                                    {roomStatus}
                                </div>
                                <div className="player-list d-flex flex-wrap justify-content-evenly">
                                    {teams.map((teamU, index) => {
                                        return (
                                            <>
                                                {teamU.map((user) => {
                                                    if(user.id === socket.id) {
                                                        return (
                                                            <div className="lobby-users" data-team={index} key={user.id}
                                                                 onClick={e => {
                                                                     changeTeam(e)
                                                                 }}
                                                            >
                                                                <span className="team-no">#{index + 1}</span>
                                                                <Avatar avatar={user.avatar}/>
                                                                <b>{user.username} {t('lobby.you')}</b>
                                                            </div>
                                                        )
                                                    } else return '';
                                                })}
                                            </>
                                        )
                                    })}

                                    {teams.map((teamU, index) => {
                                        return (
                                            <>
                                                {teamU.map((user) => {
                                                    if(user.id !== socket.id) {
                                                        return (
                                                            <div className="lobby-users" data-team={index} key={index+user.id}>
                                                                <span className="team-no">#{index +1}</span>
                                                                <Avatar avatar={user.avatar}/>
                                                                <b>{user.username}</b>
                                                            </div>
                                                        )
                                                    } else return '';
                                                })}
                                            </>
                                        )
                                    })}
                                </div>
                                <p className="small">{t('lobby.changeTeam')}</p>

                                {teamError && <p className="error">{t('lobby.teamError')}</p> }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <label className="form-label">{t('lobby.invite')}</label>
                            <div className="input-group">
                                <input
                                    id="lobby-room-link"
                                    value={`https://teamword.io/${roomID}`}
                                    readOnly={true}
                                    className="form-control"
                                />
                              <button
                                  onClick={e => {
                                      let input = document.getElementById('lobby-room-link');
                                      let btn = document.getElementById('copy-button');
                                      input.select();
                                      input.setSelectionRange(0, 99999);
                                      try {
                                          var success = document.execCommand('copy');
                                          if (success) {
                                              btn.innerHTML = t('lobby.copied');
                                          } else {
                                              btn.innerHTML = t('lobby.copyown');
                                          }
                                      } catch (err) {
                                          btn.innerHTML = t('lobby.copyown');
                                      }
                                      setTimeout(() => btn.innerHTML = t('lobby.copy'), 2000);
                                  }}
                                  className="btn btn-primary" type="button" id="copy-button" data-toggle="tooltip"
                                      data-placement="bottom" title="" data-original-title="Copy to Clipboard">
                                  {t('lobby.copy')}
                              </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Lobby;