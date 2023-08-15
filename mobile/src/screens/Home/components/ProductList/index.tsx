import { FlatList } from 'native-base'

import { ProductCard } from '@components/ProductCard'

import { EmptyList } from '@components/EmptyList'

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

export function ProductList() {
  return (
    <FlatList
      data={PRODUCTS}
      keyExtractor={(item) => item.id}
      renderItem={() => <ProductCard />}
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{
        paddingBottom: 4,
      }}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      px={6}
      mt={2}
      ListEmptyComponent={<EmptyList />}
    />
  )
}
