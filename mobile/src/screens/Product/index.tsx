import { ScrollView, VStack } from 'native-base'

import { ProductCarousel } from '@components/ProductCarousel'
import { ProductHeader } from './components/ProductHeader'
import { ProductFooter } from './components/ProductFooter'
import { ProductInfos } from './components/ProductInfos'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

export function Product() {
  // Navegando de volta p/ a tela Anterior //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  // Navegando para a tela de Edição //
  async function handleEditProduct() {
    navigation.navigate('newandedit')
  }

  // Exibindo o Botão de Editar quando você é o dono do produto //
  const isMyProduct = true

  // Variante com o Produto Desativado //
  const isAdDisabled = false

  return (
    <VStack flex={1} mt={'64px'}>
      <ProductHeader isMyProduct={isMyProduct} onPress={handleEditProduct} />

      <ProductCarousel isAdDisabled={isAdDisabled} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ProductInfos />

        <ProductFooter isMyProduct={isMyProduct} isAdDisabled={isAdDisabled} />
      </ScrollView>
    </VStack>
  )
}
