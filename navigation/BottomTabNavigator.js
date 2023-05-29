import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "react-native-vector-icons";
import React, {useRef, useState} from 'react'
import { MoveNegAnimation, MovePosAnimation } from '../assets/animation/AllAnimations';

import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import ManagementStack from './ManagementStack';
import MyClaimsStack from './MyClaimsStack';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const [isBackButtonHover, setIsBackButtonHover] = useState(false);
  const loginButtonHover = useRef(new Animated.Value(0)).current;

  const CustomTabBarButton = ({children, onPress})=>(
    <TouchableOpacity className="flex justify-center items-center bg-[#D9D9D9]">
      <Ionicons name="add-circle-outline" color={color} size={size}/>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator

      screenOptions={{
        tabBarStyle: { 
          height:'70px',
          alignItems:'center'
        },

      tabBarItemStyle: {
        borderRadius:'12px',
        width:"60px",
        height:'50px',
      },

        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#E04F4F',
        tabBarActiveBackgroundColor: '#EEEEEE',
        tabBarInactiveTintColor: '#444444'
      
      }}
    >
        <Tab.Screen name="Home" component={HomeStack}
          options={{
            styles: {transform: [{translateY: loginButtonHover}]},
            tabBarIcon: ({focused, color, size})=>(
              <View style={{postion:'absolute',transform: [{translateY: loginButtonHover}]}} onMouseEnter={() => MoveNegAnimation(loginButtonHover)} onMouseLeave={() => MovePosAnimation(loginButtonHover)}>
                <Ionicons name="home-outline" color={color} size={size}/>
              </View>
            ),
          }}
        />
        <Tab.Screen name="Management" component={ManagementStack}
          options={{
            tabBarIcon: ({focused, color, size})=>(
                <Ionicons name="file-tray-full-outline" color={color} size={size}/>
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
                <Ionicons name="duplicate-outline" color={color} size={size}/>
              </View>
            ),
          }}
        />
        <Tab.Screen name="MyClaims" component={MyClaimsStack}
          options={{
            tabBarIcon: ({focused, color, size})=>(
                <Ionicons name="document-text-outline" color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfileStack}
          options={{
            tabBarIcon: ({focused, color, size})=>(
                <Ionicons name="people-outline" color={color} size={size}/>
            ),
          }}
        />
    </Tab.Navigator>

  )
}
