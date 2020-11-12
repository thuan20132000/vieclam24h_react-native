import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from './constants/CommonIcons';

// Screen
import HomeScreen from './screens/HomeScreen';


function DetailScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Detail Screen</Text>
        </View>
    );
}

/**
 * Home Stack
 */
const StackNavigator = createStackNavigator();
function HomeStackNavigator(){
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name="Home" component={HomeScreen}
            />
        </StackNavigator.Navigator>
    )
}




/**
 * tab
 */
const BottomTabNavigator = createBottomTabNavigator();
function TabNavigator() {
    return (
        <BottomTabNavigator.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = CommonIcons.homeCircle
                            
                    } else if (route.name === 'Settings') {
                        iconName = CommonIcons.bookMarker
                    }else if (route.name === 'Messages'){
                        iconName = CommonIcons.messages
                    }else if(route.name === 'Accounts'){
                        iconName = CommonIcons.account
                    }else {
                        iconName = CommonIcons.newsPaper
                    }
                    

                    // You can return any component that you like here!
                    return <MaterialCommunityIcon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <BottomTabNavigator.Screen name="HomeStack" component={HomeStackNavigator} />
            <BottomTabNavigator.Screen name="Settings" component={DetailScreen} />
            <BottomTabNavigator.Screen name="Messages" component={DetailScreen} />
            <BottomTabNavigator.Screen name="News" component={DetailScreen} />
            <BottomTabNavigator.Screen name="Accounts" component={DetailScreen} />
        </BottomTabNavigator.Navigator>
    );
}



// Main

const Router = () => {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    )
}
export default Router;