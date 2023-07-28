import {
  Modal,
  Text,
  VStack,
  HStack,
  Checkbox,
  Switch,
  Heading,
  Icon,
  IconButton,
} from 'native-base'

import { Button } from '@components/Button'

import { Feather } from '@expo/vector-icons'

type FilterModalProps = {
  visible: boolean
  onClose: () => void
}

export function FilterModal({ visible, onClose }: FilterModalProps) {
  // Resetando a escolha dos Filtros //
  async function handleResetFilters() {
    console.log('BOTÃO DO MODAL => RESETOU OS FILTROS')
    onClose()
  }

  // Confirmando a escolha dos Filtros //
  async function handleApplyFilters() {
    console.log('BOTÃO DO MODAL => APLICOU OS FILTROS')
    onClose()
  }

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <VStack
        width="full"
        bg="gray.200"
        py="8"
        px="6"
        borderRadius="3xl"
        space="6"
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Heading color="gray.700" fontSize="lg" fontFamily={'heading'}>
            Filtrar anúncios
          </Heading>

          <IconButton
            rounded="full"
            icon={<Icon as={Feather} name="x" color="gray.400" size="lg" />}
            onPress={onClose}
          />
        </HStack>

        <VStack space={3}>
          <Text fontSize="sm" fontWeight="bold">
            Condição
          </Text>

          <Button title={'Novo'} />
        </VStack>

        <VStack alignItems="flex-start">
          <Text fontSize="sm" fontWeight="bold">
            Aceita troca?
          </Text>

          <Switch
            offTrackColor="gray.300"
            thumbColor="white"
            onTrackColor="blue.400"
            size={'lg'}
            mt={0}
            mb={0}
          />
        </VStack>

        <VStack space={2}>
          <HStack alignItems="baseline">
            <Heading fontSize="sm" fontFamily={'heading'}>
              Meios de pagamento aceitos
            </Heading>
          </HStack>

          <Checkbox.Group colorScheme="blue" accessibilityLabel="pick an item">
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

        <HStack space={2} mt="4">
          <Button
            title="Resetar filtros"
            variant="primary"
            flex={1}
            onPress={handleResetFilters}
          />

          <Button
            title="Aplicar filtros"
            variant={'secondary'}
            flex={1}
            onPress={handleApplyFilters}
          />
        </HStack>
      </VStack>
    </Modal>
  )
}
