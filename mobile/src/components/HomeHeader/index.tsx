import { Heading, HStack, Text, VStack } from 'native-base'

import { UserPhoto } from '@components/UserPhoto'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

export function HomeHeader() {
  // Navegando para a tela de Edição //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function handleEditProduct() {
    navigation.navigate('newandedit')
  }

  return (
    <HStack bg="gray.200" px={6} mb={8} alignItems="center">
      <UserPhoto
        source={{ uri: 'https://github.com/andreviapiana.png' }}
        size={45}
        alt="Imagem do usuário"
        mr={4}
      />

      <VStack flex={1} marginRight={2}>
        <Text color="gray.700" fontSize="md">
          Boas vindas,
        </Text>

        <Heading color="gray.700" fontSize="md" fontWeight={'bold'}>
          André!
        </Heading>
      </VStack>

      <Button
        title={'Criar anúncio'}
        variant={'secondary'}
        icon="plus"
        size={'small'}
        onPress={handleEditProduct}
      />
    </HStack>
  )
}
