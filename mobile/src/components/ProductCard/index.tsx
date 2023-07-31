import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Box, Heading, Image, Text, VStack, View } from 'native-base'

import LuminariaImg from '@assets/luminaria.png'

import { UserPhoto } from '@components/UserPhoto'
import { ProductTag } from '@components/ProductTag'

type Props = TouchableOpacityProps & {
  isAdDisabled?: boolean
  hideUserAvatar?: boolean
}

export function ProductCard({ isAdDisabled, hideUserAvatar, ...rest }: Props) {
  const is_new = true

  return (
    <TouchableOpacity {...rest}>
      <VStack mb={6} position={'relative'}>
        {!hideUserAvatar && (
          <UserPhoto
            size={6}
            source={{ uri: 'https://github.com/andreviapiana.png' }}
            alt="Imagem do usuário"
            position={'absolute'}
            top={1}
            left={1}
            zIndex={10}
            borderColor="gray.100"
            borderWidth={1}
          />
        )}
        <View position={'absolute'} top={1} right={1} zIndex={10}>
          <ProductTag is_new={is_new} />
        </View>
        <Image
          source={LuminariaImg}
          alt="Imagem do produto"
          w={154}
          h={100}
          rounded="md"
          resizeMode="center"
        />

        {isAdDisabled && (
          <Box
            backgroundColor={'rgba(0,0,0,0.5)'}
            zIndex={999}
            w={154}
            h={100}
            rounded="md"
            position={'absolute'}
          >
            <Text
              fontSize={11}
              color={'gray.100'}
              position={'absolute'}
              bottom={1}
              left={2}
              fontWeight={'bold'}
            >
              ANÚNCIO DESATIVADO
            </Text>
          </Box>
        )}

        <Text
          fontSize="sm"
          color={isAdDisabled ? 'gray.400' : 'gray.600'}
          mt={1}
          numberOfLines={2}
        >
          Luminária pendente
        </Text>

        <Heading
          fontSize="md"
          color={isAdDisabled ? 'gray.400' : 'gray.700'}
          fontFamily={'heading'}
        >
          <Text fontSize={'xs'}>R$&nbsp;</Text>
          59,90
        </Heading>
      </VStack>
    </TouchableOpacity>
  )
}
