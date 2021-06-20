import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Config from '../../../appConfig/Config'

function VideoBanner() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.bannerContainer}>
                <FastImage
                    style={{ height: 170, width: Config.DevWidth - 30 }}
                    source={{ uri: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg' }}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 200
    },
    bannerContainer: {
        height: 170,
        width: Config.DevWidth - 30,
        marginVertical: 15,
        backgroundColor: '#E6E6E6',
        borderRadius: 10,
        overflow: 'hidden'
    }
})

export default VideoBanner
