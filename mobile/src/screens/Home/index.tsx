import { VStack, useToast } from 'native-base'

import { HomeHeader } from '@components/HomeHeader'
import { ActiveAdsCard } from './components/ActiveAdsCard'
import { Search } from './components/Search'
import { ProductList } from './components/ProductList'

import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
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
      setProducts(response.data)
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

  // Armazenando o número de anúncios ativos do Usuário //
  const [myActiveAds, setMyActiveAds] = useState(0)

  // Carregando o Número de anúncios ativos do Usuário //
  async function fetchUserProducts() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/users/products`)
      setMyActiveAds(data.length)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível encontrar os produtos do usuário, tente novamente mais tarde'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'error.500',
      })
      setMyActiveAds(0)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts()
      fetchUserProducts()
    }, []),
  )

  return (
    <VStack flex={1} mt={65}>
      <HomeHeader />
      <ActiveAdsCard myActiveAds={myActiveAds} isLoading={isLoading} />
      <Search />
      <ProductList products={products} isLoading={isLoading} />
    </VStack>
  )
}
