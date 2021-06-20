import React from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker'
import Fonts from '../appConfig/Fonts'

function Chart() {
    return (
        <View style={{ marginHorizontal: -15 }}>
            <View style={{
                marginVertical: 20
            }}>
                <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
                    {[{ color: 'rgba(255, 87, 121, 1)', title: 'Positive Results' }, { color: 'rgba(70, 244, 156,1)', title: 'Nagative Results' }, { color: 'rgba(1, 149, 175,1)', title: 'Test Taken' }].map((data) => (
                        <View style={{ height: 20, flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                            <View style={{ height: 15, width: 15, backgroundColor: data.color, borderRadius: 4 }} />
                            <Text style={{ fontFamily: Fonts.regular, fontSize: 11, marginLeft: 5 }}>{data.title}</Text>
                        </View>
                    ))}

                </View>
                <LineChart
                    data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [
                            {
                                data: [10, 45, 33, 80, 99, 43, 10, 45, 33, 80, 99, 43],
                                color: (opacity = 1) => `rgba(255, 87, 121, ${1})`,
                            },
                            {
                                data: [20, 15, 25, 90, 79, 43, 20, 15, 25, 90, 79, 43],
                                color: (opacity = 1) => `rgba(70, 244, 156, ${1})`,

                            },
                            {
                                data: [50, 45, 40, 80, 99, 43, 50, 45, 40, 80, 99, 130],
                                color: (opacity = 1) => `rgba(1, 149, 175, ${1})`,


                            }
                        ],
                    }}
                    width={Dimensions.get('window').width}
                    height={320}
                    // yAxisSuffix='k'
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "white",
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        decimalPlaces: 2,
                        color: (opacity = 0) => `rgba(255,0,0, ${opacity})`,
                        labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: '0',
                            strokeWidth: 2,
                            // stroke: "red"
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default Chart
