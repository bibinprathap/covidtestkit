import React from 'react'
import {
    StyleSheet, Text, View, TouchableOpacity,
    Linking
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Header from './Header';

function QrScanner(props) {

    const onSuccess = (e) => {
        // console.warn(e.data)
        props.onReadSuccess(e.data)
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
            <Header
                onPressBack={props.onClose}
            />
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                containerStyle={{ paddingTop: 50, }}

            />

            <View style={{ height: 130, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Scan the QR code on the Test kit</Text>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
})

export default QrScanner