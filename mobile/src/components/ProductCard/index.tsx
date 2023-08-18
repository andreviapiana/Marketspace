import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Box, Heading, Image, Text, VStack, View } from 'native-base'

import { UserPhoto } from '@components/UserPhoto'
import { ProductTag } from '@components/ProductTag'
import { ProductDTO } from '@dtos/ProductDTO'

import { api } from '@services/api'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

type ProductCardProps = TouchableOpacityProps & {
  hideUserAvatar?: boolean
  product: ProductDTO
}

export function ProductCard({ hideUserAvatar, product }: ProductCardProps) {
  // Navegando para a tela de Detalhes do Produto //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function handleGoToProduct(id: string) {
    console.log(
      `BOTÃO DE DETALHES => CLICOU EM ABRIR DETALHES ENVIANDO ESTE ID => ${id}`,
    )
    navigation.navigate('product', { id })
  }

  const isAdDisabled = product.is_active

  return (
    <TouchableOpacity onPress={() => handleGoToProduct(product.id)}>
      <VStack mb={6} position={'relative'}>
        {!hideUserAvatar && (
          <UserPhoto
            size={6}
            source={{
              uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
            }}
            alt="Imagem do usuário"
            position={'absolute'}
            top={1}
            left={1}
            zIndex={10}
            borderColor="gray.100"
            borderWidth={1}
          />
        )}
        <View position={'absolute'} top={1} right={1} zIndex={10}>
          <ProductTag is_new={product.is_new} />
        </View>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/images/${product.product_images[0]?.path}`,
          }}
          alt="Imagem do produto"
          w={154}
          h={100}
          rounded="md"
          resizeMode="center"
        />

        {isAdDisabled && (
          <Box
            backgroundColor={'rgba(0,0,0,0.5)'}
            zIndex={999}
            w={154}
            h={100}
            rounded="md"
            position={'absolute'}
          >
            <Text
              fontSize={11}
              color={'gray.100'}
              position={'absolute'}
              bottom={1}
              left={2}
              fontWeight={'bold'}
            >
              ANÚNCIO DESATIVADO
            </Text>
          </Box>
        )}

        <Text
          fontSize="sm"
          color={isAdDisabled ? 'gray.400' : 'gray.600'}
          mt={1}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <Heading
          fontSize="md"
          color={isAdDisabled ? 'gray.400' : 'gray.700'}
          fontFamily={'heading'}
        >
          {product.price.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Heading>
      </VStack>
    </TouchableOpacity>
  )
}
