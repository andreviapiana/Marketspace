import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { Box, useTheme } from 'native-base'
import { AuthRoutes } from './auth.routes'

import { useAuth } from '@hooks/useAuth'

export function Routes() {
  const { colors } = useTheme()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[200]

  const { user } = useAuth()

  console.log('USUÁRIO LOGADO =>', user)

  return (
    <Box flex={1} bg="gray.200">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
