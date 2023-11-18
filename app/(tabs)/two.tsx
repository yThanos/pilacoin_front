import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Usuario {
  nome: string;
  chavePublica: string;
}

export default function TabTwoScreen() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
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

  useEffect(()=>{
    loadUsers();
  }, []);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Text>Usuários</Text>
        {usuarios.map((usuario, index) => (
          <Text style={{color: 'white'}} key={index}>{usuario.nome}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
