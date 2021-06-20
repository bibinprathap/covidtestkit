import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Theme_Light_Orange, Theme_Orange } from '../../../appConfig/Colors';
let resendOtpTimerInterval;

export default function OtpTimer(props) {
    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
        10,
    );
    useEffect(() => {
        startResendOtpTimer();

        return () => {
            if (resendOtpTimerInterval) {
                clearInterval(resendOtpTimerInterval);
            }
        };
    }, [resendButtonDisabledTime]);
    const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
            if (resendButtonDisabledTime <= 0) {
                clearInterval(resendOtpTimerInterval);
            } else {
                setResendButtonDisabledTime(resendButtonDisabledTime - 1);
            }
        }, 1000);
    };
    function secondsToHms(d) {
        d = Number(d);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var mDisplay = m >= 1 ? m + ' : ' + s : '0 : ' + s;
        return mDisplay;
    }
    if (resendButtonDisabledTime > 0) {
        return (
            <View style={{ marginTop: 10, flexDirection: 'row', paddingLeft: 24 }}>
                <Text style={{ fontSize: 14, color: '#767676' }}>Didn't receive the code? </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 14
                }}>Resend in {resendButtonDisabledTime} seconds
                </Text>
            </View>
        )
    } else {
        return (
            <View style={{ marginTop: 10, flexDirection: 'row', paddingLeft: 24 }}>
                <Text style={{ fontSize: 14, color: '#767676' }}>Didn't receive the code? </Text>
                <Text onPress={() => {
                    setResendButtonDisabledTime(30)
                    props.OnRequestResend()
                }} style={{
                    color: Theme_Orange,
                    fontSize: 16,
                    textDecorationLine: 'underline'
                }}>Resent
                </Text>
            </View>
        )
    }
}