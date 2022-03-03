import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import Map from '../components/Map'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'

const MapScreen = () => {
    const { Navigator, Screen } = createNativeStackNavigator()
    const navigation = useNavigation()

    return (
        <View>
            <TouchableOpacity
                style={tw`absolute z-10 p-3 top-10 left-6 bg-gray-100 shadow-md rounded-full`}
                onPress={() => navigation.navigate('HomeScreen')}
            >
                <Icon name="home" />
            </TouchableOpacity>
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Navigator>
                    <Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Navigator>
            </View>
        </View>
    )
}

export default MapScreen
