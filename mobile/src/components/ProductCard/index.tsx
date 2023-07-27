import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Heading, Image, Text, VStack, View } from 'native-base'

import LuminariaImg from '@assets/luminaria.png'
import { UserPhoto } from '@components/UserPhoto'

type Props = TouchableOpacityProps & {}

export function ProductCard({ ...rest }: Props) {
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
        <View
          backgroundColor={'gray.600'}
          px={2}
          py={0.5}
          borderRadius={999}
          position={'absolute'}
          top={1}
          right={1}
          zIndex={10}
        >
          <Text fontSize={10} color={'white'}>
            USADO
          </Text>
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
