import { HomeHeader } from '@components/HomeHeader'
import { Text, VStack } from 'native-base'

export function Home() {
  return (
    <VStack flex={1} mt={65}>
      <HomeHeader />
      <Text>Home</Text>
    </VStack>
  )
}
