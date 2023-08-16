import { VStack, ScrollView, useToast } from 'native-base'

import { PreviewHeader } from './components/PreviewHeader'
import { ProductCarousel } from '@components/ProductCarousel'
import { PreviewInfos } from './components/PreviewInfos'
import { PreviewFooter } from './components/PreviewFooter'

import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useState } from 'react'
import { ProductImageDTO } from '@dtos/ProductImageDTO'
import { useAuth } from '@hooks/useAuth'

import { AppError } from '@utils/AppError'
import { api } from '@services/api'

// Ignorando o Aviso que aparece ao enviar uma função pelo Routes //
import { LogBox } from 'react-native'
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

type RouteParams = {
  name: string
  description: string
  price: number
  is_new: boolean
  accept_trade: boolean
  payment_methods: string[]
  images: ProductImageDTO[]
  handleResetFormAndImages: () => void
}

export function Preview() {
  // useAuth - Capturando o Usuário //
  const { user } = useAuth()

  // Route para capturar os Parâmetros //
  const route = useRoute()

  const {
    name,
    description,
    price,
    images,
    payment_methods,
    is_new,
    accept_trade,
    handleResetFormAndImages,
  } = route.params as RouteParams

  // Executando o Reset //
  async function callHandleResetFormAndImages() {
    if (handleResetFormAndImages) {
      handleResetFormAndImages()
    }
  }

  // Navegation para ir para a Home após salvar o Produto //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  // Loading //
  const [isLoading, setIsLoading] = useState(false)

  // Notificação Toast //
  const toast = useToast()

  // Salvando o novo Produto/Anúncio //
  async function handleSaveProduct() {
    try {
      setIsLoading(true)

      const { data } = await api.post('/products', {
        name,
        description,
        is_new,
        price,
        accept_trade,
        payment_methods,
      })

      const formData = new FormData()
      formData.append('product_id', data.id)

      // eslint-disable-next-line array-callback-return
      images.map((photo) => {
        formData.append('images', photo as any)
      })

      await api.post('/products/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.show({
        title: 'Anúncio cadastrado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })

      callHandleResetFormAndImages()
      /* await fetchUserProducts() */
      /* navigation.navigate('product', { id: data.id }) */
      navigation.navigate('home')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível cadastrar o seu produto. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <PreviewHeader />

      <ProductCarousel productImages={images} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <PreviewInfos
          user={user}
          productName={name}
          productDescription={description}
          productPrice={price}
          isNew={is_new}
          acceptTrade={accept_trade}
          paymentMethods={payment_methods}
        />

        <PreviewFooter isLoading={isLoading} onPress={handleSaveProduct} />
      </ScrollView>
    </VStack>
  )
}
