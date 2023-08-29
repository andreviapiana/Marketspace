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
import { FiltersDTO } from '@dtos/FiltersDTO'

// Ignorando o Aviso que aparece ao enviar uma função pelo Routes //
import { LogBox } from 'react-native'
import { FilterModal } from './components/FilterModal'
LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
])

export function Home() {
  // State p/ armazenar os Produtos/Anúncios //
  const [products, setProducts] = useState<ProductDTO[]>([])

  // State com o Status do Modal (aberto ou fechado) //
  const [showModal, setShowModal] = useState(false)

  // Loading no Card dos Meus Anúncios Ativos //
  const [isLoading, setIsLoading] = useState(false)

  // Loading nos Produtos da Home //
  const [isLoadingAd, setIsLoadingAd] = useState(false)

  // Notificação Toast //
  const toast = useToast()

  // State com os Filtros selecionados no Modal //
  const [filtersSelected, setFiltersSelected] = useState<FiltersDTO>(
    {} as FiltersDTO,
  )

  // Verificação se existe algum filtro dentro do filtersSelected //
  const hasFilters = Object.keys(filtersSelected).length > 0

  // Fazendo o Fetch dos Produtos/Anúncios //
  async function fetchProducts() {
    try {
      setIsLoadingAd(true)

      const paymentMethodQueryString = filtersSelected?.payment_methods?.map(
        (method) => `&payment_methods=${method}`,
      )

      const filterString = `?is_new=${filtersSelected?.is_new}&accept_trade=${filtersSelected?.accept_trade}${paymentMethodQueryString}`

      const response = await api.get(
        `/products${hasFilters ? filterString : ''}`,
      )

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
      setIsLoadingAd(false)
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
        bgColor: 'red.500',
      })
      setMyActiveAds(0)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts()
    }, [filtersSelected]),
  )

  useFocusEffect(
    useCallback(() => {
      fetchUserProducts()
    }, []),
  )

  return (
    <>
      <VStack flex={1} mt={65}>
        <HomeHeader />
        <ActiveAdsCard myActiveAds={myActiveAds} />
        <Search setShowModal={setShowModal} setProducts={setProducts} />
        <ProductList products={products} isLoading={isLoadingAd} />
      </VStack>

      <FilterModal
        setShowModal={setShowModal}
        setFiltersSelected={setFiltersSelected}
        showModal={showModal}
      />
    </>
  )
}
