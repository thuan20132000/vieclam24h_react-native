import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from './constants/CommonIcons';


// Multiple Language
import {Translate} from './locales/index';


//redux
import { useSelector } from 'react-redux';



// Screen
import ChatScreen from './screens/Messages/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import JobListScreen from './screens/JobListScreen';
import SearchScreen from './screens/SearchScreen';
import AccountScreen from './screens/AccountScreen';

//Collaborator Screen
import JobDetailScreen from './screens/JobDetailScreen';
import CollaboratorJobScreen from './screens/Collaborators/CollaboratorJobScreen';
import CollaboratorProfileScreen from './screens/Collaborators/CollaboratorProfileScreen';
import CollaboratorHomeScreen from './screens/Collaborators/CollaboratorHomeScreen';
import CollaboratorDetailScreen from './screens/Customers/CollaboratorDetailScreen';


//Customer Screen
import CustomerHomeScreen from './screens/Customers/CustomerHomeScreen';
import CustomerJobCreationScreen from './screens/Customers/CustomerJobCreationScreen';
import CustomerJobScreen from './screens/Customers/CustomerJobScreen';
import JobCollaboratorScreen from './screens/Customers/JobCollaboratorScreen';
import CollaboratorListScreen from './screens/Customers/CollaboratorListScreen';


// reducer
import * as userActions from './store/actions/authenticationActions';
import CommonColors from './constants/CommonColors';
import SearchCollaboratorScreen from './screens/SearchCollaboratorScreen';
import ChatLiveScreen from './screens/Messages/ChatLiveScreen';
import CollaboratorSearchScreen from './screens/Collaborators/CollaboratorSearchScreen';
import CustomerStatisticScreen from './screens/Customers/CustomerStatisticScreen';
import CollaboratorStatisticScreen from './screens/Collaborators/CollaboratorStatisticScreen';
import NotificationScreen from './screens/NotificationScreen';
import MapPlaceDirectionScreen from './screens/Map/MapPlaceDirectionScreen';

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
                    title: "Đăng Nhập"
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
                component={CollaboratorSearchScreen}
            />
            <CollaboratorHomeStackNavigator.Screen
                name="JobList"
                component={JobListScreen}
            />
            <CollaboratorHomeStackNavigator.Screen
                name="MapDirection"
                component={MapPlaceDirectionScreen}
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
            <AccountStackNavigator.Screen
                name="CustomerStatistic"
                component={CustomerStatisticScreen}
            />
            <AccountStackNavigator.Screen
                name="CollaboratorStatistic"
                component={CollaboratorStatisticScreen}
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
                    title: "Danh Sách Ứng Viên"
                }}
            />
            <CustomerHomeStackNavigator.Screen
                name="CollaboratorDetail"
                component={CollaboratorDetailScreen}
                options={{
                    title: "Thông tin ứng viên"
                }}
            />
            <CollaboratorHomeStackNavigator.Screen
                name="Search"
                component={SearchCollaboratorScreen}
            />
            <ChatStackNavigator.Screen
                name="ChatLive"
                component={ChatLiveScreen}
            />
        </CustomerHomeStackNavigator.Navigator>
    )
}



const ChatStackNavigator = createStackNavigator();
function ChatStack() {
    return (
        <ChatStackNavigator.Navigator>
            <ChatStackNavigator.Screen
                name="ChatHome"
                component={ChatScreen}
            />
            <ChatStackNavigator.Screen
                name="ChatLive"
                component={ChatLiveScreen}
            />
        </ChatStackNavigator.Navigator>
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
                    title: "Công Việc Đăng Tuyển"
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
 * Notification Stack
 */

 const NotificationStackNavigator = createStackNavigator();
function NotificationStack(){
    return (
        <NotificationStackNavigator.Navigator>
            <NotificationStackNavigator.Screen
                name={'NotificationList'}
                component={NotificationScreen}
            />
        </NotificationStackNavigator.Navigator>
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



    const { current_language } = useSelector(state => state.language);

    const [tabbarTitle, settabbarTitle] = React.useState({
        home: Translate.home,
        apply: Translate.apply,
        messages: Translate.messages,
        account: Translate.account
    })

    useEffect(() => {
        // console.warn(Translate.home);

        settabbarTitle({
            home: Translate.home,
            apply: Translate.apply,
            messages: Translate.messages,
            account: Translate.account
        })

    }, [current_language]);


    return (
        <BottomTabNavigator.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeStack') {
                        iconName = CommonIcons.homeCircle

                    } else if (route.name === 'Settings') {
                        iconName = CommonIcons.bookMarker
                    } else if (route.name === 'Messages') {
                        iconName = CommonIcons.messages
                    } else if (route.name === 'Accounts') {
                        iconName = CommonIcons.account
                    }
                    else if (route.name === 'Notification') {
                        iconName = CommonIcons.bell
                    }
                    else {
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
                        options={{
                            tabBarLabel:tabbarTitle.home
                        }}
                    />
                    <BottomTabNavigator.Screen
                        name="MyJobs"
                        component={CollaboratorJobStack}
                        options={{
                            tabBarLabel:tabbarTitle.apply
                        }}
                    />
                    <BottomTabNavigator.Screen
                        name="Notification"
                        component={NotificationStack}
                        options={{
                            tabBarLabel:'thong bao',
                            tabBarBadge:3
                        }}
                        
                    />

                </>
            }



            {
                (userRole && userRole == 3) &&
                <>
                    <BottomTabNavigator.Screen
                        name="HomeStack"
                        component={CustomerHomeStack}
                        options={{
                            tabBarLabel:tabbarTitle.home
                        }}
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




            <BottomTabNavigator.Screen 
                name="Messages" 
                component={ChatStack} 
                options={{
                    tabBarLabel:tabbarTitle.messages
                }}
            />
            <BottomTabNavigator.Screen 
                name="Accounts" 
                component={AccountStack} 
                options={{
                    tabBarLabel:tabbarTitle.account
                }}
            />
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