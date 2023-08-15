import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'

import { Home } from '@screens/Home'
import { MyAds } from '@screens/MyAds'
import { NewAndEdit } from '@screens/NewAndEdit'
import { Product } from '@screens/Product'
import { Preview } from '@screens/Preview'

import { useTheme } from 'native-base'

import HomeSvg from '@assets/home.svg'
import MyAdsSvg from '@assets/myads.svg'
import SignOutSvg from '@assets/signout.svg'

import { useAuth } from '@hooks/useAuth'

import { ProductDTO } from '@dtos/ProductDTO'

type AppRoutes = {
  home: undefined
  myads: undefined
  newandedit: undefined
  product: ProductDTO
  preview: ProductDTO
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

  // SignOut //
  const { signOut } = useAuth()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[600],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[100],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[7],
          paddingTop: sizes[7],
        },
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
            signOut()
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

      <Screen
        name="preview"
        component={Preview}
        options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />
    </Navigator>
  )
}
