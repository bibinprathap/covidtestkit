import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'


function Button(props) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={props.calling}
            style={[styles.button, props.style]}
            onPress={props.onPress}>
            <Text
                style={styles.buttonContent}>
                {props.Title}
            </Text>
            {props.calling && <ActivityIndicator size={25} color='white' />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        elevation: 5,
        backgroundColor: '#FCB913',
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonContent: {
        fontSize: 18,
        color: '#FFF'
    },
})

export default Button
