import axios, { AxiosInstance } from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { Pilacoin } from "../app/(tabs)";
import { Client } from "@stomp/stompjs";

interface AppContextProps {
    API: AxiosInstance;
    pilacoins?: Pilacoin[];
    logs?: Log[];
}

const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
    children: ReactNode;
}

interface Log{
    type: string;
    message: string;
}

interface Message{
    pilacoins?: Pilacoin[];
    logs?: Log[];
}

const AppProvider = (props: AppProviderProps) => {
    const API = axios.create({
        baseURL: 'http://192.168.0.17:8080/',
        headers: { 'Content-Type': 'application/json' }
    });

    const [pilacoins, setPilas] = useState<Pilacoin[]>([]);
    const [logs, setLogs] = useState<Log[]>([]);

    const socket = new Client({
        brokerURL: 'ws://192.168.0.17:8080/ws-message',
        reconnectDelay: 5000,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true
    })

    socket.onConnect = () => {
        socket.subscribe('/topic/message', (message) => {
            const messageBody: Message = JSON.parse(message.body);
            if(messageBody.pilacoins){
                setPilas(messageBody.pilacoins);
            }
            if(messageBody.logs){
                setLogs(messageBody.logs);
            }
        })
    }

    socket.onDisconnect = () => {
        console.log('Disconnected');
    }

    //socket.activate();
    
    return (
        <AppContext.Provider value={{ API, logs, pilacoins }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppProvider;

export const getAPI = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
