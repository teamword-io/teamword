import React from "react";
import Avatar from "./Avatar";
import {useTranslation} from "react-i18next";
import useSound from 'use-sound';

const AvatarSettings = (props) => {
    const { t } = useTranslation();

    const shuffleAvatar = () => {
        props.setAvatar({
            h: Math.floor(Math.random() * 10) + 1,
            e: Math.floor(Math.random() * 10) + 1,
            m: Math.floor(Math.random() * 10) + 1
        })
    }

    const soundUrl = '/sounds/rising-pops.mp3';

    const [play, { stop }] = useSound(
        soundUrl,
        { volume: 0.5 }
    );

    const changeAvatar = (part) => {
        let avPart = props.avatar[part];
        let newAvatar = { ...props.avatar }
        avPart++;
        let newPart = (avPart > 10) ? 1 : avPart;
        newAvatar[part] = newPart;
        props.setAvatar(newAvatar);
    }

    return (
        <div id="avatar-settings">
            <button
                onClick={() => shuffleAvatar()} id="shuffle-avatar" title={t('avatar.shuffle')}
                onMouseEnter={() => {
                    play();
                }}
                onMouseLeave={() => {
                    stop();
                }}
            >

            </button>
            <div id="avatar-container">
                <Avatar avatar={props.avatar}/>
            </div>
            <div className="settings-buttons">
                <button title={t('avatar.head')} onClick={() => changeAvatar('h')} className="change-head"></button>
                <button title={t('avatar.eyes')} onClick={() => changeAvatar('e')} className="change-eyes"></button>
                <button title={t('avatar.mouth')} onClick={() => changeAvatar('m')} className="change-mouth"></button>
            </div>
        </div>
    );
};

export default AvatarSettings;