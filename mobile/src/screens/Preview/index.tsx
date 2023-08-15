import { VStack, ScrollView } from 'native-base'

import { PreviewHeader } from './components/PreviewHeader'
import { ProductCarousel } from '@components/ProductCarousel'
import { PreviewInfos } from './components/PreviewInfos'
import { PreviewFooter } from './components/PreviewFooter'

import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useState } from 'react'
import { ProductImageDTO } from '@dtos/ProductImageDTO'
import { useAuth } from '@hooks/useAuth'

type RouteParams = {
  name: string
  description: string
  price: number
  is_new: boolean
  accept_trade: boolean
  payment_methods: string[]
  images: ProductImageDTO[]
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
  } = route.params as RouteParams

  // Navegation para ir para a Home após salvar o Produto //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  // Loading //
  const [isLoading, setIsLoading] = useState(false)

  // Salvando o novo Produto/Anúncio //
  async function handleSaveProduct() {
    setIsLoading(true)
    console.log('Clicou em Publicar')
    setIsLoading(false)
    navigation.navigate('home')
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
