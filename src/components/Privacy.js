const Privacy = (props) => {
    return (
        <div className={`md-modal ${props.modal ? 'md-show' : ''} `} id="privacy-modal">
            <div className="md-content">
                <h3>Privacy</h3>
                <button onClick={() => {
                    props.setPrivacyModal(false);
                }} type="button" className="btn-close" aria-label="Close"></button>
                <div className="privacy-icon"></div>
                <p>
                    Our servers log very basic information about each computer connecting to our site, such as IP address, device characteristics, and browser type. None of this information is associated with any identified person at the time it is collected, but it could potentially be tied to you somehow if we are required to disclose our server logs as a result of a subpoena or other legal process.
                </p>
                <p>
                    We may use cookies, web beacons, or other anonymous tracking information to improve our server's interaction with your computer. Third party vendors, including Google, also use cookies to serve ads to you based on your visit to this site and/or other sites on the Internet.
                </p>
                <p>
                    You may opt out of the use of Google's ad-related cookies by visiting their ad settings.
                </p>
                <p>
                    For more information regarding opting out of a third party vendor's use of cookies, you can visit aboutads.info.
                </p>
                <p>
                    We may occasionally revise our privacy policy by posting the changes here.
                </p>

                <strong>Contact</strong><br />
                <p>
                    Feel free to contact us via contact@teamword.io
                </p>

                <button className="btn btn-primary"
                    onClick={() => {
                        props.setPrivacyModal(false);
                    }}
                >OK</button>

            </div>
        </div>
);
}

export default Privacy;