import { HStack, Heading, VStack, Text } from 'native-base'
import { View, Linking } from 'react-native'

import { Button } from '@components/Button'

type ProductFooterProps = {
  isMyProduct: boolean
  isAdDisabled: boolean
}

export function ProductFooter({
  isMyProduct,
  isAdDisabled,
}: ProductFooterProps) {
  return (
    <View>
      {!isMyProduct ? (
        <HStack
          justifyContent={'space-between'}
          paddingX={6}
          paddingTop={5}
          paddingBottom={7}
          alignItems={'center'}
          backgroundColor={'gray.100'}
          flex={1}
        >
          <Heading fontFamily={'heading'} color={'blue.500'} fontSize={'xl'}>
            <Text fontSize={'sm'}>R$&nbsp;</Text>
            120,00
          </Heading>

          <Button
            title={'Entrar em contato'}
            icon="whatsapp"
            size={'small'}
            onPress={() =>
              Linking.canOpenURL('whatsapp://send?text=oi').then(
                (supported) => {
                  if (supported) {
                    return Linking.openURL(
                      'whatsapp://send?phone=5554999999999&text=Oi, produto disponível?',
                    )
                  } else {
                    return Linking.openURL(
                      'https://api.whatsapp.com/send?phone=5554999999999&text=Oi, produto disponível?',
                    )
                  }
                },
              )
            }
          />
        </HStack>
      ) : (
        <VStack paddingX={6} space={2} mt={2} mb={10}>
          {isAdDisabled ? (
            <Button title={'Reativar anúncio'} icon="power" />
          ) : (
            <Button
              title={'Desativar anúncio'}
              icon="power"
              variant={'secondary'}
            />
          )}
          <Button
            title={'Excluir anúncio'}
            icon="trash-can-outline"
            variant={'primary'}
          />
        </VStack>
      )}
    </View>
  )
}
