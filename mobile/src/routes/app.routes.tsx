import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import { Home } from '@screens/Home'
import { MyAds } from '@screens/MyAds'
import { NewAndEdit } from '@screens/NewAndEdit'
import { Product } from '@screens/Product'

type AppRoutes = {
  home: undefined
  myads: undefined
  newandedit: undefined
  product: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

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
