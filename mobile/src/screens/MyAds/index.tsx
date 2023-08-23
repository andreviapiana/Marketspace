import {
  HStack,
  Heading,
  Icon,
  IconButton,
  VStack,
  Text,
  Select,
  CheckIcon,
  FlatList,
  useToast,
} from 'native-base'

import { Feather } from '@expo/vector-icons'

import { ProductCard } from '@components/ProductCard'
import { Loading } from '@components/Loading'

import { useCallback, useState } from 'react'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { ProductDTO } from '@dtos/ProductDTO'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'

export function MyAds() {
  // State inicial do Filtro dos Meus Anúncios //
  const [filter, setFilter] = useState('all')

  // Navegando para a Criação de Anúncios //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function handleCreateNewAd() {
    navigation.navigate('newandedit')
  }

  // Loading //
  const [isLoading, setIsLoading] = useState(false)

  // Notificação Toast //
  const toast = useToast()

  // State p/ armazenar os Produtos/Anúncios //
  const [products, setProducts] = useState<ProductDTO[]>([])

  // Fetch dos Meus Produtos //
  async function fetchUserProducts() {
    try {
      setIsLoading(true)

      const { data } = await api.get(`/users/products`)

      const adsWithActiveProducts = data.filter(
        (item: ProductDTO) => item.is_active,
      )

      const adsWithInactiveProducts = data.filter(
        (item: ProductDTO) => !item.is_active,
      )

      if (filter === 'all') {
        setProducts(data)
      } else {
        setProducts(
          filter === 'active' ? adsWithActiveProducts : adsWithInactiveProducts,
        )
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi Encontrar os produtos, tente novamente mais tarde'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Disparando o Fetch //
  useFocusEffect(
    useCallback(() => {
      fetchUserProducts()
    }, [filter]),
  )

  return (
    <VStack flex={1} mt={65}>
      <HStack alignItems="center" justifyContent={'center'} paddingX={6}>
        <Heading
          color="gray.700"
          fontSize="lg"
          fontFamily={'heading'}
          position={'relative'}
        >
          Meus anúncios
        </Heading>

        <IconButton
          rounded="full"
          justifyContent={'flex-end'}
          position={'absolute'}
          right={4}
          icon={<Icon as={Feather} name="plus" color="gray.700" size="lg" />}
          onPress={handleCreateNewAd}
        />
      </HStack>

      <HStack
        mt={8}
        mb={5}
        paddingX={6}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Text>{products.length} anúncios</Text>

        <Select
          selectedValue={filter}
          height={8}
          width={120}
          px={3}
          py={2}
          accessibilityLabel="Selecione o tipo do anúncio"
          defaultValue={'all'}
          fontSize={'sm'}
          _selectedItem={{
            bg: 'blue.200',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setFilter(itemValue)}
        >
          <Select.Item label="Todos" value="all" />
          <Select.Item label="Ativos" value="active" />
          <Select.Item label="Inativos" value="inactive" />
        </Select>
      </HStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard product={item} hideUserAvatar />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 4,
          }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          px={6}
          mt={2}
        />
      )}
    </VStack>
  )
}
