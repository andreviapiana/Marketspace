import { VStack, useToast } from 'native-base'

import { HomeHeader } from '@components/HomeHeader'
import { ActiveAdsCard } from './components/ActiveAdsCard'
import { Search } from './components/Search'
import { ProductList } from './components/ProductList'

import { useEffect, useState } from 'react'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ProductDTO } from '@dtos/ProductDTO'

export function Home() {
  // State p/ armazenar os Produtos/Anúncios //
  const [products, setProducts] = useState<ProductDTO[]>([])

  // Loading //
  const [isLoading, setIsLoading] = useState(false)

  // Notificação Toast //
  const toast = useToast()

  // Fazendo o Fetch dos Produtos/Anúncios //
  async function fetchProducts() {
    try {
      setIsLoading(true)
      const response = await api.get('/products')
      console.log(response.data)
      /* setProducts(response.data) */
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os anúncios.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <VStack flex={1} mt={65}>
      <HomeHeader />
      <ActiveAdsCard />
      <Search />
      <ProductList />
    </VStack>
  )
}
