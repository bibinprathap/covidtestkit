import React, { useState, useContext, useEffect } from "react";

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Snackbar from "react-native-snackbar";
import API from "../../appConfig/api";
import Apiconstants from '../../appConfig/APIConstants'
import Button from "../../components/Button";


import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../../components/Header";
import Fonts from "../../appConfig/Fonts";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function LoginScreen({ navigation }) {
    const [number, setNumber] = useState("");
    const [calling, setCalling] = useState(false)




    const sentOTP = () => {

        const value = number;
        if (value.length === 10) {

            setCalling(true)
            var data = new FormData();
            data.append('phone_number', number);

            API(Apiconstants.SENT_OTP + value, data, "POST", null)
                .then((res) => {
                    setCalling(false)

                    console.warn(res.data)
                    if (res.data.code == 200) {
                        Snackbar.show({
                            duration: Snackbar.LENGTH_LONG,
                            text: "OTP Sent",
                            backgroundColor: "#FCB913",
                        });
                        navigation.navigate('otp', { number })
                    }
                    else {
                        alert('Details not found')
                    }
                })
                .catch((error) => {
                    console.warn(error);
                    setCalling(false)
                    alert('Something went wrong')



                });




        } else {
            Snackbar.show({
                text: "Enter 10 Digit Mobile Number!",
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: "#fa6464",
            });
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header onPressBack={() => navigation.goBack()} />

            <View style={styles.textStyle}>
                <Text style={styles.textContent}>Enter Your Mobile Number</Text>
            </View>
            <View style={styles.inputBox} >
                <Text style={styles.phone}> +91</Text>
                <View style={{ borderLeftWidth: 1, borderLeftColor: '#B4B4BE', marginVertical: 10 }}></View>
                <TextInput
                    placeholder="Mobile Number"
                    placeholderTextColor="#B4B4BE"
                    style={styles.InputMobileNumber}
                    editable={true}
                    maxLength={10}
                    keyboardType="number-pad"
                    onChangeText={(value) => {
                        setNumber(value);
                    }}
                />
            </View>
            <View style={styles.textStyle} >
                <Text style={styles.termsText}>
                    By continuing, you agree to our
                </Text>
                <TouchableOpacity>
                    <Text style={styles.termsText1}>Terms & Conditions</Text>
                </TouchableOpacity>
            </View>
            <Button
                Title='Continue'
                style={{ position: 'absolute', bottom: 15, left: 15, right: 15 }}
                onPress={() => {
                    sentOTP()
                    // navigation.navigate('otp', { number })
                }}
                calling={calling}


            />
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        margin: 5,
        marginHorizontal: 20,
    },

    textContent: {
        fontSize: 20,
        color: '#1A1A1A',
        fontFamily: Fonts.regular
    },
    InputMobileNumber: {
        color: '#000',
        marginLeft: 10

    },
    Input: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 367,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#B4B4BE',
        margin: 10,
        color: '#000'
    },

    inputBox: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },

    button: {
        elevation: 5,
        backgroundColor: '#FCB913',
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginHorizontal: 3,
        position: "absolute",
        left: 10,
        right: 10,
        bottom: 5,
        borderRadius: 5,
    },

    buttonContent: {
        fontSize: 18,
        color: '#FFF'
    },

    termsText: {
        fontSize: 14,
        color: '#767676',
        fontFamily: Fonts.light
    },
    termsText1: {
        fontSize: 14,
        color: '#767676',
        textDecorationLine: "underline"
    },

    iconStyle: {
        height: '10%',
        marginTop: 20,
        marginLeft: 15
    },
    Input: {
    },
    phone: {
        color: '#1A1A1A',
        fontSize: 15,
        padding: 17
    },
    inputBox: {
        margin: 10,
        marginVertical: 20,
        marginLeft: 20,
        width: WIDTH - 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#2E2E2E',
        flexDirection: 'row'
    },

})
export default LoginScreen;