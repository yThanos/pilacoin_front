import React, { useEffect, useState } from "react";
import { ScrollView, View, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { getAPI } from "../../context/app.context";

interface Log {
    type: string;
    message: string;
}

const LogScreen = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const { API } = getAPI();
    const getLogs = () => {
        API.get('/teste/logs').then((response) => {
            console.log(response.data);
            setLogs(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const {width, height} = useWindowDimensions();

    useEffect(()=>{
        getLogs();
    }, [])

    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: "white"}}>Mensagens</Text>
            <ScrollView style={{height: height * 0.4, width: width * 0.9}}>
            {
                logs.filter((a)=> a.type == "MSG").map((log, index) => {
                    return (
                        <View style={{padding: 2, borderWidth: 2, borderRadius: 10, borderColor: 'white'}} key={index}>
                            <Text style={{color: "white"}}>{log.message}</Text>
                        </View>
                    )
                })
            }
            </ScrollView>
            <Text style={{color: "white"}}>Erros</Text>
            <ScrollView style={{height: height * 0.4, width: width * 0.9}}>
            {
                logs.filter((a)=> a.type == "ERRO").map((log, index) => {
                    return (
                        <View style={{padding: 5, borderWidth: 2, borderRadius: 10, borderColor: 'white'}} key={index}>
                            <Text style={{color: "white"}}>{log.message}</Text>
                        </View>
                    )
                })
            }
            </ScrollView>
        </View>
    )
}

export default LogScreen;