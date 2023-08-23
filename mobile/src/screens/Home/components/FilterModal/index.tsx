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
import { ConditionFilter } from '../ConditionFilter'

import { Feather } from '@expo/vector-icons'
import { useState } from 'react'

import { FiltersDTO } from '@dtos/FiltersDTO'

import { paymentMethods } from '@dtos/PaymentMethodsDTO'

type FilterModalProps = {
  setFiltersSelected: (filters: FiltersDTO) => void
  setShowModal: (value: boolean) => void
  showModal: boolean
}

export function FilterModal({
  setShowModal,
  setFiltersSelected,
  showModal,
}: FilterModalProps) {
  // Armazenando o State individual dos Filtros //
  const [productCondition, setProductCondition] = useState<boolean | null>(null)
  const [acceptsTrade, setAcceptsTrade] = useState<boolean>(false)
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([])

  // Resetando a escolha dos Filtros //
  async function handleResetFilters() {
    setProductCondition(null)
    setAcceptsTrade(false)
    setSelectedPaymentMethods([])
  }

  return (
    <Modal flex={1} isOpen={showModal}>
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
            onPress={() => setShowModal(false)}
          />
        </HStack>

        <VStack space={3}>
          <Text fontSize="sm" fontWeight="bold">
            Condição
          </Text>

          <HStack>
            <ConditionFilter
              name={'NOVO'}
              onPress={() => setProductCondition(true)}
              value={productCondition === true}
            />
            <ConditionFilter
              name={'USADO'}
              onPress={() => setProductCondition(false)}
              value={productCondition === false}
            />
          </HStack>
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
            isChecked={acceptsTrade}
            onValueChange={setAcceptsTrade}
          />
        </VStack>

        <VStack space={2}>
          <HStack alignItems="baseline">
            <Heading fontSize="sm" fontFamily={'heading'}>
              Meios de pagamento aceitos
            </Heading>
          </HStack>

          <Checkbox.Group
            colorScheme="blue"
            accessibilityLabel="Selecione um meio de pagamento"
            onChange={setSelectedPaymentMethods}
            value={selectedPaymentMethods}
          >
            {paymentMethods.map((method) => (
              <Checkbox
                value={method.key}
                my={1}
                key={method.key}
                _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
              >
                <Text color="gray.600" fontSize="md">
                  {method.name}
                </Text>
              </Checkbox>
            ))}
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
            onPress={() => {
              setFiltersSelected({
                is_new: productCondition,
                accept_trade: acceptsTrade,
                payment_methods: selectedPaymentMethods,
              })
              setShowModal(false)
            }}
          />
        </HStack>
      </VStack>
    </Modal>
  )
}
