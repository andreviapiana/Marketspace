import { ScrollView, VStack, useToast } from 'native-base'

import { ProductCarousel } from '@components/ProductCarousel'
import { ProductHeader } from './components/ProductHeader'
import { ProductFooter } from './components/ProductFooter'
import { ProductInfos } from './components/ProductInfos'

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useCallback, useState } from 'react'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ProductDTO } from '@dtos/ProductDTO'
import { Loading } from '@components/Loading'
import { useAuth } from '@hooks/useAuth'

type RouteParams = {
  id: string
}

export function Product() {
  // Capturando o Usuário Logado //
  const { user } = useAuth()

  // Route para capturar os Parâmetros //
  const route = useRoute()

  const { id } = route.params as RouteParams

  // Navigation //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  // Navegando para a tela anterior //
  function handleGoBack() {
    navigation.navigate('myads')
  }

  // Navegando para a tela de Edição //
  async function handleEditProduct(id: string) {
    navigation.navigate('newandedit', { id, mode: 'edit' })
  }

  // Loading //
  const [isLoading, setIsLoading] = useState(false)

  // Notificação Toast //
  const toast = useToast()

  // State para Salvar o Produto Buscado na API //
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)

  // Fetch do Produto usando o ID //
  async function getProductById() {
    try {
      setIsLoading(true)

      const { data } = await api.get(`/products/${id}`)

      setProduct(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o anúncio. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Exibindo o Botão de Editar quando você é o dono do produto //
  const isMyProduct = product.user_id === user.id

  // Variante com o Produto Desativado //
  const isAdDisabled = !product.is_active

  // Loading no Update //
  const [isUpdating, setIsUpdating] = useState(false)

  // Função p/ Ativar ou Desativar um Produto //
  async function handleEnableOrDisableAnnounce() {
    try {
      setIsUpdating(true)

      const data = {
        is_active: !product.is_active,
      }

      await api.patch(`/products/${product.id}`, data)
      await reloadProducts()
      handleGoBack()
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
    } finally {
      setIsUpdating(false)
    }
  }

  // Loading no botão de Exlusão de um Anúncio //
  const [isDeleting, setIsDeleting] = useState(false)

  // Função p/ Excluir um Anúncio //
  async function handleRemoveAnnounce() {
    try {
      setIsDeleting(true)
      await api.delete(`/products/${id}`)

      handleGoBack()
      toast.show({
        title: 'Anúncio excluído com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })
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
    } finally {
      setIsDeleting(false)
    }
  }

  // Função de Refetch dos Produtos //
  async function reloadProducts() {
    await getProductById()
  }

// Disparando o Fetch usando o ID ao abrir a página já atualizando o produto //
useFocusEffect(
  useCallback(() => {
    getProductById()
  }, [id]),
)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} mt={'64px'}>
          <ProductHeader
            isMyProduct={isMyProduct}
            onPress={() => handleEditProduct(id)}
          />

          <ProductCarousel
            isAdDisabled={isAdDisabled}
            productImages={product.product_images}
          />

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <ProductInfos product={product} />

            <ProductFooter
              isMyProduct={isMyProduct}
              isAdDisabled={isAdDisabled}
              productPrice={product.price}
              enableOrDisableAnnounce={handleEnableOrDisableAnnounce}
              removeAnnounce={handleRemoveAnnounce}
              isLoading={isUpdating}
              isDeleting={isDeleting}
            />
          </ScrollView>
        </VStack>
      )}
    </>
  )
}
