import React from 'react';
import { GameContext} from '../providers/GameProvider';
import {SocketContext} from '../providers/SocketProvider';
import {useTranslation} from "react-i18next";
import Avatar from "./Avatar";

const Scoreboard = () => {
  const { activeUserId, teams, users } = React.useContext(
    GameContext
  );
  const usersSorted = users.sort((userA, userB) => {
    if (userA.score < userB.score) {
      return 1;
    } else if (userA.score > userB.score) {
      return -1;
    } else {
      return 0;
    }
  });
  const socket = React.useContext(SocketContext);
  const { t } = useTranslation();
  const rankings = {};
  const teamusers = {};
  usersSorted.forEach((user, idx) => {
      rankings[user.id] = idx + 1;
      teamusers[user.id] = user;
  });
  return (
    <div id="scoreboard" className="col-md-3 col-xl-2">
      {teams.map((teamU, index) => {
        return (
          <div className="card team-card" key={index}>
            <div className="card-header">Team {index +1}</div>
            <div className="card-body team">
                {teamU.map((user) => {
                  return (
                      <div className={`user-row ${ user.id === activeUserId ? 'active-user' : ''}`} key={user.id}>
                          <div className="rank">#{rankings[user.id]}</div>
                          <Avatar avatar={user.avatar}/>
                          <div className="user-with-points">
                            <div className="username"><b>{user.username}:</b> {user.id === socket.id && t('lobby.you')}</div>
                            <div className="points">
                                 { (teamusers[user.id]) ? teamusers[user.id].score : '0'} {t('game.points')}
                            </div>
                          </div>
                      </div>
                  )
              })}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Scoreboard;
