import { HStack, Heading, Icon, VStack, Text } from 'native-base'

import { ProductTag } from '@components/ProductTag'
import { UserPhoto } from '@components/UserPhoto'

import { Ionicons, FontAwesome } from '@expo/vector-icons'

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

        <VStack mb={6}>
          <Heading fontFamily={'heading'} fontSize={'sm'}>
            Meios de pagamento:
          </Heading>

          <HStack mt={2}>
            <Icon
              as={Ionicons}
              name="barcode-outline"
              size={'md'}
              alignItems={'center'}
            />
            <Text ml={2}>Boleto</Text>
          </HStack>

          <HStack mt={2}>
            <Icon
              as={FontAwesome}
              name="qrcode"
              size={'md'}
              alignItems={'center'}
            />
            <Text ml={2}>Pix</Text>
          </HStack>

          <HStack mt={2}>
            <Icon
              as={FontAwesome}
              name="money"
              size={'md'}
              alignItems={'center'}
            />
            <Text ml={2}>Dinheiro</Text>
          </HStack>

          <HStack mt={2}>
            <Icon
              as={FontAwesome}
              name="credit-card"
              size={'md'}
              alignItems={'center'}
            />
            <Text ml={2}>Cartão de Crédito</Text>
          </HStack>

          <HStack mt={2}>
            <Icon
              as={FontAwesome}
              name="bank"
              size={'md'}
              alignItems={'center'}
            />
            <Text ml={2}>Depósito Bancário</Text>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
