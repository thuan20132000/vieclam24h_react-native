import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

const MapPlaceDirectionScreen = () => {
    return (
        <MapView style={{ display: 'flex', flex: 1 }}

            provider={PROVIDER_GOOGLE}
            mapType={'standard'}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}

        >


        </MapView>
    )
}

export default MapPlaceDirectionScreen

const styles = StyleSheet.create({})
