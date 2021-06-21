import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import FastImage from 'react-native-fast-image'
import AntDesign from 'react-native-vector-icons/AntDesign'
import API from '../appConfig/api'
import Apiconstants from '../appConfig/APIConstants';
import ImgToBase64 from 'react-native-image-base64';
import { request, PERMISSIONS } from 'react-native-permissions';
import ScannerX from './DocScannerWithCrop/ScannerWithCrop';
import Fonts from '../appConfig/Fonts';
import AppContext from '../appConfig/constant'
import Snackbar from 'react-native-snackbar'







function DocumentScanner(props) {
    const { authToken } = useContext(AppContext)
    const { Data } = props
    const [doc, setDoc] = useState(null)
    const [currentRender, setRender] = useState('icon')
    const [calling, setCalling] = useState(false)
    const [failed, setFailed] = useState(false)



    const getAdharDetails = (imageblob, initialImage) => {
        setCalling(true)
        console.warn('CALLING')
        var data = new FormData();
        data.append('image', imageblob);
        data.append('authcode', authToken)
        if (props.TestResult) {
            data.append('test_id', props.TestID)
        }

        let url = props.TestResult ? Apiconstants.GET_TEST_RESULT : Apiconstants.GET_ADHAR_DETAILS

        API(url, data, "POST", null)
            .then((res) => {
                setCalling(false)

                console.warn(res.data)

                if (!props.TestResult && res.data.code == 200) {
                    var RESPONSE = res.data.data
                    props.onSuccessAdharRequest(RESPONSE)
                }
                else if (props.TestResult && res.data.code == 200) {
                    var RESPONSE = res.data
                    props.onSuccessAdharRequest(RESPONSE, initialImage)
                }
                else {
                    console.log(res.data)
                }

                if (res.data.code == 200 || res.data.data) {
                    var RESPONSE = props.TestResult ? res.data : res.data.data
                    if (props.TestResult) {
                        props.onSuccessAdharRequest(RESPONSE, initialImage)
                    }
                    else {
                        props.onSuccessAdharRequest(RESPONSE)
                    }


                }
                else {
                    Snackbar.show({
                        duration: Snackbar.LENGTH_LONG,
                        text: "Details not Found",
                        backgroundColor: "red",
                    });
                    console.log(res.data)
                    setFailed(true)
                }
            })
            .catch((error) => {
                console.warn(error);
                setCalling(false)
                Snackbar.show({
                    duration: Snackbar.LENGTH_LONG,
                    text: "Something went Wrong",
                    backgroundColor: "red",
                });

                // alert('Something went wrong')
                // setFailed(true)




            });
    }

    const makeBase64 = (imagePath) => {
        ImgToBase64.getBase64String(imagePath)
            .then(base64String => {
                console.warn(base64String)
                getAdharDetails(base64String, imagePath)

            })
            .catch(err => console.warn(err));

    }

    const onPictureProcessed = ({ croppedImage, initialImage }) => {

        console.warn(croppedImage, initialImage)
        makeBase64(initialImage)
        setDoc(initialImage)

        setRender('icon')
    };




    const renderView = () => {
        if (currentRender == 'icon') {
            return (
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, marginBottom: 20, fontFamily: Fonts.regular }}>
                        {props.TestResult ? 'Scan your Test Result' : 'Scan your Adhar Card'}
                    </Text>
                    <View style={styles.conatiner}>
                        {doc ?
                            <FastImage
                                style={{
                                    height: 100,
                                    width: 100,
                                }}
                                source={{ uri: doc }}

                            /> :
                            <TouchableOpacity
                                onPress={() => {
                                    request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
                                        if (result == 'granted') {
                                            console.warn(result)
                                            setRender('scanner')
                                        }

                                    });
                                }}
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <AntDesign name='scan1' size={50} color='gray' />
                            </TouchableOpacity>}
                    </View>
                    {doc && <Text
                        onPress={() => {
                            setRender('scanner')
                        }}
                        style={{ fontSize: 18, fontFamily: Fonts.regular, marginTop: 20 }}>Change</Text>}
                </View>
            )
        }
        else if (currentRender == 'scanner') {
            return (
                <ScannerX
                    onPictureProcessed={onPictureProcessed}
                    hideSkip={true}
                />
            )
        }
    }
    return (
        <View style={{ flex: 1 }}>
            {renderView()}
            <Modal
                visible={calling}
                transparent
                animationType='fade'
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontFamily: Fonts.regular, fontSize: 18, marginBottom: -3 }}>Please wait</Text>
                        <ActivityIndicator size={20} color='white' />
                    </View>
                </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        height: 100,
        width: 100,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'gray',
        overflow: 'hidden'
    }
})

export default DocumentScanner
