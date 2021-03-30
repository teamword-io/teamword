import React from 'react';
import { GameContext } from '../providers/GameProvider';
import {useTranslation} from "react-i18next";
const RoundScoreOverlay = () => {
    const context = React.useContext(GameContext);
    const { t } = useTranslation();
    const [haveNextRound, setHaveNextRound] = React.useState(true);

    React.useEffect(() => {
        if(context.roundNo === parseInt(context.rounds,10)) {
            if((context.teams.length -1) === context.activeTeamId) {
                setHaveNextRound(false);
            }
        }

    }, [context.roundNo, context.rounds, context.activeTeamId,context.teams]);

    return (
        <div className={`md-modal ${context.isWaitingForNextRd && !context.isChoosingWord ? 'md-show' : ''} `} id="winner-overlay">
            <div className="md-content">
                <h3>{t('game.wordReveal')} &apos;{context.wordReal}&apos;</h3>

                <div className="roundscore-icon"></div>

                {context.roundScores.map((roundScore) => (
                    <div
                        className="round-score"
                        key={roundScore.userId}
                        style={{ color: roundScore.score === 0 ? 'red' : 'green' }}
                    >
                        <b>{roundScore.username}:</b> {roundScore.score}
                    </div>
                ))}
                <br/>
                {haveNextRound &&
                <p>
                Team {context.nextTeamNo} {t('game.nextTeam')}
                </p>}
            </div>
        </div>
    );
};
export default RoundScoreOverlay;