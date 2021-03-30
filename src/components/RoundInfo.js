import React from 'react';
import Timer from './Timer';
import { GameContext } from '../providers/GameProvider';
import {useTranslation} from "react-i18next";

const RoundInfo = () => {
  const { isWaitingForNextRd, roundTime, word, roundNo, rounds } = React.useContext(
    GameContext
  );

  const { t } = useTranslation();

  let renderedContent;
  if (isWaitingForNextRd) {
    return (
      <div id="roundinfo-container" className="card">
        <div className="card-body d-flex justify-content-between" id="round-waiting">{t('game.waiting')}...</div>
      </div>
    );
  }
  if (roundTime && word) {
    renderedContent = (
      <>
        <Timer roundTime={roundTime}></Timer>
        <div id="round-word">{word}</div>
          <div id="round-no">{t('game.round')} <strong>{roundNo}</strong> / {rounds}</div>
      </>
    );
  } else {
    renderedContent = <div id="round-waiting">Waiting...</div>;
  }
  return <div id="roundinfo-container" className="card"><div className="card-body d-flex justify-content-between">{renderedContent}</div></div>;
};
export default RoundInfo;
