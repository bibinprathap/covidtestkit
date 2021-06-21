import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppContext from '../../appConfig/constant'
import { CommonActions } from '@react-navigation/native';



export default function inddex(props) {

    const { setAuthToken } = useContext(AppContext)
    useEffect(() => {
        getSyncInfo()
    }, [])

    const getSyncInfo = async () => {
        try {
            const value = await AsyncStorage.getItem('@userToken');

            if (value !== null) {
                // userdata=JSON.parse(value).userToken
                console.warn('HAHAHA', JSON.parse(value).authToken)
                setAuthToken(JSON.parse(value).authToken)
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'home' },

                        ],
                    })
                );
            }
            else {
                console.warn('no data found')
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'onboard' },

                        ],
                    })
                );
            }



        } catch (error) {
            // Error retrieving data
            console.warn('noooo', error)
            // Toast.show('Something went wrong')

        }
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>SPLASH SCREEN</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
