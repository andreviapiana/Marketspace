import { FlatList } from 'native-base'

import { ProductCard } from '@components/ProductCard'
import { EmptyList } from '@components/EmptyList'

import { ProductDTO } from '@dtos/ProductDTO'
import { Loading } from '@components/Loading'

type ProductListProps = {
  products: ProductDTO[]
  isLoading: boolean
}

export function ProductList({ products, isLoading }: ProductListProps) {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
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
      )}
    </>
  )
}
