import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { VStack, HStack, IconButton, Icon } from 'native-base'

import { Feather } from '@expo/vector-icons'

type ProductHeaderProps = {
  isMyProduct: boolean
  onPress: () => void
}

export function ProductHeader({ isMyProduct, onPress }: ProductHeaderProps) {
  // Navegando de volta p/ a tela Anterior //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack>
      <HStack justifyContent={'space-between'}>
        <IconButton
          rounded="full"
          width={10}
          height={6}
          marginBottom={3}
          marginLeft={3}
          justifyContent={'flex-start'}
          icon={
            <Icon as={Feather} name="arrow-left" color="gray.700" size="lg" />
          }
          onPress={handleGoBack}
        />

        {isMyProduct && (
          <IconButton
            rounded="full"
            width={10}
            height={6}
            marginBottom={3}
            marginRight={3}
            justifyContent={'flex-start'}
            icon={<Icon as={Feather} name="edit" color="gray.700" size="md" />}
            onPress={onPress}
          />
        )}
      </HStack>
    </VStack>
  )
}
