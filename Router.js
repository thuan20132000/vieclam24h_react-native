import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, useNavigation, TabActions, useNavigationBuilder } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, StackCardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from './constants/CommonIcons';

// Multiple Language
import { Translate } from './locales/index';


//redux
import { useSelector } from 'react-redux';



// Screen
import ChatScreen from './screens/Messages/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import JobListScreen from './screens/JobListScreen';
import SearchScreen from './screens/SearchScreen';
import AccountScreen from './screens/AccountScreen';

//Candidate Screen
import JobDetailScreen from './screens/JobDetailScreen';
import CollaboratorJobScreen from './screens/Collaborators/CollaboratorJobScreen';
import CollaboratorProfileScreen from './screens/Collaborators/CollaboratorProfileScreen';
import CollaboratorHomeScreen from './screens/Collaborators/CollaboratorHomeScreen';
import CollaboratorDetailScreen from './screens/Customers/CollaboratorDetailScreen';



//Customer Screen
import CustomerJobScreen from './screens/Customers/CustomerJobScreen';


// reducer
import * as userActions from './store/actions/authenticationActions';
import CommonColors from './constants/CommonColors';
import ChatLiveScreen from './screens/Messages/ChatLiveScreen';
import CollaboratorSearchScreen from './screens/Collaborators/CollaboratorSearchScreen';
import CustomerStatisticScreen from './screens/Customers/CustomerStatisticScreen';
import CollaboratorStatisticScreen from './screens/Collaborators/CollaboratorStatisticScreen';
import NotificationScreen from './screens/NotificationStack/NotificationScreen';
import MapPlaceDirectionScreen from './screens/Map/MapPlaceDirectionScreen';
import CategorySectionScreen from './screens/PostJob/CategorySectionScreen';
import FieldSectionScreen from './screens/PostJob/FieldSectionScreen';
import { Easing } from 'react-native-reanimated';
import LocationSectionScreen from './screens/PostJob/LocationSectionScreen';
import PhotoSectionScreen from './screens/PostJob/PhotoSectionScreen';
import TitleSectionScreen from './screens/PostJob/TitleSectionScreen';
import DescriptionSectionScreen from './screens/PostJob/DescriptionSectionScreen';
import PriceSectionScreen from './screens/PostJob/PriceSectionScreen';
import ReviewSectionScreen from './screens/PostJob/ReviewSectionScreen';
import LocationRegisterScreen from './screens/RegisterCandidate/LocationRegisterScreen';
import CategoryRegisterScreen from './screens/RegisterCandidate/CategoryRegisterScreen';
import IdentificationRegisterScreen from './screens/RegisterCandidate/IdentificationRegisterScreen';
import PhoneNumberRegisterScreen from './screens/RegisterCandidate/PhoneNumberRegisterScreen';
import ReviewRegisterScreen from './screens/RegisterCandidate/ReviewRegisterScreen';
import CandidateProfileScreen from './screens/CandidateProfileScreen';
import CategoryUpdateScreen from './screens/UpdateCandidate/CategoryUpdateScreen';
import LocationUpdateScreen from './screens/UpdateCandidate/LocationUpdateScreen';
import IdentificationUpdateScreen from './screens/UpdateCandidate/IdentificationUpdateScreen';
import ReviewUpdateScreen from './screens/UpdateCandidate/ReviewUpdateScreen';
import SearchHomeScreen from './screens/Search/SearchHomeScreen';
import CandidateReviewsScreen from './screens/Customers/CandidateReviewsScreen';
import NotificationSettingHomeScreen from './screens/NotificationSettingStack/NotificationSettingHomeScreen';
import NotificationDetailScreen from './screens/NotificationStack/NotificationDetailScreen';
import JobCandidateTrackingScreen from './screens/Tracking/JobCandidateTrackingScreen';
import JobUserTrackingScreen from './screens/Tracking/JobUserTrackingScreen';
import JobCandidateSelectionScreen from './screens/Customers/JobCandidateSelectionScreen';
import JobConfirmScreen from './screens/Customers/JobConfirmScreen';
import CandidateServiceListScreen from './screens/ServiceSelectionStack/CandidateServiceListScreen';
import SelectedServiceReviewScreen from './screens/ServiceSelectionStack/SelectedServiceReviewScreen';
import PaymentMethodScreen from './screens/Payment/PaymentMethodScreen';
import LocationSelectionCommonScreen from './screens/LocationSelectionCommonScreen';






/**
 * Authentication Stack
 */

const AuthenticationStackNavigator = createStackNavigator();
function AuthenticationStack() {
    return (
        <AuthenticationStackNavigator.Navigator
            initialRouteName={'login'}
        >
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
                options={{
                    title: "Đăng ký"
                }}
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
function CustomerJobStack(props) {

    const configOpen = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    const configClose = {
        animation: 'timing',
        config: {
            duration: 200,
            easing: Easing.linear
        },
    };


    React.useLayoutEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false,

        });

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true,

            });
        }
    }, []);


    return (
        <CustomerJobStackNavigator.Navigator
            screenOptions={{
                title: <TouchableOpacity onPress={() => props.navigation.goBack()}><Text>Trở lại</Text></TouchableOpacity>,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                animationEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                transitionSpec: {
                    open: configOpen,
                    close: configClose
                },


            }}
        >
            <CustomerJobStackNavigator.Screen
                name="CustomerJobList"
                component={CustomerJobScreen}
                options={{
                    title: "Công Việc Đăng Tuyển"
                }}
            />
            <CustomerJobStackNavigator.Screen
                name="JobConfirm"
                component={JobConfirmScreen}
                options={{
                    title: "Xác nhận công việc"
                }}
            />
            {/* <CustomerHomeStackNavigator.Screen
                name="JobCollaboratorApplying"
                component={JobCollaboratorScreen}
            />
            <CustomerHomeStackNavigator.Screen
                name="CollaboratorDetail"
                component={CollaboratorDetailScreen}
            />
            <CustomerHomeStackNavigator.Screen
                name="CustomerJobDetail"
                component={CustomerJobDetailScreen}
            />
            <CustomerHomeStackNavigator.Screen
                name="JobConfirm"
                component={JobConfirmScreen}

            /> */}


        </CustomerJobStackNavigator.Navigator>
    )
}




/**
 * Notification Stack
 */

const NotificationStackNavigator = createStackNavigator();
function NotificationStack() {

    const configOpen = {
        animation: 'timing',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    const configClose = {
        animation: 'spring',
        config: {
            stiffness: 500,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    return (
        <NotificationStackNavigator.Navigator
            screenOptions={{
                title: "Thông báo",
                gestureEnabled: false,
                animationEnabled: true,
                swipeEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: configOpen,
                    close: configClose
                },

            }}


        >
            <NotificationStackNavigator.Screen
                name={'NotificationList'}
                component={NotificationScreen}
            />
            <NotificationStackNavigator.Screen
                name={'NotificationDetail'}
                component={NotificationDetailScreen}
            />
            <NotificationStackNavigator.Screen
                name='JobCandidateTracking'
                component={JobCandidateTrackingScreen}
            />
            <NotificationStackNavigator.Screen
                name="JobDetail"
                component={JobDetailScreen}
            />
        </NotificationStackNavigator.Navigator>
    )
}




/**
 * CreateJob Stack
 */
const PostJobStackNavigator = createStackNavigator();
function PostJobStack(props) {

    const configOpen = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    const configClose = {
        animation: 'timing',
        config: {
            duration: 200,
            easing: Easing.linear
        },
    };



    React.useLayoutEffect(() => {

        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        })

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            })
        }

    }, []);


    return (


        <PostJobStackNavigator.Navigator
            screenOptions={{
                title: <TouchableOpacity onPress={() => props.navigation.goBack()}><Text>Trở lại</Text></TouchableOpacity>,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                animationEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: configOpen,
                    close: configClose
                }

            }}

        >
            <PostJobStackNavigator.Screen
                name={'CategorySection'}
                component={CategorySectionScreen}


            />
            <PostJobStackNavigator.Screen
                name={'FieldSection'}
                component={FieldSectionScreen}
            />
            <PostJobStackNavigator.Screen
                name={'LocationSection'}
                component={LocationSectionScreen}
            />
            <PostJobStackNavigator.Screen
                name={'PhotoSection'}
                component={PhotoSectionScreen}
            />
            <PostJobStackNavigator.Screen
                name={'TitleSection'}
                component={TitleSectionScreen}
            />
            <PostJobStackNavigator.Screen
                name={'DescriptionSection'}
                component={DescriptionSectionScreen}
            />
            <PostJobStackNavigator.Screen
                name={'PriceSection'}
                component={PriceSectionScreen}
            />
            <PostJobStackNavigator.Screen
                name={'ReviewSection'}
                component={ReviewSectionScreen}
            />
        </PostJobStackNavigator.Navigator>
    )
}




