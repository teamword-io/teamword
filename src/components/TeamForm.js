import React from 'react';
import {GameContext} from "../providers/GameProvider";
import {SocketContext} from "../providers/SocketProvider";
import {useTranslation} from "react-i18next";
const TeamForm = () => {
    const [chatInput, setChatInput] = React.useState('');
    const [error, setError] = React.useState(false);
    const socket = React.useContext(SocketContext);
    const { writingPermission, teamWord} = React.useContext(GameContext);
    const { t } = useTranslation();
    return (
        <>

            <form
                id="teambox-form"
                className={error ? 'has-error' : ''}
                onSubmit={(ev) => {
                    ev.preventDefault();
                    if (chatInput === '' || /[ _]/i.test(chatInput) || chatInput.length > 30 || chatInput.toLocaleLowerCase().trim() === teamWord ) {
                        setError(true);
                        return;
                    }

                    let word = teamWord,
                        string = chatInput,
                        regexp = new RegExp(word.replace(/(.)(?!$)/g,'$1.*')),
                        stringContainsWord = regexp.test(string);

                    if(stringContainsWord) {
                        setError(true);
                        return;
                    }

                    setError(false);
                    socket.emit('wroteWord', { type: 'chat', msg: chatInput });
                    setChatInput('');
                }}
            >
                <input
                    data-testid="teambox-input"
                    id="teambox-input"
                    type="text"
                    className="form-control"
                    disabled={!writingPermission}
                    placeholder={t('game.nextWort')}
                    value={chatInput}
                    onChange={(ev) => setChatInput(ev.target.value)}
                />
                <span className="error-msg">{t('game.wrongWord')}</span>
            </form>
        </>
    );
};
export default TeamForm;
