import {
  Checkbox,
  HStack,
  Heading,
  Icon,
  IconButton,
  Radio,
  ScrollView,
  Switch,
  Text,
  VStack,
} from 'native-base'

import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Input } from '@components/Input'
import { TextArea } from '@components/TextArea'
import { useState } from 'react'
import { Button } from '@components/Button'

export function NewAndEdit() {
  // Navegando de volta p/ a tela Anterior //
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  // Valor do seletor deo estado do item (Radio) //
  const [value, setValue] = useState('new')

  return (
    <VStack flex={1} mt={65}>
      <HStack justifyContent={'center'}>
        <IconButton
          rounded="full"
          width={10}
          height={6}
          marginBottom={3}
          marginLeft={3}
          justifyContent={'flex-start'}
          position={'absolute'}
          left={0}
          icon={
            <Icon as={Feather} name="arrow-left" color="gray.700" size="lg" />
          }
          onPress={handleGoBack}
        />
        <Heading
          color="gray.700"
          fontSize="lg"
          fontFamily={'heading'}
          position={'relative'}
        >
          Meus anúncios
        </Heading>
      </HStack>

      <ScrollView mt={8}>
        <VStack paddingX={6}>
          <Heading
            color="gray.700"
            fontSize="md"
            fontFamily={'heading'}
            marginBottom={1}
          >
            Imagens
          </Heading>

          <Text marginBottom={4} fontSize={'sm'}>
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>
        </VStack>

        <VStack marginBottom={8} paddingX={6}>
          <Heading
            color="gray.700"
            fontSize="md"
            fontFamily={'heading'}
            marginBottom={4}
          >
            Sobre o produto
          </Heading>

          <Input placeholder="Título do anúncio" />

          <TextArea placeholder="Descrição do produto" />

          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="Estado do item"
            direction={'row'}
            alignItems={'center'}
            onChange={(nextValue) => {
              setValue(nextValue)
            }}
          >
            <Radio value="new" my={1} size="md" fontFamily={'body'}>
              Produto novo
            </Radio>
            <Radio value="used" my={1} size="md" marginLeft={5}>
              Produto usado
            </Radio>
          </Radio.Group>
        </VStack>

        <VStack space={2} paddingX={6} paddingBottom={6}>
          <Heading fontSize="md" fontFamily={'heading'}>
            Venda
          </Heading>

          <Input
            placeholder="Valor do produto"
            InputLeftElement={<Text marginLeft={4}>R$</Text>}
          />

          <Heading fontSize="sm" fontFamily={'heading'}>
            Aceita troca?
          </Heading>

          <Switch
            offTrackColor="gray.300"
            thumbColor="white"
            onTrackColor="blue.400"
            alignSelf={'flex-start'}
            size={'lg'}
            mt={0}
            mb={0}
            /* value={!!filters.accept_trade}
            onToggle={() =>
              handleOnChangeFilter({
                accept_trade: !filters.accept_trade,
              })
            } */
          />

          <HStack alignItems="baseline">
            <Heading fontSize="sm" fontFamily={'heading'}>
              Meios de pagamento aceitos
            </Heading>
          </HStack>

          <Checkbox.Group
            colorScheme="blue"
            accessibilityLabel="pick an item"
            /* defaultValue={filters.payment_methods}
            onChange={(value) => handleOnChangeFilter({ payment_methods: value })} */
          >
            <Checkbox
              _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
              value="boleto"
              my="1"
            >
              Boleto
            </Checkbox>

            <Checkbox
              value="pix"
              my="1"
              _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
            >
              Pix
            </Checkbox>

            <Checkbox
              value="cash"
              my="1"
              _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
            >
              Dinheiro
            </Checkbox>

            <Checkbox
              value="card"
              my="1"
              _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
            >
              Cartão de Crédito
            </Checkbox>

            <Checkbox
              value="deposit"
              my="1"
              _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
            >
              Depósito Bancário
            </Checkbox>
          </Checkbox.Group>
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
          <Button flex={1} title={'Cancelar'} variant={'primary'} />
          <Button flex={1} title={'Avançar'} variant={'secondary'} />
        </HStack>
      </ScrollView>
    </VStack>
  )
}
