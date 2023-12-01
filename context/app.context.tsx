import axios, { AxiosInstance } from "axios";
import { createContext, useContext } from "react";

interface AppContextProps {
    API: AxiosInstance;
}

const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
    children: React.ReactNode;
}

const AppProvider = (props: AppProviderProps) => {
    const API = axios.create({
        baseURL: 'http://192.168.0.17:8080/',
        headers: { 'Content-Type': 'application/json' }
    });
    
    return (
        <AppContext.Provider value={{ API }}>
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
