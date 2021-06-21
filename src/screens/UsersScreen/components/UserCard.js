import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Fonts from '../../../appConfig/Fonts'
import Config from '../../../appConfig/Config'
import Button from '../../../components/Button'

function UserCard(props) {

    const { Data } = props
    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: Fonts.medium, fontSize: 18, color: Config.dark }}>Aadhar Details</Text>
            <View>
                <Text style={styles.headFonts}>Name</Text>
                <Text style={{ fontFamily: Fonts.medium, }}>{Data.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headFonts}>Aadhar Number</Text>
                    <Text style={{ fontFamily: Fonts.medium, }}>{Data.uid}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headFonts}>Age</Text>
                    <Text style={{ fontFamily: Fonts.medium }}>{Data.age}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <View style={{ flex: 1 }}>
                    <Text style={styles.headFonts}>Date of Birth</Text>
                    <Text style={{ fontFamily: Fonts.medium }}>{Data.birth_date}</Text>
                </View>
                <Button
                    onPress={props.onPress}
                    style={styles.button}
                    Title='Continue'

                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 100,
        backgroundColor: 'white',
        margin: 10,
        padding: 15,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5
    },
    headFonts: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: '#232323'
    },
    button: {
        backgroundColor: Config.dark,
        borderRadius: 5,
        borderRadius: 30,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        height: 40,
        paddingHorizontal: 40
    }
})

export default UserCard
