import { HStack, Heading, VStack, Text } from 'native-base'

import { ProductTag } from '@components/ProductTag'
import { UserPhoto } from '@components/UserPhoto'
import { PaymentMethodIndicator } from '@components/PaymentMethodIndicator'

import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'

type PreviewInfosProps = {
  user: UserDTO
  productName: string
  productDescription: string
  productPrice: number
  isNew: boolean
  acceptTrade: boolean
  paymentMethods: string[]
}

export function PreviewInfos({
  user,
  productName,
  productDescription,
  productPrice,
  isNew,
  acceptTrade,
  paymentMethods,
}: PreviewInfosProps) {
  return (
    <VStack>
      <HStack mt={5} mb={6} paddingX={6}>
        <UserPhoto
          size={6}
          source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
          alt="Imagem do usuário"
          borderWidth={1}
        />
        <Text ml={2}>{user.name}</Text>
      </HStack>

      <VStack paddingX={6} space={3} mb={6}>
        <HStack>
          <ProductTag is_new={isNew} />
        </HStack>

        <HStack justifyContent={'space-between'}>
          <Heading fontFamily={'heading'} fontSize={'lg'}>
            {productName}
          </Heading>
          <Heading fontFamily={'heading'} color={'blue.400'} fontSize={'lg'}>
            {productPrice.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Heading>
        </HStack>

        <Text>{productDescription}</Text>
      </VStack>

      <VStack space={4} paddingX={6}>
        <Heading fontFamily={'heading'} fontSize={'sm'}>
          Aceita troca?&nbsp;
          <Text fontWeight={'normal'}>{acceptTrade ? 'Sim' : 'Não'}</Text>
        </Heading>

        <PaymentMethodIndicator payment_methodsPreview={paymentMethods} />
      </VStack>
    </VStack>
  )
}
