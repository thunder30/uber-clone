import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'

import NavOptions from '../components/NavOptions'
import NavFavourites from '../components/NavFavourites'

const HomeScreen = () => {
    const dispatch = useDispatch()
    //console.log(GOOGLE_MAPS_APIKEY)
    // JSX -> javascript XML
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                    }}
                    source={{
                        uri: 'https://links.papareact.com/gzs',
                    }}
                />

                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    placeholder="Where from?"
                    minLength={2}
                    returnKeyType={'search'}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // console.log(data, details)
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description,
                            })
                        )

                        dispatch(setDestination(null))
                    }}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                />

                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: 'blue',
    },
})
