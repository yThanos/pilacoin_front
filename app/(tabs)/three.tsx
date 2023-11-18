import { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Button, Text } from "react-native-paper";
import axios from "axios";

interface Mensagens {
    id_msg: number;
    msg?: string;
    erro?: string;
    nomeUsuario?: string;
    nonce?: string;
    queue?: string;
    lida: boolean;
}

const TabThree = () => {
    const [mensagens, setMensagens] = useState<Mensagens[]|null>(null);
    const [isLoading, setLoading] = useState(true);
    const head = {
        headers: { 'Content-Type': 'application/json' }
    }
    const loadMessages = () => {
        setLoading(true);
        axios.get<Mensagens[]>('http://192.168.0.17:8080/teste/msgs', head).then((response)=>{
            //console.log(response.data);
            setMensagens(response.data);
            setLoading(false);
        }).catch((erro: any)=>{
            console.log(erro);
            setLoading(false);
        })
    }

    useEffect(()=>{
        loadMessages();
    },[])

    const markAsRead = (id: number) => {
        // Implement the logic to mark the message as read
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Tab Three</Text>
            {isLoading || mensagens == null ?(
                <ActivityIndicator size="large" />
            ) : (
                <View>
                    <GridMsgItem msgs={mensagens} onPressed={(msg) => {/*ToDo: Ver detalhes da msg*/}} read={(id) => {/*ToDo: mudar status da msg*/}} type={true}/>
                    <View style={{height: 10}}/>
                    <GridMsgItem msgs={mensagens} onPressed={(msg) => {/*ToDo: Ver detalhes da msg*/}} read={(id) => {/*ToDo: mudar status da msg*/}} type={false}/>
                </View>
            )}
        </View>
    );
}

export default TabThree;

interface GridMsgItemProps {
    msgs: Mensagens[];
    onPressed: (msg: Mensagens) => void;
    read: (id: number) => void;
    type?: boolean;
}

const GridMsgItem = ({msgs, onPressed, read, type}: GridMsgItemProps) => {
    const msg = type?msgs.filter((e: Mensagens) => e.erro == undefined):msgs.filter((e: Mensagens) => e.erro != undefined);
    return (
        <View style={{padding: 10, backgroundColor: "#043F63", borderRadius: 10, margin: 10, height: 300}}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                {msg.map((e: Mensagens) => (
                    <View key={e.id_msg}>
                        <Text style={{color: 'white'}}>{type?e.msg:e.erro}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Button onPress={() => read(e.id_msg)}>Lido</Button>
                            <Button onPress={() => onPressed(e)} >smt</Button>
                        </View>
                    </View>))
                }
            </ScrollView>
        </View>
    )
}