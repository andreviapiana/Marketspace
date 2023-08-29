import { HStack } from 'native-base'

import { Button } from '@components/Button'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

type PreviewFooterProps = {
  isLoading: boolean
  onPress: () => void
  id: string
}

export function PreviewFooter({ isLoading, onPress, id }: PreviewFooterProps) {
  // Navegando de volta p/ a tela Anterior //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  // Navegando de volta para a tela de Edição //
  async function handleEditProduct() {
    navigation.navigate('newandedit', { mode: 'edit', id })
  }
  return (
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
      <Button
        flex={1}
        title={'Voltar e editar'}
        variant={'primary'}
        icon="arrow-left"
        onPress={handleEditProduct}
      />
      <Button
        flex={1}
        title={'Publicar'}
        icon="tag-outline"
        onPress={onPress}
        isLoading={isLoading}
      />
    </HStack>
  )
}
