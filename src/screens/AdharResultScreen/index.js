import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity, TextInput, Platform } from 'react-native'
import Config from '../../appConfig/Config'
import Fonts from '../../appConfig/Fonts'
import Header from '../../components/Header'
import TestCard from '../../components/TestCard'
import Feather from 'react-native-vector-icons/Feather'
import Chart from '../../components/Chart'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
export default function index(props) {
    const [showSort, setShowSort] = useState(false)
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
                    />

                    <TouchableOpacity style={{ height: 40, width: 120, backgroundColor: 'black', marginVertical: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                        <Text style={{ fontFamily: Fonts.bold, color: 'white', marginBottom: -5, fontSize: 12 }}>Check Result</Text>
                    </TouchableOpacity>

                    <Text style={{ fontFamily: Fonts.medium, fontSize: 18, color: Config.dark }}>Result for Aadhar number</Text>
                    <Text style={{ fontFamily: Fonts.medium, fontSize: 18, }}>1234 1123 2354</Text>
                    <FlatList
                        data={['NEGATIVE', 'POSITIVE', 'NEGATIVE', 'POSITIVE']}
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
