import axios from "axios";
import { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Image } from "react-native";
import { Text, Switch } from "react-native-paper";

interface Pilacoin {
  nonce: string;
  status: string;
}

export default function TabOneScreen() {
  const [saldo, setSaldo] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mining, setMining] = useState(true);
  const head = {
    headers: { 'Content-Type': 'application/json' }
  }
  const [pilas, setPilas] = useState<Pilacoin[]>([]);

  const loadSaldo = () => {
    setLoading(true);
    axios.get<Pilacoin[]>('http://192.168.0.17:8080/teste/pilas', head).then((response)=>{
      //console.log(response.data);
      setPilas(response.data);
      setSaldo(response.data.length);
      setLoading(false);
    }).catch((erro: any)=>{
      console.log(erro);
      setLoading(false);
    })
  }

  const refeshSaldo = () => {
    checkState();
    setLoading(true);
    setRefreshing(true);
    axios.get<Pilacoin[]>('http://192.168.0.17:8080/teste/pilas', head).then((response)=>{
      //console.log(response.data);
      setPilas(response.data);
      setSaldo(response.data.length);
      setLoading(false);
      setRefreshing(false);
    }).catch((erro: any)=>{
      console.log(erro);
      setLoading(false);
      setRefreshing(false);
    })
  }

  const minerar = () => {
    axios.get<boolean>('http://192.168.0.17:8080/teste/minerar', head).then((response)=>{
      console.log(response.data);
      setMining(response.data);
    }).catch((erro: any)=>{
      console.log(erro);
    })
  }

  const checkState = () => {
    axios.get<boolean>('http://192.168.0.17:8080/teste/mineState', head).then((response)=>{
      console.log(response.data);
      setMining(response.data);
    }).catch((erro: any)=>{
      console.log(erro);
    })
  }

  useEffect(()=>{
      loadSaldo();
      checkState();
  }, [])

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View style={styles.saldo}>
        <Text style={{color: 'white', marginTop: 80}}>SALDO</Text>
        {isLoading ? <ActivityIndicator size={'large'}/> : <Text style={{color: 'white', fontSize: 40}}>P$ {saldo}</Text>}
      </View>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refeshSaldo}/>}
      >
        <View style={{width: 350}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '45%', marginTop: 30, backgroundColor: "#043F63", padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 30}}>
              <Text style={{color: 'white'}}>Pilas validos</Text>
              {isLoading ? <ActivityIndicator size={'large'}/> : <Text style={{color: 'white', fontSize: 40}}>{pilas.filter(pila => pila.status == 'VALIDO').length}</Text>}
            </View>
            <View style={{width: '45%', marginTop: 30, backgroundColor: "#043F63", padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 30}}>
              <Text style={{color: 'white'}}>Pilas Minerados</Text>
              {isLoading ? <ActivityIndicator size={'large'}/> : <Text style={{color: 'white', fontSize: 40}}>{pilas.filter(pila => pila.status == 'MINERADO').length}</Text>}
            </View>
          </View>
        </View>
      
       {isLoading ? <ActivityIndicator size={'large'}/> : (
        <>
        <View style={{width: 300,flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, marginTop: 30}}>Minerar</Text>
          <Switch
            value={mining}
            onValueChange={() => {
              minerar();
            }}
            style={{marginTop: 20}}
          />
        </View>  

          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
          {mining?(
            <Image source={require('../../assets/images/mining.gif')} style={{width: 300, height: 300}}/>
          ) : (
            <Image source={require('../../assets/images/sleepy2.gif')} style={{width: 300, height: 300}}/>
          )
          }
        </View>
        </>
       )}
       <View style={{height: 20}}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  saldo: {
    width: 300,
    height: 200,
    borderRadius: 200/2,
    backgroundColor: '#043F63',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -90
  }
})