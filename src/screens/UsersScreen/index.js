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
                            EnableContinue
                            onPress={() => {
                                props.navigation.navigate('patientdetails', { item })
                            }}
                        />
                    )}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({})
