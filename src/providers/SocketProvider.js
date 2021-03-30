import React from "react";
import io from 'socket.io-client';

let s = null;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    s = io('localhost:4001/', {
        transports: ['websocket']
    });
} else {
    s = io('https://teamword.io:4001/', {
        transports: ['websocket']
    });
}

export const socket = s;

export const SocketContext = React.createContext();