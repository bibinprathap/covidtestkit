import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Modal, FlatList } from 'react-native'
import AppContext from '../../appConfig/constant'
import Header from '../../components/Header'
import QrScanner from '../../components/QrScanner'
import UserCard from './components/UserCard'
import API from '../../appConfig/api'
import Apiconstants from '../../appConfig/APIConstants'
import Snackbar from 'react-native-snackbar'
import moment from 'moment'


export default function index(props) {
    const { userProfile, authToken } = useContext(AppContext)
    const [showmodal, setModal] = useState(false)
    const [subUsers, setSubUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        getSubUsers()
    }, [])


    const getSubUsers = () => {
        var data = new FormData();
        data.append('authcode', authToken)
        API(Apiconstants.GET_SUBUSERS, data, "POST", null)
            .then((res) => {
                if (res.data.code == 200) {
                    setSubUsers(res.data.data)
                    console.warn
                }


            })
            .catch((error) => {
                console.warn(error);

            });
    }



    const registerTestKit = (code) => {
        var data = new FormData();
        data.append('authcode', authToken)
        data.append('kit_id', code);
        data.append('subuser_id', selectedUser.subuser_id);
        console.warn(data)



        API(Apiconstants.REGISTER_TEST_KIT, data, "POST", null)
            .then((res) => {
                console.warn(res.data)
                if (res.data.code == 200) {
                    Snackbar.show({
                        duration: Snackbar.LENGTH_LONG,
                        text: "Test kit Registered Successfully",
                        backgroundColor: "green",
                    });
                    let testId = res.data.test_id
                    props.navigation.navigate('test', { code, testId })

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

                Snackbar.show({
                    duration: Snackbar.LENGTH_LONG,
                    text: "Test kit Registration Failed",
                    backgroundColor: "red",
                });


            });
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                Title='Members'
                onPressBack={() => props.navigation.goBack()}
            />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={subUsers}
                    renderItem={(({ item }) =>
                        <UserCard
                            Data={item}
                            onPress={() => {
                                setSelectedUser(item)
                                setModal(true)
                            }}
                        />
                    )}
                // ListHeaderComponent={
                //     userProfile ?
                //         <UserCard
                //             Data={userProfile}

                //             onPress={() => {
                //                 setSelectedUser(userProfile)
                //                 setModal(true)
                //             }}

                //         /> :
                //         false
                // }
                />
            </View>
            <Modal
                visible={showmodal}
                animationType='fade'
                onRequestClose={() => setModal(false)}
            >
                <QrScanner
                    onReadSuccess={(code) => {
                        console.warn('CODE IS', code)
                        registerTestKit(code)
                        // props.navigation.navigate('test', { code })

                        setModal(false)
                    }}
                    onClose={() => setModal(false)}
                />

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({})
