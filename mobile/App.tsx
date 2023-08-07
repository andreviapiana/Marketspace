import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import { THEME } from './src/theme'

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

import { Loading } from '@components/Loading'
import { Routes } from '@routes/index'

import { AuthContext } from '@contexts/AuthContext'

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContext.Provider
        value={{
          user: {
            id: '1',
            name: 'Rodrigo Gonçalves',
            email: 'rodrigo@email.com',
            tel: '54999999999',
            avatar: 'rodrigo.png',
          },
        }}
      >
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  )
}
