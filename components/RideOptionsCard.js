import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
} from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { selectTravelTimeInfomation } from '../slices/navSlice'

const data = [
    {
        id: 'Uber-X-123',
        title: 'Uber X',
        multiplier: 1,
        image: 'https://links.papareact.com/3pn',
    },
    {
        id: 'Uber-XL-456',
        title: 'Uber XL',
        multiplier: 1.5,
        image: 'https://links.papareact.com/5w8',
    },
    {
        id: 'Uber-Lux-789',
        title: 'Uber LUX',
        multiplier: 2,
        image: 'https://links.papareact.com/7pf',
    },
]

// set price base on distance
const SURGE_CHARGE = 10

const RideOptionsCard = () => {
    const navigation = useNavigation()
    const travelTimeInformation = useSelector(selectTravelTimeInfomation)
    const [selected, setSelected] = useState(null)

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <View>
                <TouchableOpacity
                    style={tw`absolute top-2 left-5 p-3 z-10 rounded-full`}
                    onPress={() => navigation.navigate('NavigateCard')}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-4 text-xl `}>Select a Ride</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({
                    item: { id, title, multiplier, image },
                    item,
                }) => (
                    <TouchableOpacity
                        style={tw`flex-row items-center justify-between px-10 ${
                            id === selected?.id && 'bg-gray-200'
                        }`}
                        onPress={() => setSelected(item)}
                    >
                        <Image
                            style={[
                                tw`w-20 h-20 md:w-24 md:h-24`,
                                { resizeMode: 'contain' },
                            ]}
                            source={{ uri: image }}
                        />
                        <View style={tw`mr-6`}>
                            <Text style={tw`text-lg md:text-xl font-semibold`}>
                                {title}
                            </Text>
                            <Text>
                                {travelTimeInformation?.distance?.text} -{' '}
                                {travelTimeInformation?.duration?.text}
                            </Text>
                        </View>
                        <Text style={tw`text-base md:text-lg lg:text-xl`}>
                            {new Intl.NumberFormat('vi-VI', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(
                                (travelTimeInformation?.distance?.value *
                                    multiplier *
                                    SURGE_CHARGE) /
                                    1
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-black py-3 ${!selected && 'bg-gray-300'}`}
                >
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard
