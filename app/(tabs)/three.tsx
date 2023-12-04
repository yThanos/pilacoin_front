import { ScrollView, View, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { getAPI } from "../../context/app.context";

const LogScreen = () => {
    const { messages } = getAPI();
    const {width, height} = useWindowDimensions();

    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: "white"}}>Mensagens</Text>
            <ScrollView style={{height: height * 0.4, width: width * 0.9}}>
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
            <ScrollView style={{height: height * 0.4, width: width * 0.9}}>
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