import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity, TextInput, Platform, ActivityIndicator } from 'react-native'
import Config from '../../appConfig/Config'
import Fonts from '../../appConfig/Fonts'
import Header from '../../components/Header'
import TestCard from '../../components/TestCard'
import Feather from 'react-native-vector-icons/Feather'
import Chart from '../../components/Chart'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import API from '../../appConfig/api'
import Apiconstants from '../../appConfig/APIConstants'
import AppContext from '../../appConfig/constant'
export default function index(props) {
    const { authToken } = useContext(AppContext)
    const [showSort, setShowSort] = useState(false)
    const [results, setResults] = useState([])
    const [adharNumber, setAdharNumber] = useState('')
    const [checking, setChecking] = useState(false)


    const getTestHistory = () => {
        setChecking(true)
        console.warn(authToken)
        var data = new FormData()
        data.append('authcode', authToken);
        data.append('uid', adharNumber);
        API(Apiconstants.GET_ADHAR_BASED_RESULTS, data, "POST", null)
            .then((res) => {
                setChecking(false)

                if (res.data.code) {
                    setResults([])
                }
                else {
                    setResults(res.data)
                }

            })
            .catch((error) => {
                console.warn(error);
                setChecking(false)

            });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                Title='Aadhar Result'
                onPressBack={() => props.navigation.goBack()}
            />
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 30 }}>

                    <TextInput
                        style={{ height: 50, width: '100%', borderWidth: 0.5, borderRadius: 5, paddingHorizontal: 10, borderColor: 'gray' }}
                        placeholder='Enter Aadhar Number...'
                        keyboardType='numeric'
                        onChangeText={text => setAdharNumber(text)}
                        value={adharNumber}
                    />

                    <TouchableOpacity
                        disabled={checking}
                        onPress={() => {
                            getTestHistory()
                        }}
                        style={{ height: 40, width: 120, backgroundColor: 'black', marginVertical: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 30, flexDirection: 'row' }}>
                        <Text style={{ fontFamily: Fonts.bold, color: 'white', marginBottom: -5, fontSize: 12 }}>Check Result</Text>
                        {checking && <ActivityIndicator size={20} color='white' />}
                    </TouchableOpacity>

                    {results.length > 0 && <Text style={{ fontFamily: Fonts.medium, fontSize: 18, color: Config.dark }}>Result for Aadhar number</Text>}
                    <FlatList
                        data={results}
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
