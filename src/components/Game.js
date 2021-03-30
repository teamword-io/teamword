import React from 'react';
import RoundInfo from './RoundInfo';
import Scoreboard from './Scoreboard';
import Teambox from './Teambox';
import Chatbox from './Chatbox';
import Lobby from "./Lobby";
import Header from "./Header";
import { GameContext } from '../providers/GameProvider';
import RoundScoreOverlay from "./RoundscoreOverlay";
import Darkmode from "./Darkmode";
import WinnerOverlay from "./WinnerOverlay";
import ChooseWordOverlay from "./ChooseWordOverlay";

const Game = () => {
    const {
        isGameStarted
    } = React.useContext(GameContext);

    if (isGameStarted){
        return (
            <>
                <div>
                    <Header />
                    <Darkmode />
                </div>
                <div className="content">
                    <RoundInfo></RoundInfo>
                    <div id="game-container" className="row">
                        <Scoreboard></Scoreboard>
                        <Teambox></Teambox>
                        <Chatbox></Chatbox>
                        <RoundScoreOverlay></RoundScoreOverlay>
                        <ChooseWordOverlay></ChooseWordOverlay>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <Lobby></Lobby>
                <WinnerOverlay></WinnerOverlay>
            </>
        );
    }

}
export default Game;
