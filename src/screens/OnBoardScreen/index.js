import React, { Component } from 'react';

import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Button
} from 'react-native';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import appImages from '../../appConfig/Config'

import Swiper from 'react-native-swiper/src';
import Fonts from '../../appConfig/Fonts';

const OnBoardingScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.slider}>
                <Text style={styles.headerText}>CovidTest</Text>
                <Swiper style={styles.wrapper} paginationStyle={{ bottom: 35, left: -WIDTH / 1.5 }} dotStyle={{ marginRight: 10, marginLeft: 10 }} activedotStyle={{ marginRight: 10, marginLeft: 10 }} showsButtons={true} showsPagination={true} activeDotColor='#FFF' dotColor='#909090' showsButtons={false}>
                    <View style={styles.slide}>
                        <Image
                            source={appImages.Slider1}
                            style={styles.images}
                        />
                        <Text style={styles.imageText}>India’s first COVID-19 test kit for self-use.{"\n"}Get your test results within 20 min</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image
                            source={appImages.Slider2}
                            style={styles.images}
                        />
                        <Text style={styles.imageText}>India’s first COVID-19 test kit for self-use.{"\n"}Get your test results within 20 min</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image
                            source={appImages.Slider3}
                            style={styles.images}
                        />
                        <Text style={styles.imageText}>India’s first COVID-19 test kit for self-use.{"\n"}Get your test results within 20 min</Text>
                    </View>
                </Swiper>
            </View>
            <View style={styles.textContent}>
                <View style={styles.textArea}>
                    <Text style={styles.text}>Let's get started! Enter Your Mobile Number</Text>
                </View>
                <TouchableOpacity style={styles.inputBox} onPress={() => {
                    // console.log("------------------")
                    navigation.navigate('login')
                }}>
                    <Text style={styles.phone}> +91</Text>
                    <View style={{ borderLeftWidth: 1, borderLeftColor: '#B4B4BE', marginVertical: 10 }}></View>
                    <TextInput
                        placeholder="Mobile Number"
                        placeholderTextColor="#B4B4BE"
                        style={styles.Input}
                        editable={false}

                    />
                </TouchableOpacity>
                <View style={{ alignItems: 'flex-start', paddingLeft: 5 }}>
                    <Text style={styles.textTrouble}>
                        Trouble signing in ?
                    </Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    wrapper: {
    },

    slider: {
        backgroundColor: '#2A2A2A',
        height: '70%'
    },


    slide: {
        flex: 1,
        backgroundColor: '#2A2A2A',
        marginTop: 40
    },
    text: {
        color: '#1A1A1A',
        fontSize: 15,
        margin: 10,
        fontFamily: Fonts.regular
    },

    images: {
        width: '65%',
        height: '65%'
    },

    textTrouble: {
        color: '#1A1A1A',
        fontSize: 11,
        margin: 15,
        fontFamily: Fonts.light
    },

    textContent: {
        top: "70%",
        position: 'absolute'
    },

    headerText: {
        fontFamily: Fonts.bold,
        fontSize: 25,
        margin: 5,
        paddingLeft: 10,
        color: '#FCB913'
    },

    imageText: {
        color: '#FFFFFF',
        fontSize: 13,
        margin: 20,
        fontFamily: Fonts.regular
    },

    Input: {
        marginLeft: 10
    },
    phone: {
        color: '#1A1A1A',
        fontSize: 15,
        padding: 17,
        fontFamily: Fonts.regular
    },
    inputBox: {
        margin: 10,
        marginLeft: 30,
        width: WIDTH - 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#B4B4BE',
        flexDirection: 'row'
    },

    button: {
        width: 367,
        marginLeft: 20,
        marginTop: 10
    },
    textArea: {
        paddingLeft: 10
    }
})
export default OnBoardingScreen;