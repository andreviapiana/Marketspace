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
} from 'native-base'

import { Feather } from '@expo/vector-icons'

import { ProductCard } from '@components/ProductCard'

import { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

const PRODUCTS = [
  {
    id: '1',
    name: 'Luminária Pendente',
    description:
      'Essa é a melhor luminária do mundo. Você não vai se arrepender',
    is_new: true,
    price: '59,90',
    accept_trade: true,
    user_id: '1',
    is_active: true,
    created_at: '2022-11-14T19:31:48.662Z',
    updated_at: '2022-11-14T19:31:48.662Z',
  },
  {
    id: '2',
    name: 'Luminária Pendente',
    description:
      'Essa é a melhor luminária do mundo. Você não vai se arrepender',
    is_new: true,
    price: '29,90',
    accept_trade: true,
    user_id: '1',
    is_active: true,
    created_at: '2022-11-14T19:31:48.662Z',
    updated_at: '2022-11-14T19:31:48.662Z',
  },
  {
    id: '3',
    name: 'Luminária Pendente',
    description:
      'Essa é a melhor luminária do mundo. Você não vai se arrepender',
    is_new: true,
    price: '59,90',
    accept_trade: true,
    user_id: '1',
    is_active: true,
    created_at: '2022-11-14T19:31:48.662Z',
    updated_at: '2022-11-14T19:31:48.662Z',
  },
  {
    id: '4',
    name: 'Luminária Pendente',
    description:
      'Essa é a melhor luminária do mundo. Você não vai se arrepender',
    is_new: true,
    price: '59,90',
    accept_trade: true,
    user_id: '1',
    is_active: true,
    created_at: '2022-11-14T19:31:48.662Z',
    updated_at: '2022-11-14T19:31:48.662Z',
  },
]

export function MyAds() {
  // State inicial do Filtro dos Meus Anúncios //
  const [filter, setFilter] = useState('all')

  // Navegando para a Criação de Anúncios //
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function handleCreateNewAd() {
    console.log('BOTÃO DE CRIAÇÃO => CLICOU EM CRIAR NOVO AD')
    navigation.navigate('newandedit')
  }

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
        <Text>9 anúncios</Text>

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

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={() => <ProductCard isAdDisabled hideUserAvatar />}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          paddingBottom: 4,
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        px={6}
        mt={2}
      />
    </VStack>
  )
}
