import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '@screens/Home'
import { MyAds } from '@screens/MyAds'
import { NewAndEdit } from '@screens/NewAndEdit'
import { Product } from '@screens/Product'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={Home} />

      <Screen name="myads" component={MyAds} />

      <Screen name="newandedit" component={NewAndEdit} />

      <Screen name="product" component={Product} />
    </Navigator>
  )
}
