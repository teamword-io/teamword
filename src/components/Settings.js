import {useTranslation} from "react-i18next";

const Settings = (props) => {
    const { values , onChangeValue, actionType } = props;
    const { t } = useTranslation();
    return <>
        <div className="form-row">
            <div className="form-row">
                <label className="form-label">{t('lobby.language')}</label>
                <select name="language" className="form-select" onChange={onChangeValue} value={values.language} disabled={actionType === 'join'}>
                    <option value="en">{t('lobby.lang.en')}</option>
                    <option value="de">{t('lobby.lang.de')}</option>
                    <option value="fr">{t('lobby.lang.fr')}</option>
                    <option value="it">{t('lobby.lang.it')}</option>
                    <option value="nl">{t('lobby.lang.nl')}</option>
                </select>
            </div>
            <div className="form-row">
                <label className="form-label">{t('lobby.rounds')}</label>
                <select name="rounds" className="form-select" onChange={onChangeValue} value={values.rounds} disabled={actionType === 'join'}>
                    <option value="1">1</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div className="form-row">
                <label className="form-label">{t('lobby.roundTime')}</label>
                <select name="roundTime" className="form-select" onChange={onChangeValue} value={values.roundTime} disabled={actionType === 'join'}>
                    <option value="45000">45</option>
                    <option value="60000">60</option>
                    <option value="80000">80</option>
                    <option value="90000">90</option>
                    <option value="100000">100</option>
                    <option value="120000">120</option>
                    <option value="150000">150</option>
                </select>
            </div>
        </div>
    </>
}

export default Settings;