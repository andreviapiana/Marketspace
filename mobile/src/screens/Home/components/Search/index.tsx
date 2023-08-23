import {
  Flex,
  Pressable,
  Spinner,
  Text,
  VStack,
  useTheme,
  useToast,
} from 'native-base'

import { Feather } from '@expo/vector-icons'

import { Input } from '@components/Input'

import { useState } from 'react'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ProductDTO } from '@dtos/ProductDTO'

type SearchProps = {
  setProducts: (value: ProductDTO[]) => void
  setShowModal: (value: boolean) => void
}

export function Search({ setShowModal, setProducts }: SearchProps) {
  // Cores direto do Tema //
  const { colors } = useTheme()

  // Loading //
  const [isSearching, setIsSearching] = useState(false)

  // Toast //
  const toast = useToast()

  // Armazenando o Search //
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch da Busca //
  async function handleSearch() {
    try {
      setIsSearching(true)
      const response = await api.get(`/products?query=${searchTerm}`)
      setSearchTerm('')
      setProducts(response.data)
    } catch (error) {
      toast.show({
        title:
          error instanceof AppError
            ? error.message
            : 'Nenhum item correspondente à pesquisa foi encontrado.',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <VStack px={6} mt={8}>
      <Text mb={3}>Compre produtos variados</Text>
      <Input
        placeholder="Buscar anúncio"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
        InputRightElement={
          <Flex direction="row" align="center" mr={4}>
            {isSearching ? (
              <Spinner color="blue.500" size="sm" />
            ) : (
              <Feather
                name={'search'}
                size={20}
                color={colors.gray['600']}
                onPress={handleSearch}
              />
            )}

            <Text fontSize="xl" mx={2} color="gray.300">
              |
            </Text>

            <Pressable
              alignItems="center"
              _pressed={{ opacity: 0.8 }}
              onPress={() => setShowModal(true)}
            >
              <Feather name={'sliders'} size={20} color={colors.gray['600']} />
            </Pressable>
          </Flex>
        }
      />
    </VStack>
  )
}
