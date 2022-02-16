import React from 'react'
import { Provider } from 'react-redux'
import HomeScreen from './screens/HomeScreen'
import { store } from './store'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// 1. Set up redux

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <HomeScreen />
            </SafeAreaProvider>
        </Provider>
    )
}
