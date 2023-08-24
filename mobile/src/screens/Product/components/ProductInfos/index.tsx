import { HStack, Heading, VStack, View, Text } from 'native-base'

import { ProductTag } from '@components/ProductTag'
import { UserPhoto } from '@components/UserPhoto'
import { PaymentMethodIndicator } from '@components/PaymentMethodIndicator'

import { ProductDTO } from '@dtos/ProductDTO'
import { api } from '@services/api'

type ProductInfosProps = {
  product: ProductDTO
}

export function ProductInfos({ product }: ProductInfosProps) {
  return (
    <View>
      <HStack mt={5} mb={6} paddingX={6}>
        <UserPhoto
          size={6}
          source={{
            uri:
              product.user?.avatar &&
              `${api.defaults.baseURL}/images/${product.user?.avatar}`,
          }}
          alt="Imagem do usuário"
          borderWidth={1}
        />
        <Text ml={2}>{product.user?.name}</Text>
      </HStack>

      <VStack paddingX={6} space={3} mb={6}>
        <View>
          <ProductTag is_new={product.is_new} />
        </View>

        <HStack justifyContent={'space-between'}>
          <Heading fontFamily={'heading'} fontSize={'lg'}>
            {product.name}
          </Heading>
          <Heading fontFamily={'heading'} color={'blue.400'} fontSize={'lg'}>
            {product.price?.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Heading>
        </HStack>

        <Text>{product.description}</Text>
      </VStack>

      <VStack space={4} paddingX={6}>
        <Heading fontFamily={'heading'} fontSize={'sm'}>
          Aceita troca?&nbsp;
          <Text fontWeight={'normal'}>
            &nbsp;{product.accept_trade === true ? 'Sim' : 'Não'}
          </Text>
        </Heading>

        <PaymentMethodIndicator payment_methods={product.payment_methods} />
      </VStack>
    </View>
  )
}
