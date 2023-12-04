import axios, { AxiosInstance } from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { Client } from "@stomp/stompjs";

interface AppContextProps {
    API: AxiosInstance;
    messages: Mensagem[];
}

export interface Mensagem{
    msg?: string;
    erro?: string;
}
const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider = (props: AppProviderProps) => {
    const [messages, setMessages] = useState<Mensagem[]>([]);

    const API = axios.create({
        baseURL: 'http://192.168.1.101:8080/',
        headers: { 'Content-Type': 'application/json' }
    });

    const socket = new Client({
        brokerURL: 'ws://192.168.1.101:8080/socket',
        reconnectDelay: 5000,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true
    })

    socket.onConnect = (frame) => {
        socket.subscribe('/topic/message', (message) => {
            //console.log(message.body);
            setMessages(JSON.parse(message.body));
        })
    }

    socket.onDisconnect = () => {
        console.log('Disconnected');
    }

    socket.onStompError = (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    }

    socket.activate();
    
    return (
        <AppContext.Provider value={{ API, messages }}>
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
