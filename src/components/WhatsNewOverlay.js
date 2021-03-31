const WhatsNewOverlay = (props) => {
    return (
        <div className={`md-modal ${props.modal ? 'md-show' : ''} `} id="privacy-modal">
            <div className="md-content">
                <h3>Changelog</h3>
                <button onClick={() => {
                    props.setPrivacyModal(false);
                }} type="button" className="btn-close" aria-label="Close"></button>
                <div className="changelog-icon"></div>
                <p>
                    <strong>1.0.0</strong> - Initial Release
                </p>
            </div>
        </div>
    );
}

export default WhatsNewOverlay;