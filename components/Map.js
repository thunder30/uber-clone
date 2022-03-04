import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'twrnc'
import { useSelector } from 'react-redux'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'

import {
    selectOrigin,
    selectDestination,
    setTravelTimeInfomation,
} from '../slices/navSlice'

const Map = () => {
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!origin || !destination) return

        const timeOutId = setTimeout(() => {
            mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            })
        }, 500)

        return () => clearTimeout(timeOutId)
    }, [origin, destination])

    useEffect(() => {
        if (origin && destination) {
            // get travel time
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
            )
                .then((res) => res.json())
                .then((data) => {
                    const element = data.rows[0].elements[0]
                    dispatch(setTravelTimeInfomation(element))
                })
                .catch((err) => console.log(err))
        }
    }, [origin, destination, GOOGLE_MAPS_APIKEY])

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeColor="black"
                    strokeWidth={3}
                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        longitude: origin.location.lng,
                        latitude: origin.location.lat,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                    key={`${origin.location.lat}${origin.location.lng}`}
                />
            )}
            {destination?.location && (
                <Marker
                    coordinate={{
                        longitude: destination.location.lng,
                        latitude: destination.location.lat,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                    key={`${destination.location.lat}${destination.location.lng}`}
                />
            )}
        </MapView>
    )
}

export default Map
