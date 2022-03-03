import React from 'react'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { KeyboardAvoidingView, Platform } from 'react-native'

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
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? -10 : 0}
                    >
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
                    </KeyboardAvoidingView>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    )
}
