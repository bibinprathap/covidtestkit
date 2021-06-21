import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList } from 'react-native'
import Config from '../../appConfig/Config'
import Fonts from '../../appConfig/Fonts'
import Header from '../../components/Header'
import TestCard from '../../components/TestCard'
import API from '../../appConfig/api'
import Apiconstants from '../../appConfig/APIConstants'
import AppContext from '../../appConfig/constant'


export default function index(props) {
    const { authToken } = useContext(AppContext)
    const [subuserResults, setSubUserDetails] = useState([])


    useEffect(() => {
        // getTestHistory()
    }, [])

    const getTestHistory = () => {      //NOT BELONGS TO HERE
        console.warn(authToken)
        var data = new FormData()
        data.append('authcode', authToken);
        API(Apiconstants.GET_SUBUSER_RESULTS, data, "POST", null)
            .then((res) => {
                if (res.data.code == 200) {
                    setSubUserDetails(res.data.data)
                }
                // setCalling(false)
                console.warn('TEST HISTORY', res.data)
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header onPressBack={() => props.navigation.goBack()} />
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.headFonts}>Adhar number</Text>
                            <Text style={{ fontFamily: Fonts.medium }}>1234 5678 9345</Text>
                        </View>
                        <View>
                            <Text style={styles.headFonts}>Test Result</Text>
                            <Text style={{ fontFamily: Fonts.medium, color: 'green' }}>NEGATIVE</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View>
                            <Text style={styles.headFonts}>Name</Text>
                            <Text style={{ fontFamily: Fonts.medium }}>Raja lakshmi</Text>
                        </View>
                        <View>
                            <Text style={styles.headFonts}>Gender</Text>
                            <Text style={{ fontFamily: Fonts.medium }}>Female</Text>
                        </View>
                        <View>
                            <Text style={styles.headFonts}>Date of Birth</Text>
                            <Text style={{ fontFamily: Fonts.medium, }}>01-09-1988</Text>
                        </View>
                    </View>
                    <View style={{ height: 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
                        <View>
                            <Text style={{ fontFamily: Fonts.medium, fontSize: 18, color: Config.dark }}>Test Details</Text>
                            <Text style={{ fontFamily: Fonts.regular, fontSize: 12 }}>Test kit no</Text>
                            <Text style={{ fontSize: 14, fontFamily: Fonts.medium }}>SARS-Cov-2</Text>
                        </View>
                        <Image
                            style={{ height: 100, width: 100, resizeMode: 'contain', }}
                            source={require('../../../assets/images/care1.png')}
                        />

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '80%' }}>
                        <View>
                            <Text style={styles.headFonts}>Test ID</Text>
                            <Text style={{ fontFamily: Fonts.medium }}>12345</Text>
                        </View>
                        <View>
                            <Text style={styles.headFonts}>Test Name</Text>
                            <Text style={{ fontFamily: Fonts.medium }}>Antigen</Text>
                        </View>
                        <View>
                            <Text style={styles.headFonts}>Date</Text>
                            <Text style={{ fontFamily: Fonts.medium, }}>01jun2020</Text>
                        </View>
                    </View>

                    <Text style={{ fontFamily: Fonts.medium, fontSize: 18, color: Config.dark, marginTop: 20 }}>Related Aadhar number tests</Text>

                    <FlatList
                        data={subuserResults}
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
