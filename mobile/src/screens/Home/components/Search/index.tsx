import { Flex, Text, VStack, useTheme } from 'native-base'

import { Input } from '@components/Input'

import { Feather } from '@expo/vector-icons'

export function Search() {
  // Cores direto do Tema //
  const { colors } = useTheme()

  // Abrindo Modal do Filter //
  async function handleOpenModal() {
    console.log('BOTÃO DO FILTRO => ABRIU O MODAL')
  }

  return (
    <VStack px={6} mt={8}>
      <Text mb={3}>Compre produtos variados</Text>
      <Input
        placeholder="Buscar anúncio"
        InputRightElement={
          <Flex direction="row" align="center" mr={4}>
            <Feather name={'search'} size={20} color={colors.gray['600']} />

            <Text fontSize="xl" mx={2} color="gray.300">
              |
            </Text>

            <Feather
              name={'sliders'}
              size={20}
              color={colors.gray['600']}
              onPress={handleOpenModal}
            />
          </Flex>
        }
      />
    </VStack>
  )
}
