import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from './constants/CommonIcons';

// Screen
import HomeScreen from './screens/CollaboratorHomeScreen';
import CollaboratorHome from './screens/CollaboratorHomeScreen';
import JobDetailScreen from './screens/JobDetailScreen';
import CollaboratorJobScreen from './screens/CollaboratorJobScreen';
import AccountScreen from './screens/AccountScreen';
import CollaboratorProfileScreen from './screens/CollaboratorProfileScreen';
import SearchScreen from './screens/SearchScreen';
import CustomerHomeScreen from './screens/CustomerHomeScreen';
import CollaboratorHomeScreen from './screens/CollaboratorHomeScreen';
import CustomerJobScreen from './screens/CustomerJobScreen';
import JobCollaboratorScreen from './screens/JobCollaboratorScreen';


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
 * Collabirator Home Stack
 */
const CollaboratorHomeStackNavigator = createStackNavigator();
function CollaboratorHomeStack(){
    return (
        <CollaboratorHomeStackNavigator.Navigator>
            <CollaboratorHomeStackNavigator.Screen
                name="CollaboratorHome"
                component={CollaboratorHomeScreen}
            />
            <CollaboratorHomeStackNavigator.Screen
                name="JobDetail"
                component={JobDetailScreen}
            />
            <CollaboratorHomeStackNavigator.Screen
                name="Search"
                component={SearchScreen}
            />
        </CollaboratorHomeStackNavigator.Navigator>
    )
}




/**
 * Collaborator's Job Stack
 */
const CollaboratorJobStackNavigator = createStackNavigator();
function CollaboratorJobStack(){
    return (
        <CollaboratorHomeStackNavigator.Navigator>
            <CollaboratorHomeStackNavigator.Screen
                name="CollaboratorJob"
                component={CollaboratorJobScreen}
            />
        </CollaboratorHomeStackNavigator.Navigator>
    )
}



/**
 * Account Stack
 */
const AccountStackNavigator = createStackNavigator();
function AccountStack(){
    return (
        <AccountStackNavigator.Navigator>
            <AccountStackNavigator.Screen
                name="Account"
                component={AccountScreen}
            />
            <AccountStackNavigator.Screen
                name="CollaboratorProfile"
                component={CollaboratorProfileScreen}
            />
        </AccountStackNavigator.Navigator>
    )
}




/**
 * Customer Home Stack
 */
const CustomerHomeStackNavigator = createStackNavigator();
function CustomerHomeStack(){
    return (
        <CustomerHomeStackNavigator.Navigator>
            <CustomerHomeStackNavigator.Screen
                name="CustomerHome"
                component={CustomerHomeScreen}
            />
        </CustomerHomeStackNavigator.Navigator>
    )
}

/**
 * Customer's Job Stack
 */

 const CustomerJobStackNavigator = createStackNavigator();
 function CustomerJobStack(){
     return (
         <CustomerJobStackNavigator.Navigator>
             <CustomerJobStackNavigator.Screen
                name="CustomerJob"
                component={CustomerJobScreen}
             />
             <CustomerHomeStackNavigator.Screen
                name="JobCollaborator"
                component={JobCollaboratorScreen}
             />
         </CustomerJobStackNavigator.Navigator>
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
            <BottomTabNavigator.Screen 
                name="HomeStack" 
                component={CollaboratorHomeStack} 
            />
            <BottomTabNavigator.Screen
                name="CustomerHomeStack"
                component={CustomerHomeStack}
            />

            <BottomTabNavigator.Screen 
                name="MyJobs" 
                component={CollaboratorJobStack} 
            />
            <BottomTabNavigator.Screen
                name="CustomerJob"
                component={CustomerJobStack}
            />
            <BottomTabNavigator.Screen name="Messages" component={DetailScreen} />
            <BottomTabNavigator.Screen name="Accounts" component={AccountStack} />
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