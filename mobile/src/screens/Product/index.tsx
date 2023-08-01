import {
  HStack,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base'
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons'

import { ProductCarousel } from './components/ProductCarousel'
import { UserPhoto } from '@components/UserPhoto'
import { ProductTag } from '@components/ProductTag'
import { Button } from '@components/Button'

import { useNavigation } from '@react-navigation/native'
import { Linking } from 'react-native'

export function Product() {
  // Navegando de volta p/ a tela Anterior //
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1} mt={'64px'}>
      <IconButton
        rounded="full"
        width={10}
        height={6}
        marginBottom={3}
        marginLeft={6}
        justifyContent={'flex-start'}
        icon={
          <Icon as={Feather} name="arrow-left" color="gray.700" size="lg" />
        }
        onPress={handleGoBack}
      />

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
          <View width={42}>
            <ProductTag is_new={true} />
          </View>

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
        >
          <Heading fontFamily={'heading'} color={'blue.500'} fontSize={'xl'}>
            <Text fontSize={'sm'}>R$&nbsp;</Text>
            120,00
          </Heading>

          <Button
            title={'Entrar em contato'}
            icon="whatsapp"
            size={'small'}
            onPress={() =>
              Linking.canOpenURL('whatsapp://send?text=oi').then(
                (supported) => {
                  if (supported) {
                    return Linking.openURL(
                      'whatsapp://send?phone=5554999999999&text=Oi, produto disponível?',
                    )
                  } else {
                    return Linking.openURL(
                      'https://api.whatsapp.com/send?phone=5554999999999&text=Oi, produto disponível?',
                    )
                  }
                },
              )
            }
          />
        </HStack>
      </ScrollView>
    </VStack>
  )
}
