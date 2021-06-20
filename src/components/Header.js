import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fonts from '../appConfig/Fonts'

function Header(props) {
    return (
        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={props.onPressBack}
                style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name='left' size={30} />
            </TouchableOpacity>
            {props.Title && <Text style={{ fontFamily: Fonts.medium, fontSize: 18 }}>{props.Title}</Text>}

        </View>
    )
}

const styles = StyleSheet.create({})

export default Header
