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
  FlatList,
} from 'native-base'

import { Button } from '@components/Button'
import { ConditionFilter } from '../ConditionFilter'

import { Feather } from '@expo/vector-icons'
import { useState } from 'react'

import { FiltersDTO } from '@dtos/FiltersDTO'

type FilterModalProps = {
  visible: boolean
  onClose: () => void
  onChangeFilters: (filters: FiltersDTO) => void
  defaultValue: FiltersDTO
}

export const emptyFilters: FiltersDTO = {
  product_name: null,
  is_new: null,
  accept_trade: null,
  payment_methods: [],
}

export function FilterModal({
  visible,
  onClose,
  onChangeFilters,
  defaultValue,
}: FilterModalProps) {
  // Armazenando os Filtros //
  const [filters, setFilters] = useState<FiltersDTO>(defaultValue)

  // Resetando a escolha dos Filtros //
  async function handleResetFilters() {
    setFilters(emptyFilters)
    onChangeFilters(emptyFilters)
    onClose()
  }

  // Confirmando a escolha dos Filtros //
  async function handleApplyFilters() {
    onChangeFilters(filters)
    onClose()
  }

  // Atualizando o State com a escolha dos Filtros //
  function handleOnChangeFilter(change: Partial<FiltersDTO>) {
    setFilters((prevFilter) => ({
      ...prevFilter,
      ...change,
    }))
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

          <HStack>
            <ConditionFilter
              name={'NOVO'}
              onPress={() =>
                handleOnChangeFilter({
                  is_new: filters.is_new === true ? null : true,
                })
              }
              value={filters.is_new === true}
            />
            <ConditionFilter
              name={'USADO'}
              onPress={() =>
                handleOnChangeFilter({
                  is_new: filters.is_new === false ? null : false,
                })
              }
              value={filters.is_new === false}
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
            value={!!filters.accept_trade}
            onToggle={() =>
              handleOnChangeFilter({
                accept_trade: !filters.accept_trade,
              })
            }
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
            accessibilityLabel="pick an item"
            defaultValue={filters.payment_methods}
            onChange={(value) =>
              handleOnChangeFilter({ payment_methods: value })
            }
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
