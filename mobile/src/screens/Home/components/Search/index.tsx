import { Flex, Pressable, Text, VStack, useTheme } from 'native-base'

import { Feather } from '@expo/vector-icons'

import { Input } from '@components/Input'

type SearchProps = {
  setShowModal: (value: boolean) => void
}

export function Search({ setShowModal }: SearchProps) {
  // Cores direto do Tema //
  const { colors } = useTheme()

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
