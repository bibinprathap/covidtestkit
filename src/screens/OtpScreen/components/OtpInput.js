import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'

function OtpInput(props) {
    return (
        <View style={{ height: 70, paddingHorizontal: 25 }}>
            <OTPInputView
                style={{ width: '100%', height: 60, }}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code => {
                    console.warn(`Code is ${code}, you are good to go!`)
                    props.onCodeFilled(code)
                    // VerifyOtp(code)
                })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    underlineStyleBase: {
        width: 50,
        height: 50,
        color: 'darkorange',
        fontSize: 18,
        // fontFamily: font.medium,
        backgroundColor: 'white',


    },

    underlineStyleHighLighted: {
        width: 50,
        height: 50,
        borderWidth: 0.5,
        borderColor: '#D7D7D7',
        alignItems: 'center',



    },
})

export default OtpInput
