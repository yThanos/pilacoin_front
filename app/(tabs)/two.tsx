import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, Modal, Portal, TextInput, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { getAPI } from '../../context/app.context';

interface Usuario {
  nome: string;
  chavePublica: string;
}

export default function TabTwoScreen() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantidade, setQuantidade] = useState("");
  const { API } = getAPI();
  const loadUsers = () => {
    API.get<Usuario[]>('teste/users').then((response)=>{
      //console.log(response.data);
      setUsuarios(response.data);
    }).catch((erro: any)=>{
      console.log(erro);
    })
  }

  const transferir = () => {
    API.post(`teste/tranferir/${quantidade}`, JSON.stringify(selectedUser)).then((response)=>{
      console.log(response.data);
      setModalVisible(false);
    }).catch((erro: any)=>{
      console.log(erro);
    })
  }

  useEffect(()=>{
    console.log(selectedUser);
  }, [selectedUser]);

  useEffect(()=>{
    loadUsers();
  }, []);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Portal>
        <Modal visible={modalVisible} dismissable={false} onDismiss={() => {}}>
          <View style={{width: 300, height: 300, zIndex: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#043F63', borderRadius: 15}}>
            <View>
              <Text style={{color: 'white'}}>Nome: {selectedUser?.nome}</Text>
              <TextInput style={{color: 'white'}} textColor='white' label="Quantidade" value={quantidade} onChangeText={(change)=>{setQuantidade(change)}} keyboardType='numeric'/>
              <Button onPress={transferir}>Transferir</Button>
            </View>
            <Button onPress={()=>setModalVisible(false)}>Fechar</Button>
          </View>
        </Modal>
      </Portal>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: 24, margin: 5}}>Area de tranferencia</Text>
        <ScrollView>
          {usuarios.map((usuario, index) => (
            <View key={index} style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: 350, height: 80, borderRadius: 20, backgroundColor: "#043F63", padding: 20, margin: 10}}>
              <Text style={{color: 'white'}}>{usuario.nome}</Text>
              <Button onPress={() => {setModalVisible(true);setSelectedUser(usuario)}}>Tranferir</Button>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
