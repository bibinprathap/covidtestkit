import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StatusBar, SafeAreaView, Platform } from 'react-native'
import Router from './Router'
import AppContext from './constant'
import config from '../appConfig/Config'
import Apiconstants from '../appConfig/APIConstants'
import API from '../appConfig/api'
import Config from '../appConfig/Config'
import Fonts from './Fonts'


const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

function Context(props) {
  const [userDetials, setUserDetails] = useState(null)
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = () => {

    API(Apiconstants.GET_USER_DETAILS, null, "POST", null)
      .then((res) => {
        console.warn('USER DATA', res.data)
        setUserProfile(res.data)

      })
      .catch((error) => {
        console.warn('ERRR', error);
      });
  }











  const MyStatusBar = ({ backgroundColor, ...props }) => {
    if (Platform.OS == 'ios') {
      return (
        // <View style={{ backgroundColor: Config.dark }}>
        //   <SafeAreaView>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        //   </SafeAreaView>
        // </View>
      )
    }
    else {
      return (
        // <GradientView style={{ height: StatusBar.currentHeight }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        // </GradientView >
      )
    }

  };

  return (
    <AppContext.Provider
      value={{
        userDetials,
        setUserDetails,
        userProfile,
        getUserDetails
      }}>
      <Router />
      {/* <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={config.light} barStyle="light-content" />
        {connection && <Router />}
        {!connection &&
          <View style={{ flex: 1, backgroundColor: Config.bg_color, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons size={50} color={Config.dark} name='wifi-off' />
            <Text style={{ fontFamily: Fonts.semi_bold, fontSize: 20 }}>Oops!</Text>
            <Text style={{ fontFamily: Fonts.semi_bold, fontSize: 20 }}>No Internet</Text>
          </View>}
      </View> */}
    </AppContext.Provider>
  )
}
export default Context

