/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Center,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  VStack,
} from 'native-base'

import { Ionicons, FontAwesome } from '@expo/vector-icons'

import { ProductCarousel } from '@components/ProductCarousel'
import { UserPhoto } from '@components/UserPhoto'
import { ProductTag } from '@components/ProductTag'
import { Button } from '@components/Button'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useState } from 'react'

export function Preview() {
  // Navegando de volta p/ a tela Anterior //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  // Navegando de volta para a tela de Edição //
  async function handleEditProduct() {
    navigation.navigate('newandedit')
  }

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
    <VStack flex={1} mt={0}>
      <Center
        justifyContent={'center'}
        backgroundColor={'blue.400'}
        pt={16}
        pb={4}
      >
        <Heading fontFamily={'heading'} fontSize={'md'} color={'gray.100'}>
          Pré visualização do anúncio
        </Heading>
        <Text color={'gray.100'}>É assim que seu produto vai aparecer!</Text>
      </Center>

      <ProductCarousel />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
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

        <HStack
          justifyContent={'space-between'}
          paddingX={6}
          paddingTop={5}
          paddingBottom={7}
          alignItems={'center'}
          backgroundColor={'gray.100'}
          flex={1}
          space={3}
        >
          <Button
            flex={1}
            title={'Voltar e editar'}
            variant={'primary'}
            icon="arrow-left"
            onPress={handleEditProduct}
          />
          <Button
            flex={1}
            title={'Publicar'}
            icon="tag-outline"
            onPress={handleSaveProduct}
            isLoading={isLoading}
          />
        </HStack>
      </ScrollView>
    </VStack>
  )
}
