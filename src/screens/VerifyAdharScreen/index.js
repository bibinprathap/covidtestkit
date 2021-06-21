import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Dimensions } from 'react-native'
import Header from '../../components/Header'
import Snackbar from "react-native-snackbar";
import Button from '../../components/Button';

import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';
import Fonts from '../../appConfig/Fonts';
import Config from '../../appConfig/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../appConfig/api'
import Apiconstants from '../../appConfig/APIConstants'
import { CommonActions } from '@react-navigation/native';
import AppContext from '../../appConfig/constant';


const width = Dimensions.get('window').width;

export default function index(props) {
    const { setUserDetails, authToken } = useContext(AppContext)
    const { adharDetails, addSub } = props.route.params



    const [adharNumber, setAdharNumber] = useState(adharDetails.Uid)
    const [name, setName] = useState(adharDetails.Name)
    const [dob, setDob] = useState(adharDetails.Birth_date)
    const [gender, setGender] = useState(adharDetails.Gender)
    const [calling, setCalling] = useState(false)


    const saveUserDetails = () => {
        var adharnumber_exspaces = adharNumber.replace(/ /g, '')
        setCalling(true)
        var data = new FormData();
        data.append('authcode', authToken);
        data.append('uid', adharnumber_exspaces);
        data.append('birth_date', dob);
        data.append('name', name);
        data.append('gender', gender);
        console.warn(data)

        let call = addSub ? Apiconstants.ADD_SUB_USER : Apiconstants.REGISTER_USER

        API(call, data, "POST", null)
            .then((res) => {
                setCalling(false)
                console.warn(res.data)
                if (res.data.code == 200) {
                    Snackbar.show({
                        duration: Snackbar.LENGTH_LONG,
                        text: "Successfully Saved",
                        backgroundColor: "green",
                    });
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'home' },

                            ],
                        })
                    );
                    // storeData()
                }
                else {
                    Snackbar.show({
                        duration: Snackbar.LENGTH_LONG,
                        text: res.data.status,
                        backgroundColor: "red",
                    });

                }
            })
            .catch((error) => {
                console.warn(error);
                setCalling(false)
                Snackbar.show({
                    duration: Snackbar.LENGTH_LONG,
                    text: "Failed to Saved",
                    backgroundColor: "red",
                });


            });


    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                onPressBack={() => props.navigation.goBack()}
            />
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ justifyContent: 'center' }}>
                        <View>
                            <Text style={styles.text1}>Verify Aadhaar Details of card,</Text>
                        </View>
                        <View>

                            <Text style={styles.text1}>{adharNumber}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', marginTop: 20 }}>
                        <View>
                            <Text style={styles.text2}>Adhaar Number</Text>
                        </View>
                        <View  >
                            <TextInput
                                style={styles.inputBox}
                                placeholder="Enter the Adhaar Number "
                                onChangeText={text => setAdharNumber(text)}
                                value={adharNumber}
                                keyboardType='numeric'
                            />

                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', marginTop: 20 }}>
                        <View>
                            <Text style={styles.text2}>Name</Text>
                        </View>
                        <View  >
                            <TextInput
                                style={styles.inputBox}
                                placeholder="Enter the Name"
                                onChangeText={text => setName(text)}
                                value={name}
                            />

                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', marginTop: 20 }}>
                        <View>
                            <Text style={styles.text2}>Date of Birth</Text>
                        </View>
                        <View  >
                            <DatePicker

                                style={{ width: width }}
                                date={dob}
                                mode="date"
                                placeholder="select date"
                                format="DD/MM/YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{

                                    dateInput: {
                                        marginLeft: 10,
                                        borderRadius: 4,

                                        borderColor: '#DFE6ED',
                                    },
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={fromDate => setDob(fromDate)}
                            />


                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', marginTop: 20 }}>
                        <View>
                            <Text style={styles.text2}>Gender</Text>
                        </View>
                        <View  >

                            <Picker
                                key={`Gender`}
                                style={[styles.picker, { marginHorizontal: 20, width: width - 20 }]}
                                itemStyle={styles.pickerItem}
                                selectedValue={gender}
                                onValueChange={value => setGender(value)}
                            >
                                <Picker.Item key={"Male"} label={'Male'} value={'Male'} />
                                <Picker.Item key={"Female"} value={'Female'} label={'Female'} />
                            </Picker>


                        </View>
                    </View>
                </ScrollView>

                <Button
                    Title='Save Details'
                    // disabled={calling}
                    style={{
                        marginHorizontal: 3,
                        position: "absolute",
                        left: 10,
                        right: 10,
                        bottom: 15,
                    }
                    }
                    onPress={() => {



                        if (!adharNumber || adharNumber == '') {
                            alert('UID not found')
                        }
                        else if (!name || name == '') {
                            alert('Name not found')
                        }
                        else if (!dob || dob == '') {
                            alert('Date of Birth not found')
                        }
                        else if (!gender || gender == '') {
                            alert('gender not found')
                        }
                        else {
                            saveUserDetails()
                        }
                    }} />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text1: {
        fontSize: 22,
        paddingLeft: 20,
        color: '#1A1A1A'
    },

    text2: {
        fontSize: 15,
        paddingLeft: 20,
        color: '#141414'
    },

    inputBox: {
        height: 50,
        borderWidth: 0.7,
        margin: 20,
        borderColor: '#2E2E2E',
        borderRadius: 10,
        color: '#000',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    InputMobileNumber: {
        color: '#000',
        marginLeft: 10

    },
    buttonContent: {

    },

    iconStyle: {
        height: 50,
        marginTop: 20,
        marginLeft: 15
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
