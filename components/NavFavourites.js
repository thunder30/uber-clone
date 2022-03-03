import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'

const data = [
    {
        id: '123',
        icon: 'home',
        location: 'Home',
        destination: 'Phan Huy Ích, P.14, Q.Tân Bình, TP.HCM',
    },
    {
        id: '456',
        icon: 'briefcase',
        location: 'Work',
        destination: 'Hutech University, HCM',
    },
]

const NavFavourites = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
            )}
            renderItem={({ item: { icon, location, destination } }) => (
                <TouchableOpacity style={tw`flex-row items-center p-5`}>
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type="ionicon"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>
                            {location}
                        </Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavFavourites
