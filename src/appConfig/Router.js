import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, NavigationActions } from '@react-navigation/stack';
// import { NavigationActions } from 'react-navigation'
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useContext, component } from 'react'
import { enableScreens } from 'react-native-screens';

import AppContext from '../appConfig/constant'


import SplashScreen from '../screens/SplashScreen/index'
import OnBoardingScreen from '../screens/OnBoardScreen/index'
import LoginScreen from '../screens/LoginScreen/index'
import OTPScreen from '../screens/OtpScreen/index'
import AadharDetails from '../screens/AdharDetailsScreen/index'
import HomeScreen from '../screens/HomeScreen/index'
import TestScreen from '../screens/TestScreen/index'
import Profile from '../screens/ProfileScreen/index'
import TestDetails from '../screens/TestDetailsScreen/index'
import UserHistory from '../screens/UserHistoryScreen/index'
import TestResult from '../screens/TestResultScreen/index'
import CovidTestKitScanScreen from '../screens/CovidTestKitScanScreen/index'
import Users from '../screens/UsersScreen/index'


import AdharResult from '../screens/AdharResultScreen/index'
import Timer from '../screens/TimerScreen/index'
import VerifyAdhar from '../screens/VerifyAdharScreen/index'

enableScreens();
const Stack = createStackNavigator();

const MyStack = () => {

    return (
        <NavigationContainer >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            >
                {/* <Stack.Screen name='home' component={HomeScreen} /> */}

                <Stack.Screen name='splash' component={SplashScreen} />
                <Stack.Screen name='onboard' component={OnBoardingScreen} />
                <Stack.Screen name='login' component={LoginScreen} />
                <Stack.Screen name='otp' component={OTPScreen} />
                <Stack.Screen name='home' component={HomeScreen} />
                <Stack.Screen name='adhar' component={AadharDetails} />
                <Stack.Screen name='test' component={TestScreen} />
                <Stack.Screen name='profile' component={Profile} />
                <Stack.Screen name='testdetails' component={TestDetails} />
                <Stack.Screen name='userhistory' component={UserHistory} />
                <Stack.Screen name='testresult' component={TestResult} />
                <Stack.Screen name='covidtestkitscan' component={CovidTestKitScanScreen} />
                <Stack.Screen name='adharresult' component={AdharResult} />
                <Stack.Screen name='timer' component={Timer} />
                <Stack.Screen name='verifyadhar' component={VerifyAdhar} />
                <Stack.Screen name='users' component={Users} />



            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack