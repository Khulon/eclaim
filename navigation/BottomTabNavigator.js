import { View, Text, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "react-native-vector-icons";
import React from 'react'

import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import ManagementStack from './ManagementStack';
import MyClaimsStack from './MyClaimsStack';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const CustomTabBarButton = ({children, onPress})=>(
    <TouchableOpacity className="flex justify-center items-center bg-[#D9D9D9]">
      <Icon type="octicon" name="plus"/>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#39C7A5',
      }}
    >
        <Tab.Screen name="Home" component={HomeStack}
          options={{
            tabBarIcon: ({focused, color, size})=>(
                <Ionicons name="chevron-back-outline" color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen name="Chat" component={ManagementStack}
          options={{
            tabBarIcon: ({focused, color, size})=>(
                <Ionicons name="chevron-back-outline" color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen name="Add" component={CustomTabBarButton}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('AddClaimStack');
            }
          })}
          options={{
            tabBarIcon: ({focused, color, size})=>(
              <View className="rounded-xl bg-[#BFEDE3] w-10 h-8 items-center justify-center">
                <Ionicons name="chevron-back-outline" color={color} size={size}/>
              </View>
            ),
          }}
        />
        <Tab.Screen name="Cart" component={MyClaimsStack}
          options={{
            tabBarIcon: ({focused, color, size})=>(
                <Ionicons name="chevron-back-outline" color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfileStack}
          options={{
            tabBarIcon: ({focused, color, size})=>(
                <Ionicons name="chevron-back-outline" color={color} size={size}/>
            ),
          }}
        />
    </Tab.Navigator>
  )
}
