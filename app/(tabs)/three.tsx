import { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
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
    const [selectedMsg, setSelectedMsg] = useState<Mensagens | null>(null);
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

    const markAsRead = (id: Mensagens) => {
        axios.delete(`http://192.168.0.17:8080/teste/msgs/${id}`, head).then((response)=>{
            console.log(response.data);
            loadMessages();
        }).catch((erro: any)=>{
            console.log(erro);
        })
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {/*Modal that displays the message*/}
            <Portal>
                <Modal visible={selectedMsg!=null}>
                    <View style={{width: 300, height: 300, zIndex: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#043F63', borderRadius: 15}}>
                        <View>
                            <Text style={{color: 'white'}}>Nome: {selectedMsg?.nomeUsuario}</Text>
                            <Text style={{color: 'white'}}>Mensagem: {selectedMsg?.msg??selectedMsg?.erro}</Text>
                            <Text style={{color: 'white'}}>Nonce: {selectedMsg?.nonce??"NA"}</Text>
                            <Text style={{color: 'white'}}>Queue: {selectedMsg?.queue}</Text>
                        </View>
                        <Button onPress={()=>setSelectedMsg(null)}>Fechar</Button>
                    </View>
                </Modal>
            </Portal>
            <Text>Tab Three</Text>
            {isLoading || mensagens == null ? <ActivityIndicator size={"large"} /> : (
                <View>
                    <GridMsgItem key={"msgs"} msgs={mensagens} onPressed={(msg) => {/*ToDo: Ver detalhes da msg*/}} read={(id) => {markAsRead(id)}} type={true}/>
                    <View style={{height: 10}}/>
                    <GridMsgItem key={"erros"} msgs={mensagens} onPressed={(msg) => {/*ToDo: Ver detalhes da msg*/}} read={(id) => {markAsRead(id)}} type={false}/>
                </View>
            )}
        </View>
    );
}

export default TabThree;

interface GridMsgItemProps {
    msgs: Mensagens[];
    onPressed: (msg: Mensagens) => void;
    read: (id: Mensagens) => void;
    type?: boolean;
}

const GridMsgItem = ({msgs, onPressed, read, type}: GridMsgItemProps) => {
    const msg = type?msgs.filter((e: Mensagens) => e.erro == undefined):msgs.filter((e: Mensagens) => e.erro != undefined);
    return (
        <View key={type?"messages":"errors"} style={{padding: 10, backgroundColor: "#043F63", borderRadius: 10, margin: 10, height: 300}}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                {msg.map((e: Mensagens) => (
                    <View key={e.id_msg}>
                        <Text style={{color: 'white'}}>{type?e.msg:e.erro}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Button onPress={() => read(e)}>Lido</Button>
                            <Button onPress={() => onPressed(e)} >smt</Button>
                        </View>
                    </View>))
                }
            </ScrollView>
        </View>
    )
}