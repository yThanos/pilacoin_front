import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Portal, TextInput } from 'react-native-paper';

interface Usuario {
  nome: string;
  chavePublica: string;
}

export default function TabTwoScreen() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantidade, setQuantidade] = useState("");
  const head = {
    headers: { 'Content-Type': 'application/json' }
  }
  const loadUsers = () => {
    axios.get<Usuario[]>('http://192.168.0.17:8080/teste/users', head).then((response)=>{
      //console.log(response.data);
      setUsuarios(response.data);
    }).catch((erro: any)=>{
      console.log(erro);
    })
  }

  const transferir = () => {
    axios.post(`http://192.168.0.17:8080/teste/tranferir/${quantidade}`, {usuario: selectedUser}, head).then((response)=>{
      console.log(response.data);
      setModalVisible(false);
    }).catch((erro: any)=>{
      console.log(erro);
    })
  }

  useEffect(()=>{
    loadUsers();
  }, []);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Portal>
        <Modal style={{width: 300, height: 300, zIndex: 1, alignSelf: 'center'}} visible={modalVisible} onDismiss={() => {}}>
          <View>
            <View>
              <Text style={{color: 'white'}}>Nome: {selectedUser?.nome}</Text>
              <TextInput style={{color: 'white'}} label="Quantidade" value={quantidade} onChangeText={(change)=>{setQuantidade(change)}} keyboardType='numeric'/>
              <Button onPress={transferir}>Transferir</Button>
            </View>
            <Button onPress={()=>setModalVisible(false)}>Fechar</Button>
          </View>
        </Modal>
      </Portal>
      <View>
        <Text>Usuários</Text>
        {usuarios.map((usuario, index) => (
          <View key={index}>
            <Text>{usuario.nome}</Text>
            <Button onPress={() => {setModalVisible(true)}}>Tranferir</Button>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
