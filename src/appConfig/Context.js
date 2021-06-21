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
  const [userProfile, setUserProfile] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const [callingProfile, setCallingProfile] = useState(false)

  useEffect(() => {
    if (authToken) {
      getUserDetails(authToken)
    }
  }, [authToken])

  const getUserDetails = (authToken) => {
    setCallingProfile(true)
    var data = new FormData()
    data.append('authcode', authToken);

    API(Apiconstants.GET_USER_DETAILS, data, "POST", null)
      .then((res) => {
        if (res.data.name) {
          setUserProfile(res.data)
        }
        setCallingProfile(false)

        // console.warn('USER DATA', res.data)

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
        userProfile,
        getUserDetails,
        authToken, setAuthToken,
        callingProfile
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