/**
 * RegisterCandidate Stack
 */
const RegisterCandidate = createStackNavigator();
function RegisterCandidateStack(props) {


    const configOpen = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    const configClose = {
        animation: 'timing',
        config: {
            duration: 200,
            easing: Easing.linear
        },
    };

    React.useLayoutEffect(() => {

        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        })

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            })
        }

    }, []);




    return (
        <RegisterCandidate.Navigator
            screenOptions={{
                title: <TouchableOpacity onPress={() => props.navigation.goBack()}><Text>Trở lại</Text></TouchableOpacity>,
                gestureEnabled: false,
                animationEnabled: true,
                swipeEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: configOpen,
                    close: configClose
                }

            }}


        >
            <RegisterCandidate.Screen
                name={"CategoryRegister"}
                component={CategoryRegisterScreen}

            />
            <RegisterCandidate.Screen
                name={"LocationRegister"}
                component={LocationRegisterScreen}
            />
            <RegisterCandidate.Screen
                name={"IdentificationRegister"}
                component={IdentificationRegisterScreen}
            />
            <RegisterCandidate.Screen
                name={'PhonenNumberRegister'}
                component={PhoneNumberRegisterScreen}
            />
            <RegisterCandidate.Screen
                name={'ReviewRegister'}
                component={ReviewRegisterScreen}

            />


        </RegisterCandidate.Navigator>
    )
}



/**
 * UpdateCandidate Stack
 */
const UpdateCandidate = createStackNavigator();
function UpdateCandidateStack(props) {


    const configOpen = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    const configClose = {
        animation: 'timing',
        config: {
            duration: 200,
            easing: Easing.linear
        },
    };

    React.useLayoutEffect(() => {

        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        })

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            })
        }

    }, []);




    return (
        <UpdateCandidate.Navigator
            screenOptions={{
                title: <TouchableOpacity onPress={() => props.navigation.goBack()}><Text>Trở lại</Text></TouchableOpacity>,
                gestureEnabled: false,
                animationEnabled: true,
                swipeEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: configOpen,
                    close: configClose
                }

            }}


        >
            <UpdateCandidate.Screen
                name={"CategoryUpdate"}
                component={CategoryUpdateScreen}

            />
            <UpdateCandidate.Screen
                name={"LocationUpdate"}
                component={LocationUpdateScreen}
            />
            <UpdateCandidate.Screen
                name={"IdentificationUpdate"}
                component={IdentificationUpdateScreen}
            />
            <UpdateCandidate.Screen
                name={"ReviewUpdate"}
                component={ReviewUpdateScreen}
            />


        </UpdateCandidate.Navigator>
    )
}




const NotificationSettingStackNavigator = createStackNavigator();
const NotificationSettingStack = () => {

    const configOpen = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    const configClose = {
        animation: 'timing',
        config: {
            duration: 200,
            easing: Easing.linear
        },
    };

    return (
        <NotificationSettingStackNavigator.Navigator
            screenOptions={{
                gestureEnabled: false,
                animationEnabled: true,
                swipeEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: configOpen,
                    close: configClose
                }

            }}

        >
            <NotificationSettingStackNavigator.Screen
                name="NoticationSettingHome"
                component={NotificationSettingHomeScreen}
                options={{
                    title: "Cài đặt thông báo"
                }}
            />
        </NotificationSettingStackNavigator.Navigator>
    )
}



/**
 * Account Stack
 */
const AccountStackNavigator = createStackNavigator();
function AccountStack() {

    let option_slide = {
        title: "",
        gestureEnabled: false,
        animationEnabled: true,
        swipeEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
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
            <AccountStackNavigator.Screen
                name="RegisterCandidateStack"
                component={RegisterCandidateStack}
                options={{
                    headerShown: false,
                }}
            />
            <AccountStackNavigator.Screen
                name="UpdateCandidateStack"
                component={UpdateCandidateStack}
                options={{
                    headerShown: false,
                }}
            />
            <AccountStackNavigator.Screen
                name="CandidateProfile"
                component={CandidateProfileScreen}
            />
            <AccountStackNavigator.Screen
                name="ApplyJobStack"
                component={CollaboratorJobScreen}
            />
            <AccountStackNavigator.Screen
                name="PostJobStack"
                component={PostJobStack}
                options={{
                    headerShown: false
                }}
            />
            <AccountStackNavigator.Screen
                name="UserJobStack"
                component={CustomerJobStack}
                options={{
                    headerShown: false,
                }}
            />
            <AccountStackNavigator.Screen
                name="NotificationSettingStack"
                component={NotificationSettingStack}
                options={{
                    headerShown: false,
                }}
            />
            <AccountStackNavigator.Screen
                name="JobCandidateTracking"
                component={JobCandidateTrackingScreen}
                options={option_slide}
            />
            <AccountStackNavigator.Screen
                name="JobUserTracking"
                component={JobUserTrackingScreen}
                options={option_slide}
            />

            <AccountStackNavigator.Screen
                name="JobCandidateSelection"
                component={JobCandidateSelectionScreen}
                options={option_slide}
            />
            <AccountStackNavigator.Screen
                name="CandidateDetail"
                component={CollaboratorDetailScreen}
                options={option_slide}
            />
            <AccountStackNavigator.Screen
                name="CandidateReview"
                component={CandidateReviewsScreen}
                options={option_slide}
            />

        </AccountStackNavigator.Navigator>
    )
}




/**
 * Search Stack
 */


const SearchStackNavigator = createStackNavigator();
const SearchStack = () => {

    const configOpen = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    const configClose = {
        animation: 'timing',
        config: {
            duration: 200,
            easing: Easing.linear
        },
    };




    return (


        <SearchStackNavigator.Navigator
            screenOptions={{
                gestureEnabled: false,
                animationEnabled: true,
                swipeEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: configOpen,
                    close: configClose
                }

            }}
        >

            <SearchStackNavigator.Screen
                name="SearchHome"
                component={SearchHomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <SearchStackNavigator.Screen
                name="CandidateDetail"
                component={CollaboratorDetailScreen}
                options={{
                    title: "Thông tin"
                }}

            />
            <SearchStackNavigator.Screen
                name="CandidateServiceList"
                component={CandidateServiceListScreen}
                options={{
                    title: "Dịch vụ cung cấp"
                }}

            />
            <SearchStackNavigator.Screen
                name="SelectedServiceReview"
                component={SelectedServiceReviewScreen}
                options={{
                    title: "Thanh toán dịch vụ"
                }}
            />
            <SearchStackNavigator.Screen
                name="PaymentMethodSelection"
                component={PaymentMethodScreen}
                options={{
                    title: "Phương thức thanh toán"
                }}
            />
            <SearchStackNavigator.Screen
                name="LocationSelection"
                component={LocationSelectionCommonScreen}
                options={{
                    title: "Địa điểm"
                }}
            />
            <SearchStackNavigator.Screen
                name="CandidateReview"
                component={CandidateReviewsScreen}
                options={{
                    title: "Đánh giá"
                }}

            />

        </SearchStackNavigator.Navigator>

    )
}






/**
 * tab
 */
const BottomTabNavigator = createBottomTabNavigator();
function TabNavigator(props) {


    const { userInformation } = useSelector(state => state.authentication);
    const [userRole, setUserRole] = useState();

    // useEffect(() => {

    //     setUserRole(userInformation.role[0].id);


    // }, [userRole]);



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
            initialRouteName={'HomeSearch'}
        >



            <BottomTabNavigator.Screen
                name="HomeStack"
                component={CollaboratorHomeStack}
                options={{
                    tabBarLabel: tabbarTitle.home
                }}
            />
            <BottomTabNavigator.Screen
                name="Notification"
                component={NotificationStack}
                options={{
                    tabBarLabel: 'Thông báo',
                }}

            />
            <BottomTabNavigator.Screen
                name="HomeSearch"
                component={SearchStack}
                options={{
                    tabBarLabel: "",
                    tabBarVisible: true,
                    tabBarIcon: () => (
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 12,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.37,
                                shadowRadius: 7.49,

                                elevation: 12,
                                // top: 12,
                                padding: 4,
                                marginTop: 18

                                // borderTopRightRadius:22,
                                // borderTopLeftRadius:22
                            }}
                        >
                            {/* <MaterialCommunityIcon
                                name={CommonIcons.search}
                                color={'coral'}
                                size={34}
                            /> */}
                            <Image
                                source={
                                    require('./utils/gift/search2.gif')

                                }
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20
                                }}
                            />
                        </View>
                    ),
                }}

            />



            <BottomTabNavigator.Screen
                name="Messages"
                component={ChatStack}
                options={{
                    tabBarLabel: tabbarTitle.messages
                }}
            />
            <BottomTabNavigator.Screen
                name="Accounts"
                component={AccountStack}
                options={{
                    tabBarLabel: tabbarTitle.account,

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