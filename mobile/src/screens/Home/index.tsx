import { HomeHeader } from '@components/HomeHeader'
import { VStack } from 'native-base'
import { ActiveAdsCard } from './components/ActiveAdsCard'
import { Search } from './components/Search'
import { ProductList } from './components/ProductList'

export function Home() {
  return (
    <VStack flex={1} mt={65}>
      <HomeHeader />
      <ActiveAdsCard />
      <Search />
      <ProductList />
    </VStack>
  )
}
