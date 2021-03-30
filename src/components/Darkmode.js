import React from 'react';
import { useTranslation } from 'react-i18next';
import {GameContext} from "../providers/GameProvider";
import useSound from "use-sound";
const Darkmode = () => {

    const [darkmode, setDarkmode] = React.useState(
        localStorage.getItem('darkmode') || 'false'
    );

    const {
        haveSound, setHaveSound
    } = React.useContext(GameContext);

    // translation
    const { t } = useTranslation();
    const [soundOn] = useSound('/sounds/enable-sound.mp3',{ volume: 0.20 });
    const [soundOff] = useSound('/sounds/disable-sound.mp3');

    const toggleDarkMode = () => {
        if (darkmode === 'true') {
            stayLight();
        } else {
            stayDark();
        }
    }

    const stayDark = () => {
        setDarkmode('true');
    }

    const stayLight = () => {
        setDarkmode('false');
    }

    React.useEffect(() => {
        localStorage.setItem('darkmode', darkmode);

        if(darkmode === 'true') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

    }, [darkmode]);

    return (
        <>
            <div id="audio-toggle">
                <button className={!haveSound ? 'off' : ''} onClick={e => {
                    if(haveSound) {
                        soundOff();
                    } else {
                        soundOn();
                    }
                    setHaveSound(!haveSound);


                }}></button>
            </div>
            <div id="dark-theme-toggle">
                <div className="mode-toggle noselect">
                    <h6 className="label-dark" onClick={stayDark}>{t('darkmode.dark')}</h6>
                    <div className="toggle-switch" onClick={toggleDarkMode}></div>
                    <h6 className="label-light" onClick={stayLight}>{t('darkmode.light')}</h6>
                </div>
            </div>
        </>
    );
};

export default Darkmode;