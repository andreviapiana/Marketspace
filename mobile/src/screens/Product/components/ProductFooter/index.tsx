import { HStack, Heading, VStack } from 'native-base'
import { View, Linking } from 'react-native'

import { Button } from '@components/Button'

type ProductFooterProps = {
  isMyProduct: boolean
  isAdDisabled: boolean
  productPrice: number
  enableOrDisableAnnounce: (value: boolean) => void
  removeAnnounce: (value: boolean) => void
  isLoading: boolean
  isDeleting: boolean
}

export function ProductFooter({
  isMyProduct,
  isAdDisabled,
  productPrice,
  enableOrDisableAnnounce,
  removeAnnounce,
  isLoading,
  isDeleting,
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
            {productPrice?.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
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
            <Button
              title={'Reativar anúncio'}
              icon="power"
              onPress={() => enableOrDisableAnnounce(false)}
              isLoading={isLoading}
            />
          ) : (
            <Button
              title={'Desativar anúncio'}
              icon="power"
              variant={'secondary'}
              onPress={() => enableOrDisableAnnounce(true)}
              isLoading={isLoading}
            />
          )}
          <Button
            title={'Excluir anúncio'}
            icon="trash-can-outline"
            variant={'primary'}
            onPress={() => removeAnnounce(true)}
            isLoading={isDeleting}
          />
        </VStack>
      )}
    </View>
  )
}
