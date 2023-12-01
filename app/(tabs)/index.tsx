import { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Image } from "react-native";
import { Text, Switch } from "react-native-paper";
import { getAPI } from "../../context/app.context";

interface Pilacoin {
  nonce: string;
  status: string;
}

interface MineState {
  minerandoPila: boolean;
  minerandoBloco: boolean;
  validandoPila: boolean;
  validandoBloco: boolean;
}

export default function TabOneScreen() {
  const [saldo, setSaldo] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mining, setMining] = useState(true);
  const [validating, setValidating] = useState(false);
  const [miningBlock, setMiningBlock] = useState(false);
  const [validatingBlock, setValidatingBlock] = useState(false);
  const [pilas, setPilas] = useState<Pilacoin[]>([]);
  const { API } = getAPI();

  const loadSaldo = () => {
    setLoading(true);
    API.get<Pilacoin[]>('teste/pilas').then((response: any)=>{
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
    API.get<Pilacoin[]>('teste/pilas').then((response)=>{
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
    API.get<boolean>('teste/minerar').then((response)=>{
      console.log(response.data);
      setMining(response.data);
    }).catch((erro: any)=>{
      console.log(erro);
    })
  }

  const validar = () => {
    API.get<boolean>('teste/validarPila').then((response)=>{
      console.log(response.data);
      setValidating(response.data);
    }).catch((erro: any)=>{
      console.log(erro);
    })
  }

  const minerarBlock = () => {
    API.get<boolean>('teste/minerarBloco').then((response)=>{
      console.log(response.data);
      setMiningBlock(response.data);
    }).catch((erro: any)=>{
      console.log(erro);
    })
  }

  const validarBlock = () => {
    API.get<boolean>('teste/validarBloco').then((response)=>{
      console.log(response.data);
      setValidatingBlock(response.data);
    }).catch((erro: any)=>{
      console.log(erro);
    })
  }

  const checkState = () => {
    API.get<MineState>('teste/mineState').then((response)=>{
      console.log(response.data);
      setMining(response.data.minerandoPila);
      setMiningBlock(response.data.minerandoBloco);
      setValidating(response.data.validandoPila);
      setValidatingBlock(response.data.validandoBloco);
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
            <View style={{width: '30%', marginTop: 30, backgroundColor: "#043F63", padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 30}}>
              <Text style={{color: 'white', textAlign: 'center'}}>Pilas validos</Text>
              {isLoading ? <ActivityIndicator size={'large'}/> : <Text style={{color: 'white', fontSize: 40}}>{pilas.filter(pila => pila.status == 'VALIDO').length}</Text>}
            </View>
            <View style={{width: '30%', marginTop: 30, backgroundColor: "#043F63", padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 30}}>
              <Text style={{color: 'white', textAlign: 'center'}}>Pilas Minerados</Text>
              {isLoading ? <ActivityIndicator size={'large'}/> : <Text style={{color: 'white', fontSize: 40}}>{pilas.filter(pila => pila.status == 'AG_VALIDACAO').length}</Text>}
            </View>
            <View style={{width: '30%', marginTop: 30, backgroundColor: "#043F63", padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 30}}>
              <Text style={{color: 'white', textAlign: 'center'}}>Pilas em Bloco</Text>
              {isLoading ? <ActivityIndicator size={'large'}/> : <Text style={{color: 'white', fontSize: 40}}>{pilas.filter(pila => pila.status == 'BLOCO_EM_VALIDACAO').length}</Text>}
            </View>
          </View>
        </View>
      
       {isLoading ? <ActivityIndicator size={'large'}/> : (
        <>
        <View style={{width: 300,flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, marginTop: 30}}>Minerar Pilacoins</Text>
          <Switch
            value={mining}
            onValueChange={() => {
              minerar();
            }}
            style={{marginTop: 20}}
          />
        </View> 
        <View style={{width: 300,flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, marginTop: 30}}>Validar Pilacoins</Text>
          <Switch
            value={validating}
            onValueChange={() => {
              validar();
            }}
            style={{marginTop: 20}}
          />
        </View> 
        <View style={{width: 300,flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, marginTop: 30}}>Minerar Blocos</Text>
          <Switch
            value={miningBlock}
            onValueChange={() => {
              minerarBlock();
            }}
            style={{marginTop: 20}}
          />
        </View> 
        <View style={{width: 300,flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, marginTop: 30}}>Validar Blocos</Text>
          <Switch
            value={validatingBlock}
            onValueChange={() => {
              validarBlock();
            }}
            style={{marginTop: 20}}
          />
        </View> 
          {/*<View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
          {mining?(
            <Image source={require('../../assets/images/mining.gif')} style={{width: 300, height: 300}}/>
          ) : (
            <Image source={require('../../assets/images/sleepy2.gif')} style={{width: 300, height: 300}}/>
          )
          }
        </View>*/}
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