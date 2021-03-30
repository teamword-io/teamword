import React from "react";
import {GameContext} from "../providers/GameProvider";
import Privacy from "./Privacy";
const Footer = () => {
    const { isGameEnd, isWaitingForNextRd,isChoosingWord } = React.useContext(
        GameContext
    );

    const [privacyModal, setPrivacyModal] = React.useState(false);

    return (
        <>
        <footer id="footer">
            &copy; {(new Date().getFullYear())} Teamword.io &middot;
            <button id="privacy-btn"
                onClick={() => {
                    setPrivacyModal(true);
                }}
            >Privacy</button>
            &middot;
            Feedback, Issues and Improvements are welcome at <a href="https://github.com/teamword-io/teamword" rel="noreferrer" target="_blank">Teamword Github</a>

        </footer>
        <Privacy modal={privacyModal} setPrivacyModal={setPrivacyModal}/>
        <div className={`md-overlay ${ (isGameEnd || isWaitingForNextRd || privacyModal || isChoosingWord) ? 'md-show' : ''}` }></div>
        </>
    );
};

export default Footer;