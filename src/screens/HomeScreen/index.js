import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Modal, ScrollView, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native'
import Button from '../../components/Button'
import Fonts from '../../appConfig/Fonts'
import HomeHeader from './components/HomeHeader'
import VideoBanner from './components/VideoBanner'
import Config from '../../appConfig/Config'
import FastImage from 'react-native-fast-image'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AppContext from '../../appConfig/constant'
import API from '../../appConfig/api'
import Apiconstants from '../../appConfig/APIConstants'
import Snackbar from "react-native-snackbar";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native';







export default function index(props) {
    const { userProfile, authToken } = useContext(AppContext)
    const [showMenu, setMenu] = useState(false)
    const [calling, setCalling] = useState(false)
    const [testId, setId] = useState(null)

    const buttons = [
        {
            title: 'Easy To Use',
            image: require('../../../assets/images/snap.png')
        },
        {
            title: 'Fast Test Results',
            image: require('../../../assets/images/stopwatch.png')
        },
        {
            title: 'Test yourself At Home',
            image: require('../../../assets/images/test-tube.png')
        }
    ]







    const onLogout = async () => {
        try {
            await AsyncStorage.removeItem('@userToken')
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'onboard' },

                    ],
                })
            );
        } catch (e) {
            // remove error
        }


    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <HomeHeader
                    onPressBurger={() => {
                        setMenu(true)
                    }}
                />
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 100 }}>
                        <VideoBanner />
                        <Text style={{ fontFamily: Fonts.medium, color: Config.dark, fontSize: 18 }}>Introducing</Text>
                        <Text style={{ fontFamily: Fonts.regular, fontSize: 18, width: 200 }}>COVID-19 Rapid Antigen Self Test Kit</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            {buttons.map((item) => (
                                <TouchableOpacity style={styles.buttonContainer}>
                                    <View style={{ height: 120, backgroundColor: 'white', elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <FastImage
                                            style={{ height: 50, width: 50 }}
                                            source={item.image}
                                        />
                                    </View>
                                    <Text style={{ textAlign: 'center', width: '90%', marginTop: 10, fontFamily: Fonts.regular }}>{item.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={{ fontFamily: Fonts.medium, color: Config.dark, fontSize: 18 }}>Process of Test</Text>

                        <Text style={styles.headText}>Step-1</Text>
                        <Text style={styles.contentText}>The Covidtest COVID-19 Antigen Test is a self-te kit to detect the protein antigen from SARS-CoV -2.</Text>

                        <Text style={[styles.headText, { marginTop: 10 }]}>Step-2</Text>
                        <Text style={styles.contentText}>The Covidtest COVID-19 Antigen Test is a self-te kit to detect the protein antigen from SARS-CoV -2.</Text>

                        <Text style={[styles.headText, { marginTop: 10 }]}>Step-3</Text>
                        <Text style={styles.contentText}>The Covidtest COVID-19 Antigen Test is a self-te kit to detect the protein antigen from SARS-CoV -2.</Text>

                    </ScrollView>
                </View>
            </View>
            <Button
                Title='Take Test'
                disabled={calling}
                onPress={() => {
                    props.navigation.navigate('users')
                }}
                style={{
                    marginHorizontal: 3,
                    position: "absolute",
                    left: 10,
                    right: 10,
                    bottom: 15,
                }
                } />

            <Modal
                visible={showMenu}
                animationType='slide'

                onRequestClose={() => setMenu(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'white' }} >
                    <TouchableOpacity
                        onPress={() => setMenu(false)}
                        style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}
                    ><AntDesign name='close' size={25} color='gray' />
                    </TouchableOpacity>
                    {
                        [
                            { name: 'Profile', screen: 'profile' },
                            { name: 'User History', screen: 'userhistory' },
                            { name: 'Add New Member', screen: 'adhar' },
                            // { name: 'Test Results', screen: 'testdetails' },
                            { name: 'Check Results', screen: 'adharresult' },
                            { name: 'Logout', }
                        ].map((item) => (
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.screen) {
                                        var from = 'menu'
                                        props.navigation.navigate(item.screen, { from })
                                        setMenu(false)

                                    }
                                    else {
                                        Alert.alert(
                                            "Please Confirm",
                                            "Are you sure want to Logout",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                { text: "OK", onPress: () => onLogout() }
                                            ]
                                        );
                                    }
                                }}
                                style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: Fonts.regular, color: 'gray' }}>{item.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headText: {
        fontSize: 18,
        color: '#1A1A1A',
        fontFamily: Fonts.medium
    },
    contentText: {
        fontSize: 13,
        color: '#1A1A1A',
        fontFamily: Fonts.regular
    },
    buttonContainer: {
        height: 200,
        width: Config.DevWidth / 3 - 20,

    }
})
