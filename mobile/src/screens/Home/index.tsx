import { HomeHeader } from '@components/HomeHeader'
import { Text, VStack } from 'native-base'
import { ActiveAdsCard } from './components/ActiveAdsCard'
import { Search } from './components/Search'

export function Home() {
  return (
    <VStack flex={1} mt={65}>
      <HomeHeader />
      <ActiveAdsCard />
      <Search />
      <Text>Home</Text>
    </VStack>
  )
}
