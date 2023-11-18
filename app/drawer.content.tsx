import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-paper';

interface CustomDrawerContentProps {
    navigation: any;
}

const CustomDrawerContent = ({navigation}: CustomDrawerContentProps) => {
    const router = useRouter();
    return (
        <DrawerContentScrollView>
            
            <DrawerItem
                label="Home"
                icon={({color, size, focused}) => <Icon source={"home"} color={focused?"#FF7A0F":color} size={size}/>}
                onPress={() => {
                router.push('/(tabs)');
                }}
            />
            <DrawerItem
                label="Option 2"
                icon={({color, size, focused}) => <Icon source={"cog"} color={focused?"#FF7A0F":color} size={size}/>}
                onPress={() => {
                router.push('/(tabs)/three');
                }}
            />
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
