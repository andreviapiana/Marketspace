import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import { Home } from '@screens/Home'
import { MyAds } from '@screens/MyAds'
import { NewAndEdit } from '@screens/NewAndEdit'
import { Product } from '@screens/Product'

import { useTheme } from 'native-base'

import HomeSvg from '@assets/home.svg'
import MyAdsSvg from '@assets/myads.svg'
import SignOutSvg from '@assets/signout.svg'

type AppRoutes = {
  home: undefined
  myads: undefined
  newandedit: undefined
  product: undefined
  signOut: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

function LogoutComponent() {
  return null
}

export function AppRoutes() {
  // Estilo e Tamanho dos Ícones do Menu Inferior //
  const { sizes, colors } = useTheme()
  const iconSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="myads"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => (
            <MyAdsSvg
              fill={color}
              stroke={color}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />

      <Screen
        name="signOut"
        component={LogoutComponent}
        options={{
          tabBarIcon: ({ color }) => (
            <SignOutSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            /* signOut() */
          },
        }}
      />

      <Screen
        name="newandedit"
        component={NewAndEdit}
        options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />

      <Screen
        name="product"
        component={Product}
        options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />
    </Navigator>
  )
}
