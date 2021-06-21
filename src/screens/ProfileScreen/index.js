import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import Config from '../../appConfig/Config'
import Fonts from '../../appConfig/Fonts'
import Header from '../../components/Header'
import TestCard from '../../components/TestCard'
import Feather from 'react-native-vector-icons/Feather'
import AppContext from '../../appConfig/constant'
import API from '../../appConfig/api'
import Apiconstants from '../../appConfig/APIConstants'
import { request, PERMISSIONS } from 'react-native-permissions';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import FastImage from 'react-native-fast-image'




export default function index(props) {
    const { userProfile, getUserDetails, authToken } = useContext(AppContext)
    const [testHistory, setTestHistory] = useState([])
    const [updatingDP, setUpdatingDP] = useState(false)

    useEffect(() => {
        getTestHistory()
        getUserDetails(authToken)
    }, [])

    const getTestHistory = () => {
        console.warn(authToken)
        var data = new FormData()
        data.append('authcode', authToken);
        API(Apiconstants.TEST_HISTORY, data, "POST", null)
            .then((res) => {
                // setCalling(false)
                // console.warn('TEST HISTORY', res.data)
                setTestHistory(res.data)
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    const uploadProfile = (imageblob) => {
        setUpdatingDP(true)
        var data = new FormData();
        data.append('image', imageblob);
        data.append('authcode', authToken)
        API(Apiconstants.UPLOAD_PROFILE_IMAGE, data, "POST", null)
            .then((res) => {
                setUpdatingDP(false)
                // console.warn('USER PROFILE UPDATE', res.data)
                if (res.data.code == 200) {
                    getUserDetails(authToken)
                }
            })
            .catch((error) => {
                console.warn('UPDATE PIC', error);
                setUpdatingDP(false)

            });
    }


    const makeBase64 = (imagePath) => {
        ImgToBase64.getBase64String(imagePath)
            .then(base64String => {
                console.warn(base64String)
                // getAdharDetails(base64String)

            })
            .catch(err => console.warn(err));

    }
    const handleImageLibray = async () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 600,
                maxHeight: 600,
                quality: 0.5

            },
            async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    toast.show(response.error, { type: 'danger' });
                } else {
                    try {
                        console.warn(response.uri)
                        ImgToBase64.getBase64String(response.uri)
                            .then(base64String => {
                                console.warn(base64String)
                                uploadProfile(base64String)

                            })
                            .catch(err => console.warn(err));

                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                Title='Profile'
                onPressBack={() => props.navigation.goBack()}
            />
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 30 }}>

                    <View style={{ height: 150, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (Platform.OS == 'android') {
                                    request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
                                        if (result == 'granted') {
                                            console.warn(result)
                                            handleImageLibray()
                                        }
                                    });
                                }
                                else {
                                    handleImageLibray()
                                }
                            }}
                            style={{ height: 60, width: 60, borderRadius: 30, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'gray' }}>
                            {/* {updatingDP && <ActivityIndicator size={20} color={Config.dark} />} */}
                            {userProfile.profile_image ?
                                <FastImage
                                    style={{ height: 60, width: 60, borderRadius: 30 }}
                                    source={{ uri: `data:image/jpeg;base64,${userProfile.profile_image}` }}
                                />
                                :
                                <Feather name='user' size={30} color='gray' />
                            }

                        </TouchableOpacity>
                        <Text style={{ fontFamily: Fonts.medium, fontSize: 20, marginTop: 20, width: '70%', textAlign: 'center' }}>{userProfile.name}</Text>
                    </View>
                    <Text style={{ fontFamily: Fonts.medium, fontSize: 18, color: Config.dark }}>Aadhar Details</Text>
                    <View style={{ marginLeft: 5 }}>
                        <View>
                            <Text style={styles.headFonts}>Aadhar Number</Text>
                            <Text style={{ fontFamily: Fonts.medium, }}>{userProfile.uid}</Text>
                        </View>
                        <View>
                            <Text style={styles.headFonts}>Age</Text>
                            <Text style={{ fontFamily: Fonts.medium }}>{userProfile.age}</Text>
                        </View>
                        <View>
                            <Text style={styles.headFonts}>Date of Birth</Text>
                            <Text style={{ fontFamily: Fonts.medium }}>{userProfile.birth_date}</Text>
                        </View>

                    </View>

                    <Text style={{ fontFamily: Fonts.medium, fontSize: 18, color: Config.dark, marginTop: 20 }}>Test History</Text>

                    <FlatList
                        data={testHistory}
                        renderItem={(({ item }) =>
                            <TestCard Data={item} />
                        )}
                    />



                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headFonts: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: '#232323'
    }
})
