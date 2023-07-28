import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Heading, Image, Text, VStack, View } from 'native-base'

import LuminariaImg from '@assets/luminaria.png'

import { UserPhoto } from '@components/UserPhoto'
import { ProductTag } from '@components/ProductTag'

type Props = TouchableOpacityProps & {}

export function ProductCard({ ...rest }: Props) {
  const is_new = true
  return (
    <TouchableOpacity {...rest}>
      <VStack mb={6} position={'relative'}>
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

        <Text fontSize="sm" color="gray.600" mt={1} numberOfLines={2}>
          Luminária pendente
        </Text>

        <Heading fontSize="md" color="gray.700" fontFamily={'heading'}>
          <Text fontSize={'xs'}>R$&nbsp;</Text>
          59,90
        </Heading>
      </VStack>
    </TouchableOpacity>
  )
}
