import React from 'react'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import { store } from './store'
import MapScreen from './screens/MapScreen'

// 1. Set up redux

export default function App() {
    const { Navigator, Screen } = createNativeStackNavigator()
    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <Navigator>
                        <Screen
                            name="HomeScreen"
                            component={HomeScreen}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Screen
                            name="MapScreen"
                            component={MapScreen}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </Navigator>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    )
}
