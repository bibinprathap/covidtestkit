import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Fonts from '../appConfig/Fonts'
import moment from 'moment'


function TestCard(props) {
    const { Data } = props

    const getcolor = () => {
        let result = Data.result
        if (result == 'positive' || result == 'Positive') {
            return '#B52B2B'
        }
        else if (result == 'negative' || result == 'Negative') {
            return '#39C42F'
        }
        else return 'lightblue'
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={styles.headFonts}>Adhar number</Text>
                    <Text style={{ fontFamily: Fonts.medium }}>{Data.uid}</Text>
                </View>
                <View>
                    <Text style={styles.headFonts}>Test Result</Text>
                    <Text style={{ fontFamily: Fonts.medium, color: getcolor() }}>{Data.result}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <View>
                    <Text style={styles.headFonts}>Name</Text>
                    <Text style={{ fontFamily: Fonts.medium, width: 130, fontSize: 11 }}>{Data.name}</Text>
                </View>
                <View>
                    <Text style={styles.headFonts}>Age</Text>
                    <Text style={{ fontFamily: Fonts.medium, width: 60, fontSize: 11 }}>{Data.age}</Text>
                </View>
                <View>
                    <Text style={styles.headFonts}>Date of Birth</Text>
                    <Text style={{ fontFamily: Fonts.medium, width: 80 }}>{moment(Data.date).format("MMM Do YY")}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // height: 100,
        borderWidth: 0.5,
        padding: 15,
        borderRadius: 10,
        borderColor: 'gray',
        marginTop: 15

    },
    headFonts: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: '#232323'
    }
})

export default TestCard
