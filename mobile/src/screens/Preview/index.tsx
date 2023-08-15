import { VStack, ScrollView } from 'native-base'

import { PreviewHeader } from './components/PreviewHeader'
import { ProductCarousel } from '@components/ProductCarousel'
import { PreviewInfos } from './components/PreviewInfos'
import { PreviewFooter } from './components/PreviewFooter'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useState } from 'react'

export function Preview() {
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

      <ProductCarousel />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <PreviewInfos />

        <PreviewFooter isLoading={isLoading} onPress={handleSaveProduct} />
      </ScrollView>
    </VStack>
  )
}
