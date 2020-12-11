import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from './constants/CommonIcons';

//redux
import { useSelector } from 'react-redux';



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
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import JobListScreen from './screens/JobListScreen';




// reducer
import * as userActions from './store/actions/authenticationActions';
import CustomerJobCreationScreen from './screens/CustomerJobCreationScreen';
import CommonColors from './constants/CommonColors';
import CollaboratorListScreen from './screens/CollaboratorListScreen';
import CollaboratorDetailScreen from './screens/CollaboratorDetailScreen';
import SearchCollaboratorScreen from './screens/SearchCollaboratorScreen';

/**
 * Authentication Stack
 */

const AuthenticationStackNavigator = createStackNavigator();
function AuthenticationStack() {
    return (
        <AuthenticationStackNavigator.Navigator>
            <AuthenticationStackNavigator.Screen
                name="login"
                component={LoginScreen}
                options={{
                    title:"Đăng Nhập"
                }}
            />
            <AuthenticationStackNavigator.Screen
                name="register"
                component={RegisterScreen}
            />
        </AuthenticationStackNavigator.Navigator>
    )
}







/**
 * Home Stack
 */
const StackNavigator = createStackNavigator();
function HomeStackNavigator() {
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
function CollaboratorHomeStack() {
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
            <CollaboratorHomeStackNavigator.Screen
                name="JobList"
                component={JobListScreen}
            />
        </CollaboratorHomeStackNavigator.Navigator>
    )
}




/**
 * Collaborator's Job Stack
 */
const CollaboratorJobStackNavigator = createStackNavigator();
function CollaboratorJobStack() {
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
function AccountStack() {
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
function CustomerHomeStack() {
    return (
        <CustomerHomeStackNavigator.Navigator>
            <CustomerHomeStackNavigator.Screen
                name="CustomerHome"
                component={CustomerHomeScreen}
            />
            <CustomerHomeStackNavigator.Screen
                name="CollaboratorList"
                component={CollaboratorListScreen}
                options={{
                    title:"Danh Sách Ứng Viên"
                }}
            />
            <CustomerHomeStackNavigator.Screen
                name="CollaboratorDetail"
                component={CollaboratorDetailScreen}
                options={{
                    title:"Thông tin ứng viên"
                }}
            />
            <CollaboratorHomeStackNavigator.Screen
                name="Search"
                component={SearchCollaboratorScreen}
            />
        </CustomerHomeStackNavigator.Navigator>
    )
}

/**
 * Customer's Job Stack
 */

const CustomerJobStackNavigator = createStackNavigator();
function CustomerJobStack() {
    return (
        <CustomerJobStackNavigator.Navigator>
            <CustomerJobStackNavigator.Screen
                name="CustomerJobList"
                component={CustomerJobScreen}
                options={{
                    title:"Công Việc Đăng Tuyển"
                }}
            />
            <CustomerHomeStackNavigator.Screen
                name="JobCollaboratorApplying"
                component={JobCollaboratorScreen}
            />
            <CustomerHomeStackNavigator.Screen
                name="CollaboratorDetail"
                component={CollaboratorDetailScreen}
            />

        </CustomerJobStackNavigator.Navigator>
    )
}

/**
 * tab
 */
const BottomTabNavigator = createBottomTabNavigator();
function TabNavigator(props) {


    const { userInformation } = useSelector(state => state.authentication);
    const [userRole, setUserRole] = useState();

    useEffect(() => {

        setUserRole(userInformation.role[0].id);


    }, [userRole]);


    return (
        <BottomTabNavigator.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = CommonIcons.homeCircle

                    } else if (route.name === 'Settings') {
                        iconName = CommonIcons.bookMarker
                    } else if (route.name === 'Messages') {
                        iconName = CommonIcons.messages
                    } else if (route.name === 'Accounts') {
                        iconName = CommonIcons.account
                    } else {
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



            {
                (userRole && userRole == 2) &&
                <>
                    <BottomTabNavigator.Screen
                        name="HomeStack"
                        component={CollaboratorHomeStack}
                    />
                    <BottomTabNavigator.Screen
                        name="MyJobs"
                        component={CollaboratorJobStack}
                    />

                </>
            }



            {
                (userRole && userRole == 3) &&
                <>
                    <BottomTabNavigator.Screen
                        name="HomeStack"
                        component={CustomerHomeStack}
                    />
                    <BottomTabNavigator.Screen
                        name="CustomerJobList"
                        component={CustomerJobStack}

                        options={{
                            tabBarLabel: 'Tin đăng'
                        }}
                    />
                    <BottomTabNavigator.Screen
                        name="CustomerJobCreation"
                        component={CustomerJobCreationScreen}

                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcon style={{ position: 'absolute', bottom: 6 }}
                                    name={CommonIcons.historyJob}
                                    color={CommonColors.primary} size={44}
                                />
                            ),
                            tabBarLabel: 'Tạo công việc',
                        }}
                    />
                </>
            }




            <BottomTabNavigator.Screen name="Messages" component={ChatScreen} />
            <BottomTabNavigator.Screen name="Accounts" component={AccountStack} />
        </BottomTabNavigator.Navigator>
    );
}



// Main

const Router = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const userAccesstoken = useSelector(state => state.authentication.access_token);

    useEffect(() => {
        if (userAccesstoken) {
            setIsAuthenticated(true);

        } else {
            setIsAuthenticated(false);
        }
    }, [userAccesstoken]);



    return (
        <NavigationContainer>
            {
                isAuthenticated ?
                    <TabNavigator /> :
                    <AuthenticationStack />

            }
        </NavigationContainer>
    )
}
export default Router;