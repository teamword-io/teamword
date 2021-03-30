import React from 'react';
import { GameContext } from '../providers/GameProvider';
import {SocketContext} from '../providers/SocketProvider';
import {useTranslation} from "react-i18next";

const ChooseWordOverlay = () => {
    const {
        chooseWords,
        isChoosingWord,
        writingPermission
    } = React.useContext(GameContext);

    const { t } = useTranslation();
    const socket = React.useContext(SocketContext);

    let renderedContent;
    if(writingPermission) {
        renderedContent = (
            <>
                <h3>{t('game.chooseWord')}</h3>
                <p>{t('game.chooseWordInfo')}</p>
                <div className="chooseword-container">
                    {chooseWords.map((word, index) => {
                        return (
                            <button
                                className="btn btn-small btn-primary chooseWord-btn mx-1 p-2" key={index}
                                onClick={ev => {
                                    socket.emit('wordChoosen', ev.target.innerText);
                                }}
                            >{word}
                            </button>
                        )
                    })}
                </div>
            </>
        );
    } else {
        renderedContent = (
            <>
                <h3>{t('game.wordWillChoose')}</h3>
                <p>{t('game.wordWillChooseInfo')}</p>
            </>
        );
    }

    return (
        <div className={`md-modal ${isChoosingWord ? 'md-show' : ''} `} id="chooseWord-overlay">
            <div className="md-content">
                {renderedContent}
            </div>
        </div>
    )

}

export default ChooseWordOverlay;