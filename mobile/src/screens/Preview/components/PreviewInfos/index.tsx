import { HStack, Heading, Icon, VStack, Text } from 'native-base'

import { ProductTag } from '@components/ProductTag'
import { UserPhoto } from '@components/UserPhoto'

import { Ionicons, FontAwesome } from '@expo/vector-icons'

export function PreviewInfos() {
  return (
    <VStack>
      <HStack mt={5} mb={6} paddingX={6}>
        <UserPhoto
          size={6}
          source={{ uri: 'https://github.com/andreviapiana.png' }}
          alt="Imagem do usuário"
          borderWidth={1}
        />
        <Text ml={2}>André Viapiana</Text>
      </HStack>

      <VStack paddingX={6} space={3} mb={6}>
        <HStack>
          <ProductTag is_new={true} />
        </HStack>

        <HStack justifyContent={'space-between'}>
          <Heading fontFamily={'heading'} fontSize={'lg'}>
            Bicicleta
          </Heading>
          <Heading fontFamily={'heading'} color={'blue.400'} fontSize={'lg'}>
            <Text fontSize={'sm'}>R$&nbsp;</Text>
            120,00
          </Heading>
        </HStack>

        <Text>
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
          Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
          nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
          in aliquam.
        </Text>
      </VStack>

      <VStack space={4} paddingX={6}>
        <Heading fontFamily={'heading'} fontSize={'sm'}>
          Aceita troca?&nbsp;
          <Text fontWeight={'normal'}>&nbsp;Sim</Text>
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
