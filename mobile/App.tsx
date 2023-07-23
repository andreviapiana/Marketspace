import { StatusBar, Text } from 'react-native'

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

import { SignIn } from '@screens/SignIn'
import { NativeBaseProvider } from 'native-base'

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Text>Hello World</Text> : <SignIn />}
    </NativeBaseProvider>
  )
}
