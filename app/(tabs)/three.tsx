import { RefreshControl, ScrollView, View, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { Mensagem, getAPI } from "../../context/app.context";
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

const LogScreen = () => {
    const {width, height} = useWindowDimensions();
    const [messages, setMessages] = useState<Mensagem[]>([]);
    const [loading, setLoading] = useState(false);
    
    /*const socket = new Client({
        brokerURL: 'ws://192.168.1.104:8080/socket',
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

    useEffect(()=>{
        socket.activate();
    },[])*/

    const { API } = getAPI();
    const loadMessages = () => {
        setLoading(true);
        API.get<Mensagem[]>('teste/logs').then((response)=>{
            setMessages(response.data);
        }).catch((erro: any)=>{
            console.log(erro);
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
        loadMessages();
    }, []);

    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: "white"}}>Mensagens</Text>
            <ScrollView style={{height: height * 0.4, width: width * 0.9}} refreshControl={<RefreshControl refreshing={loading} onRefresh={loadMessages} />}>
            {
                messages.filter((a)=> a.msg != null).map((log, index) => {
                    return (
                        <View style={{padding: 2, borderWidth: 2, borderRadius: 10, borderColor: 'white', margin: 3}} key={index}>
                            <Text style={{color: "white"}}>{log.msg}</Text>
                        </View>
                    )
                })
            }
            </ScrollView>
            <Text style={{color: "white"}}>Erros</Text>
            <ScrollView style={{height: height * 0.4, width: width * 0.9}} refreshControl={<RefreshControl refreshing={loading} onRefresh={loadMessages} />}>
            {
                messages.filter((a)=> a.erro != null).map((log, index) => {
                    return (
                        <View style={{padding: 5, borderWidth: 2, borderRadius: 10, borderColor: 'white', margin: 3}} key={index}>
                            <Text style={{color: "white"}}>{log.erro}</Text>
                        </View>
                    )
                })
            }
            </ScrollView>
        </View>
    )
}

export default LogScreen;