import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Config from '../../../appConfig/Config'
import Fonts from '../../../appConfig/Fonts'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

function HomeHeader(props) {
    return (
        <View style={{ height: 75, backgroundColor: 'white', elevation: 3 }}>
            <View style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={props.onPressBurger}
                    style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Feather name='menu' size={20} />
                </TouchableOpacity>
                <Text style={{ fontFamily: Fonts.bold, fontSize: 18, marginRight: 15, color: Config.dark }}>CovidTest</Text>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15 }}>
                <MaterialIcon name='location-on' size={20} color={Config.dark} />
                <Text style={{ fontFamily: Fonts.regular, fontSize: 12 }}>Location</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})

export default HomeHeader
