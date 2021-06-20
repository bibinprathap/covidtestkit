import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Fonts from '../../appConfig/Fonts'
import Config from '../../appConfig/Config'
import CheckBox from '@react-native-community/checkbox';

export default function index(props) {
    const { code, testId } = props.route.params
    // const code = 1234
    const [checked, setChecked] = useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                onPressBack={() => props.navigation.goBack()}
            />
            <View style={{ flex: 1, padding: 15 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                    <View style={{ height: 100, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text>Test ID</Text>
                            <Text style={{ fontSize: 20 }}>{testId}</Text>
                            <Text>Test kit no</Text>
                            <Text style={{ fontSize: 20 }}>{code}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={{ height: 50, width: 50, resizeMode: 'contain', }}
                                source={require('../../../assets/images/testube.png')}
                            />
                            <Text style={{ fontFamily: Fonts.bold, fontSize: 18, marginRight: 15, color: Config.dark, marginTop: 10 }}>CovidTest</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View>
                            <Text style={styles.headFonts}>Test ID</Text>
                            <Text style={{ fontFamily: Fonts.medium }}>23456</Text>
                        </View>
                        <View>
                            <Text style={styles.headFonts}>Test Type</Text>
                            <Text style={{ fontFamily: Fonts.medium }}>Antigen</Text>
                        </View>
                        <View>
                            <Text style={styles.headFonts}>Date</Text>
                            <Text style={{ fontFamily: Fonts.medium, }}>05jun2021</Text>
                        </View>
                    </View>

                    <Text style={{ fontFamily: Fonts.medium, color: Config.dark, fontSize: 18, marginTop: 20 }}>Instructions</Text>

                    <Text style={styles.headText}>Step-1</Text>
                    <Text style={styles.contentText}>The Covidtest COVID-19 Antigen Test is a self-te kit to detect the protein antigen from SARS-CoV -2.</Text>

                    <Text style={[styles.headText, { marginTop: 10 }]}>Step-2</Text>
                    <Text style={styles.contentText}>The Covidtest COVID-19 Antigen Test is a self-te kit to detect the protein antigen from SARS-CoV -2.</Text>

                    <Text style={[styles.headText, { marginTop: 10 }]}>Step-3</Text>
                    <Text style={styles.contentText}>The Covidtest COVID-19 Antigen Test is a self-te kit to detect the protein antigen from SARS-CoV -2.</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center' }}>
                        <CheckBox
                            value={checked}
                            onChange={() => setChecked(!checked)}
                            // onCheckColor={Config.dark}
                            tintColors={{ true: Config.dark, false: 'gray' }}
                        />
                        <Text style={{ fontSize: 18, color: "#000000", fontFamily: Fonts.regular }}>I agree T&C </Text>
                    </View>
                </ScrollView>
            </View>
            <Button
                Title='Start Timer'
                // disabled={calling}
                onPress={() => {
                    if (checked) {
                        props.navigation.navigate('timer', { code, testId })
                    }
                    else {
                        alert('Agree T&C')
                    }
                }}
                style={{
                    marginHorizontal: 3,
                    position: "absolute",
                    left: 10,
                    right: 10,
                    bottom: 15,
                }
                } />
        </View >
    )
}

const styles = StyleSheet.create({
    headFonts: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: '#232323'
    },
    headText: {
        fontSize: 18,
        color: '#1A1A1A',
        fontFamily: Fonts.medium
    },
    contentText: {
        fontSize: 13,
        color: '#1A1A1A',
        fontFamily: Fonts.regular
    },
})
