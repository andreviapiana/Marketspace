import { StatusBar } from 'react-native'

import { SignIn } from '@screens/SignIn'

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SignIn />
    </>
  )
}
