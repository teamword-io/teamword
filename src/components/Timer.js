import React from 'react';
import useSound from 'use-sound';
import {GameContext} from "../providers/GameProvider";

const Timer = ({ roundTime }) => {
    const [time, setTime] = React.useState(
        roundTime.timeToComplete + roundTime.startTime - Date.now()
    );

    const [isPlaying, setIsPlaying] = React.useState(
        false
    );
    const { haveSound } = React.useContext(
        GameContext
    );
    const [play] = useSound('/sounds/countdown.mp3');
    React.useEffect(() => {
        let isSubscribed = true;
        setTimeout(() => {
            if (isSubscribed) {
                const newTime =
                    roundTime.timeToComplete + roundTime.startTime - Date.now();
                    if (Math.round(newTime / 1000) === 4 && haveSound && !isPlaying) {
                        setIsPlaying(true);
                        play();
                    }
                if (Math.round(newTime / 1000) <= 0) {
                    setIsPlaying(false);
                    return;
                }
                setTime(newTime);
            }
        }, 250);
        return () => {
            isSubscribed = false;
        };
    }, [time, roundTime, play, isPlaying, haveSound]);
    return <div id="round-timer"><span className="icon icon-timer"></span> {Math.round(time / 1000)}</div>;
};
export default Timer;
