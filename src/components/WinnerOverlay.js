import React from 'react';
import { GameContext } from '../providers/GameProvider';
import Confetti from 'react-canvas-confetti';
import {useTranslation} from "react-i18next";
import useSound from "use-sound";

const WinnerOverlay = () => {
    const { users, isGameEnd, setIsGameEnd } = React.useContext(
        GameContext
    );
    const { t } = useTranslation();
    const [play] = useSound('/sounds/winner.mp3');

    const usersSorted = users.sort((userA, userB) => {
        if (userA.score < userB.score) {
            return 1;
        } else if (userA.score > userB.score) {
            return -1;
        } else {
            return 0;
        }
    });

    const style = {
        width: '100%',
        height: '360px'
    };

    React.useEffect( () => {
        if(isGameEnd) {
            setTimeout(() => {
                play();
            },100);
        }
    },[isGameEnd, play]);

    return (
      <>
          <div className={`md-modal ${isGameEnd ? 'md-show' : ''} `} id="winner-overlay">
              <div className="md-content">
                  <h3>Game Over</h3>
                  <p>{t('game.winner')}</p>
                  <Confetti
                      className="winner-confetti"
                      fire={isGameEnd}
                      style={style}
                  >
                  </Confetti>
                  {usersSorted.map((user, index) => {
                      if(index === 0) {
                          return (
                              <div className="winner" key={index}>
                                  <div className="winner-icon"></div>
                                  <b>{user.username}</b>&nbsp;
                                  <p>{user.score}&nbsp;{t('game.points')}</p>
                              </div>
                          )
                      }
                      return '';
                  })}
                  <hr />
                  <div className="other-user d-flex flex-wrap justify-content-evenly">
                  {usersSorted.map((user, index) => {
                      if(index !== 0) {
                          return (
                              <div className="single-user" key={index}>
                                  #{index +1} &nbsp;
                                  <b>{user.username}</b>&nbsp;
                                  <p>{user.score}&nbsp;{t('game.points')}</p>
                              </div>
                          )
                      }
                      return '';
                  })}
                  </div>
                  <button
                      onClick={e => {
                          setIsGameEnd(false);
                      }}
                      className="btn btn-primary">{t('game.backToLobby')}
                  </button>
              </div>
          </div>
      </>
    );

}

export default WinnerOverlay;