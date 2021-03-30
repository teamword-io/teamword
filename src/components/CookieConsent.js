import React from 'react';
import cookieImage from '../images/cookie.png';
import Cookies from "js-cookie";
import {useTranslation} from "react-i18next";

const CookieConsent = () => {

    const [cookieVisible, setCookieVisible] = React.useState(false);
    const [accepted, setAccepted] = React.useState(false);
    const { t } = useTranslation();
    const acceptCookie = () => {
        setAccepted(true);
        setCookie();
    }

    const setCookie = () => {
        let cookieOptions = {
            expires: 365,
        };

        // set the regular cookie
        Cookies.set('CookieConsent', true, cookieOptions);
    }

    // if cookie undefined or debug
    React.useEffect(() => {
        let cookieValue = Cookies.get('CookieConsent');
        if (cookieValue === undefined) {
            setCookieVisible( true );
        }
    },[]);

    React.useEffect(() => {
        if(accepted === true) {
            setCookieVisible( false );
        }
    }, [accepted]);

    if (!cookieVisible) {
        return null;
    }

    return (
        <div className="cookie-message">
            <div className="body">
                <img width="159" height="130" src={cookieImage} alt="Cookies" />
                <div className="text">
                    <span className="title">Cookies</span>
                    <p>{t('cookie.text')}</p>
                </div>
            </div>
            <div className="footer">
                <div role="group" className="MuiButtonGroup-root actions">
                    <button className="btn privacy-btn"
                            onClick={() => document.getElementById('privacy-btn').click()}

                    >
                        <span>{t('cookie.imprint')}</span>
                    </button>
                    <button
                        onClick={() => acceptCookie()}
                        className="btn accept-btn"
                        tabIndex="0" type="button">
                        <span>Ok</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;