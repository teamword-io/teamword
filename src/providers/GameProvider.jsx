import React, { useEffect } from 'react';
import {SocketContext} from "./SocketProvider";
export const GameContext = React.createContext({});

const GameProvider = (props) => {
  const [users, setUsers] = React.useState([]);
  const [teams, setTeams] = React.useState([]);
  const [actionType, setActionType] = React.useState(props.actionType);
  const [roomID, setRoomID] = React.useState(props.roomID);
  const [writingPermission, setWritingPermission] = React.useState(false);
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const [isWaitingForNextRd, setIsWaitingForNextRd] = React.useState(false);
  const [isChoosingWord, setIsChoosingWord] = React.useState(false);
  const [chooseWords, setChooseWords] = React.useState([]);
  const [isGameEnd, setIsGameEnd] = React.useState(false);
  const [canStart, setCanStart] = React.useState(false);
  const [roundTime, setRoundTime] = React.useState(null);
  const [word, setWord] = React.useState(null);
  const [teamWord, setTeamWord] = React.useState(null);
  const [roundNo, setRoundNo] = React.useState(null);
  const [roundScores, setRoundScores] = React.useState([]);
  const [activeUserId, setActiveUserId] = React.useState(null);
  const [activeTeamId, setActiveTeamId] = React.useState(null);
  const [nextTeamNo, setNextTeamNo] = React.useState(null);
  const [wordReal, setWordReal] = React.useState(null);
  const [rounds, setRounds] = React.useState(null);
  const [haveSound, setHaveSound] = React.useState(true);
  const [settings, setSettings] = React.useState(props.settings);
  const socket = React.useContext(SocketContext);
  const endRound = () => {
    setWritingPermission(false);
    setIsWaitingForNextRd(true);
    setRoundTime(null);
    setActiveUserId(null);

  };

  useEffect(() => {

    socket.on('gameStart', (msg) => {
      setIsGameStarted(true);
      setRounds(msg.rounds);
      setIsGameEnd(false);
      setUsers(msg.users);
    });

    socket.on('canStart', (msg) => {
      setCanStart(msg);
    });

    socket.on('prepareStart',(msg) => {
      setIsChoosingWord(true);
      setChooseWords(msg.words);
      if (msg.activeUser.id === socket.id) {
        setWritingPermission(true);
      } else {
        setWritingPermission(false);
      }
    });

    socket.on('roundStart', (msg) => {
      setActiveUserId(msg.socketId);
      if (msg.socketId === socket.id) {
        setWritingPermission(true);
      } else {
        setWritingPermission(false);
      }
      setIsChoosingWord(false);
      setNextTeamNo(msg.nextTeamNo);
      setActiveTeamId(msg.activeTeamIdx);


      setIsWaitingForNextRd(false);
      setRoundTime({
        timeToComplete: msg.timeToComplete,
        startTime: msg.startTime,
      });
      setWord(msg.word);
      setTeamWord(msg.rlWord);
      setRoundNo(msg.roundNo);
    });

    socket.on('nextUser', (msg) => {
      setActiveUserId(msg.id);
      if (msg.id === socket.id) {
        setWritingPermission(true);
      } else {
        setWritingPermission(false);
      }
    });

    socket.on('roundEnd', endRound);

    socket.on('wordReveal', (wrdReal) => {
      setWordReal(wrdReal);
    });

    socket.on('gameEnd', () => {
      setIsGameStarted(false);
      setIsWaitingForNextRd(false);
      setIsGameEnd(true);
    });

    socket.on('exitGame', () => {
      setIsGameStarted(false);
      setRoomID(null);
      setActionType(null);
      props.exitGame();
    });

    socket.on('usersState', (users) => {
      setUsers(users);
    });

    socket.on('addTeams', (teams) => {
      setTeams(teams);
    });

    socket.on('wordHint', (word) => {
      setWord(word);
    });

    socket.on('settingsChange', (msg) => {
      setSettings(msg);
    });

  }, []);

  useEffect(() => {
    if(props.actionType) {
      setActionType(props.actionType);
    }

    if(props.roomID) {
      setRoomID(props.roomID);
    }

    if(props.settings) {
      setSettings(props.settings);
    }

  }, [props]);

  useEffect(() => {
    socket.on('userJoin', (user) => {
      setUsers([...users, user]);
    });
    socket.on('userLeave', (user) => {
      setUsers(users.filter((usr) => usr.id !== user.id));
    });
    socket.on('roundScores', (rdScores) => {
      const newUsers = [];
      const rdScoresCurr = [];
      for (const user of users) {
        rdScoresCurr.push({
          userId: user.id,
          score: rdScores[user.id],
          username: user.username,
        });
        const newUser = { ...user, score: user.score + rdScores[user.id] };
        newUsers.push(newUser);
      }
      setRoundScores(rdScoresCurr);
      setUsers(newUsers);
    });
    return () => {
      socket.removeEventListener('userJoin');
      socket.removeEventListener('userLeave');
      socket.removeEventListener('roundScores');
    };
  }, [users]);
  return (
      <GameContext.Provider
          value={{
            users,
            teams,
            writingPermission,
            isGameStarted,
            isWaitingForNextRd,
            isGameEnd,
            setIsGameEnd,
            canStart,
            roundTime,
            word,
            teamWord,
            roundNo,
            rounds,
            roundScores,
            activeUserId,
            activeTeamId,
            wordReal,
            nextTeamNo,
            actionType,
            roomID,
            haveSound,
            setHaveSound,
            settings,
            setSettings,
            isChoosingWord,
            chooseWords
          }}
      >
        {props.children}
      </GameContext.Provider>
  );
};

export default GameProvider;
