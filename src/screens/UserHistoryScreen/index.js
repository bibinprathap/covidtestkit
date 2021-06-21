import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
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
import FastImage from 'react-native-fast-image'
import AppContext from '../../appConfig/constant'

export default function index(props) {
    const { authToken } = useContext(AppContext)
    const [showSort, setShowSort] = useState(false)
    const [userTestHistory, setTestHistory] = useState([])
    const [covidGraph, setCovidGraph] = useState(null)




    useEffect(() => {
        getTestHistory()
        getTestGraph()
    }, [])

    const getTestHistory = () => {
        var data = new FormData()
        data.append('authcode', authToken)
        API(Apiconstants.TEST_HISTORY, data, "POST", null)
            .then((res) => {
                // setCalling(false)
                console.warn('TEST HISTORY', res.data)
                setTestHistory(res.data)
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    const getTestGraph = () => {
        var data = new FormData()
        data.append('authcode', authToken)
        API(Apiconstants.COVID_TEST_GRAPG, data, "POST", null)
            .then((res) => {
                // setCalling(false)
                console.warn('TEST HISTORY', res.data)
                setCovidGraph(res.data.image)
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                Title='User History'
                onPressBack={() => props.navigation.goBack()}
            />
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 30 }}>

                    <Text style={{ fontFamily: Fonts.medium, fontSize: 18, color: Config.dark, marginTop: 20 }}>Total Number of Test</Text>
                    {/* <View >
                        <Chart />
                    </View> */}

                    {covidGraph &&
                        <FastImage
                            source={{
                                uri: `data:image/jpeg;base64,${covidGraph}`,
                            }}
                            style={{ height: 300, width: '100%' }}
                            resizeMode='contain'
                        />}

                    <View style={{ position: 'relative' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ fontFamily: Fonts.medium, fontSize: 18, color: Config.dark }}>User History</Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setShowSort(!showSort)}
                                style={{ flexDirection: 'row' }}>
                                <Text style={{ fontFamily: Fonts.medium }}>{showSort ? 'CLOSE' : 'SORT BY'}</Text>
                                {showSort ? <AntDesign name='close' size={20} /> : <MaterialCommunityIcons name='sort-variant' size={20} />}
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={userTestHistory}
                            renderItem={(({ item }) =>
                                <TestCard Data={item} />
                            )}
                        />

                        {showSort && <View
                            style={{
                                position: 'absolute',
                                top: 50, right: 15,
                                width: 200,
                                height: 160,
                                backgroundColor: 'white',
                                elevation: 2,
                                borderWidth: 0.5,
                                borderColor: 'gray'

                            }}>
                            <FlatList
                                data={['Aadhar Number', 'Gender', 'Date of Birth', 'Date of Test Taken']}
                                showsVerticalScrollIndicator={false}
                                renderItem={(({ item }) =>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => setShowSort(false)}
                                        style={{ minHeight: 40, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />


                        </View>}
                    </View>



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
