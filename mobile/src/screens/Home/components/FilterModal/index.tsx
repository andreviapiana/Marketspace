import {
  Modal,
  Text,
  VStack,
  HStack,
  Switch,
  Heading,
  Icon,
  IconButton,
  Radio,
} from 'native-base'

import { Button } from '@components/Button'
import { ConditionFilter } from '../ConditionFilter'

import { Feather } from '@expo/vector-icons'
import { useState } from 'react'

import { FiltersDTO } from '@dtos/FiltersDTO'

import { paymentMethods } from '@dtos/PaymentMethodsDTO'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Checkbox } from '@components/Checkbox'

type FilterModalProps = {
  setFiltersSelected: (filters: FiltersDTO) => void
  setShowModal: (value: boolean) => void
  showModal: boolean
}

const filterModalSchema = yup.object({
  is_new: yup.boolean().required(),
  accept_trade: yup.boolean().required(),
  payment_methods: yup
    .array()
    .min(0, 'Selecione um meio de pagamento.')
    .required('Selecione um meio de pagamento.'),
})

type ModalFormDataProps = yup.InferType<typeof filterModalSchema>

export function FilterModal({
  setShowModal,
  setFiltersSelected,
  showModal,
}: FilterModalProps) {
  // Armazenando os Inputs //
  const { control, handleSubmit, reset } = useForm<ModalFormDataProps>({
    defaultValues: {
      is_new: true,
      accept_trade: false,
      payment_methods: [],
    },
    resolver: yupResolver(filterModalSchema),
  })

  // Resetando a escolha dos Filtros //
  async function handleResetFilters() {
    reset({
      is_new: true,
      accept_trade: false,
      payment_methods: [],
    })
    setFiltersSelected({} as FiltersDTO)
    setShowModal(false)
  }

  // Mapeando os Meios de Pagamento dos Checkbox //
  const PaymentOptions = paymentMethods.map((payment) => {
    return { title: payment.name, value: payment.key }
  })

  // Função de Setagem dos Filtros do Modal //
  async function handleSetModalFilters({
    is_new,
    accept_trade,
    payment_methods,
  }: ModalFormDataProps) {
    setFiltersSelected({
      is_new,
      accept_trade,
      payment_methods,
    })

    setShowModal(false)
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

          <Controller
            control={control}
            name="is_new"
            render={({ field: { onChange, value } }) => (
              <Radio.Group
                name="is_new"
                accessibilityLabel="Estado do Item"
                value={value.toString()}
                onChange={onChange}
              >
                <HStack space="5">
                  <Radio colorScheme="blue" value="true" my={1}>
                    Novo
                  </Radio>
                  <Radio colorScheme="blue" value="false" my={1} marginLeft={5}>
                    Usado
                  </Radio>
                </HStack>
              </Radio.Group>
            )}
          />
        </VStack>

        <VStack alignItems="flex-start">
          <Text fontSize="sm" fontWeight="bold">
            Aceita troca?
          </Text>

          <Controller
            control={control}
            name="accept_trade"
            render={({ field: { onChange, value } }) => (
              <Switch
                justifyContent="center"
                alignItems={'center'}
                offTrackColor="gray.300"
                thumbColor="white"
                onTrackColor="blue.400"
                alignSelf={'flex-start'}
                size={'lg'}
                mt={0}
                mb={0}
                onToggle={() => onChange(!value)}
                value={value}
              />
            )}
          />
        </VStack>

        <VStack space={2}>
          <HStack alignItems="baseline">
            <Heading fontSize="sm" fontFamily={'heading'}>
              Meios de pagamento aceitos
            </Heading>
          </HStack>

          <Controller
            control={control}
            name="payment_methods"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                options={PaymentOptions}
                value={value as string[]}
                onChange={onChange}
              />
            )}
          />
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
            onPress={handleSubmit(handleSetModalFilters)}
          />
        </HStack>
      </VStack>
    </Modal>
  )
}
