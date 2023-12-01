import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { Icon } from 'react-native-paper';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
interface IconProps {
  icon: string;
  focused: boolean;
}

const TabItem = ({focused, icon}: IconProps) => {
  return (
          <Icon source={icon} size={focused?60:50} color={focused?"#FF7A0F":"#FFFFFF"}/>
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#043F63',
          },
          headerTitle: "Pilacoin",
          tabBarStyle: {height: 70, backgroundColor: "#043F63"},
          tabBarLabel: "Home",
          tabBarLabelStyle: {color: "#fff", paddingBottom: 5},
          tabBarIcon: ({ focused }) => <TabItem icon="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#043F63',
          },
          headerTitle: "Tranferencia",
          tabBarStyle: {height: 70, backgroundColor: "#043F63"},
          tabBarLabel: "Tranferir",
          tabBarLabelStyle: {color: "#fff", paddingBottom: 5},          
          tabBarIcon: ({ focused }) => <TabItem icon="swap-horizontal" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#043F63',
          },
          headerTitle: "Minerar",
          tabBarStyle: {height: 70, backgroundColor: "#043F63"},
          tabBarLabel: "Minerar",
          tabBarLabelStyle: {color: "#fff", paddingBottom: 5},          
          tabBarIcon: ({ focused }) => <TabItem icon="pickaxe" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
