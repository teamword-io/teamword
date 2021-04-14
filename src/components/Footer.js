import React from "react";
import {GameContext} from "../providers/GameProvider";
import Privacy from "./Privacy";
import WhatsNewOverlay from "./WhatsNewOverlay";
const Footer = () => {
    const { isGameEnd, isWaitingForNextRd,isChoosingWord,roundNo } = React.useContext(
        GameContext
    );

    const [privacyModal, setPrivacyModal] = React.useState(false);
    const [changelogModal, setChangelogModal] = React.useState(false);

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
            &nbsp;&middot;
            <button id="changelog-btn"
                    onClick={() => {
                        setChangelogModal(true);
                    }}
            >Changelog</button>
        </footer>
        <Privacy modal={privacyModal} setPrivacyModal={setPrivacyModal}/>
        <WhatsNewOverlay modal={changelogModal} setPrivacyModal={setChangelogModal}/>
        <div className={`md-overlay ${ ((isGameEnd && roundNo) || isWaitingForNextRd || privacyModal || isChoosingWord || changelogModal) ? 'md-show' : ''}` }></div>
        </>
    );
};

export default Footer;