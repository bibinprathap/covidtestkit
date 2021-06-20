import React, { useState, useContext, useEffect } from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import Snackbar from "react-native-snackbar";
import OtpTimer from './components/OtpTimer'
import OtpInput from './components/OtpInput'
import API from '../../appConfig/api'
import Apiconstants from '../../appConfig/APIConstants'
import { CommonActions } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Button from "../../components/Button";
import Header from "../../components/Header";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function OTPScreen({ navigation, route }) {
    const { number } = route.params
    const [Otpvalue, setOtpvalue] = useState('');
    const [veriying, setVerifying] = useState(false)

    const callback = async (value) => {
        console.log('-----value--------' + value);
        // setOtpvalue(route.params.otp);

    };
    // console.log('-----otpssss--------' + Otpvalue);

    const VerifyOTP = (OTP) => {
        console.warn('OTP ISSSSSS', OTP)
        setVerifying(true)
        setOtpvalue(OTP)
        var data = new FormData();
        data.append('phone_number', number);

        API(Apiconstants.VERIFY_OTP + OTP, null, "POST", null)
            .then((res) => {

                console.warn(res.data)
                if (res.data.Status == 'Success') {
                    Snackbar.show({
                        duration: Snackbar.LENGTH_LONG,
                        text: "OTP Matched",
                        backgroundColor: "#FCB913",
                    });
                    if (res.data.registered == true) {
                        navigation.navigate('home')
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    { name: 'adhar' },

                                ],
                            })
                        );
                    }
                    else {
                        navigation.navigate('adhar')
                    }
                }
                else {
                    Snackbar.show({
                        duration: Snackbar.LENGTH_LONG,
                        text: "OTP Mismattch",
                        backgroundColor: "red",
                    });
                    setVerifying(false)
                    navigation.goBack()

                }

            })
            .catch((error) => {
                console.warn(error);
                setVerifying(false)
                Snackbar.show({
                    duration: Snackbar.LENGTH_LONG,
                    text: "Something went Wrong",
                    backgroundColor: "red",
                });



            });

    }

    const ResendOTP = () => {
        var data = new FormData();
        data.append('phone_number', number);

        API(Apiconstants.SENT_OTP + number, data, "POST", null)
            .then((res) => {

                console.warn(res.data)
                if (res.data.code == 200) {
                    Snackbar.show({
                        duration: Snackbar.LENGTH_LONG,
                        text: "OTP Sent",
                        backgroundColor: "#FCB913",
                    });
                }
                else {
                    alert('Details not found')
                }
            })
            .catch((error) => {
                console.warn(error);
                alert('Something went wrong')



            });
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                onPressBack={() => navigation.goBack()}
            />
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingTop: 50 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <View>
                            <Text style={styles.text1}>Enter The 4-Digit OTP sent To</Text>
                        </View>
                        <View>
                            <Text style={styles.text1}>+91 {number}</Text>
                        </View>
                    </View>

                    <View style={{ marginVertical: 30 }}>
                        <OtpInput
                            onCodeFilled={(code) => {
                                VerifyOTP(code)
                                console.warn(code)
                                // navigation.navigate('adhar')
                            }}
                        />
                    </View>

                    <OtpTimer
                        parentCallback={callback}
                        OnRequestResend={() => {
                            ResendOTP()
                        }}
                    />

                    <View style={{ paddingLeft: 20, height: 50 }}>
                        <TouchableOpacity>
                            <Text style={{ color: '#909090', paddingLeft: 5, textDecorationLine: "underline", marginTop: 10 }}>Get OTP On Call</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>








            <Button
                calling={veriying}
                Title='Continue'
                style={{ margin: 15 }}
                onPress={() => {

                    // navigation.navigate('adhar')
                    if (Otpvalue.length == 4) {
                        VerifyOTP(Otpvalue)
                    }
                    else {
                        Snackbar.show({
                            duration: Snackbar.LENGTH_LONG,
                            text: "Enter 4 Digit OTP",
                            backgroundColor: "red",
                        });
                    }
                }}
            />
        </View>

    )
}


const styles = StyleSheet.create({
    iconStyle: {
        height: '10%',
        marginTop: 20,
        marginLeft: 15
    },

    text1: {
        fontSize: 22,
        paddingLeft: 20,
        color: '#1A1A1A'
    },

    text2: {
        fontSize: 14,
        color: '#767676'
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
        bottom: 15,
        borderRadius: 5,
    },

    buttonContent: {
        fontSize: 18,
        color: '#FFF'
    },

})

export default OTPScreen;