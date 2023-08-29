import { HStack, Heading, Link, Text, VStack, useTheme } from 'native-base'

import { MaterialIcons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

type ActiveAdsCardProps = {
  myActiveAds: number
}

export function ActiveAdsCard({ myActiveAds }: ActiveAdsCardProps) {
  // Cores direto do Tema //
  const { colors } = useTheme()

  // Navegando p/ a tela MyAds //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const handleClickMyAds = () => {
    navigation.navigate('myads')
  }

  return (
    <VStack px={6}>
      <Text>Seus produtos anunciados para venda</Text>
      <HStack
        alignItems={'center'}
        backgroundColor={'rgba(100, 122, 199, 0.10)'}
        px={4}
        py={3}
        borderRadius={6}
        mt={3}
      >
        <Feather
          name={'tag'}
          color={colors.blue['500']}
          size={22}
          marginRight={16}
        />
        <VStack flex={1} marginRight={2}>
          <Heading
            color="gray.600"
            fontSize="lg"
            fontWeight={'bold'}
            fontFamily={'heading'}
          >
            {myActiveAds}
          </Heading>

          <Text color="gray.600" fontSize="xs">
            anúncios ativos
          </Text>
        </VStack>

        <Link marginRight={2} onPress={handleClickMyAds} alignItems={'center'}>
          <Text
            fontWeight="bold"
            fontSize={'xs'}
            color="blue.500"
            textDecoration="none"
            mr={2}
          >
            Meus anúncios
          </Text>
          <MaterialIcons
            name={'arrow-forward'}
            color={colors.blue['500']}
            size={16}
          />
        </Link>
      </HStack>
    </VStack>
  )
}
