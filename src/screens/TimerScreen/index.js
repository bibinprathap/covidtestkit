import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Config from '../../appConfig/Config'
import Fonts from '../../appConfig/Fonts';
import Button from '../../components/Button';
import { Stopwatch, Timer } from '../../components/react-native-stopwatch-timer'

export default function index(props) {
    const { code, testId } = props.route.params
    const [showUpload, setUpload] = useState(false)
    const handleTimerComplete = () => { setUpload(true) };

    const options = {
        container: {

        },
        text: {
            fontSize: 22,
            color: '#FFF',
            fontFamily: Fonts.semi_bold
        }
    };
    const getFormattedTime = (time) => {
        this.currentTime = time;
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 120, width: 120, borderRadius: 60, backgroundColor: Config.dark, justifyContent: 'center', alignItems: 'center' }}>
                    <Timer
                        // totalDuration={900000}
                        totalDuration={10000}
                        start={true}
                        reset={false}
                        options={options}
                        handleFinish={handleTimerComplete}
                        getTime={getFormattedTime}
                    />
                </View>

            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                {showUpload &&
                    <Button Title='Upload' style={{ margin: 15 }}
                        onPress={() => props.navigation.navigate('covidtestkitscan', { code, testId })}
                    />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
