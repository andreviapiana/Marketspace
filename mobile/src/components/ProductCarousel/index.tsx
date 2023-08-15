import { Box, Center, FlatList, Image, Text } from 'native-base'

import { ProductImageDTO } from '@dtos/ProductImageDTO'

import { Dimensions } from 'react-native'

type CarouselProps = {
  isAdDisabled?: boolean
  productImages?: ProductImageDTO[]
}

const carouselItems = [
  {
    uri: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
  },
  {
    uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
]

export function ProductCarousel({
  isAdDisabled,
  productImages,
}: CarouselProps) {
  return (
    <Center>
      <FlatList
        data={productImages || carouselItems}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.uri}
        renderItem={({ item, index }) => (
          <Box>
            <Image
              key={index}
              source={{
                uri: item.uri,
                /* ? item.uri
                  : `${api.defaults.baseURL}/images/${item.path}`, */
              }}
              resizeMode="cover"
              style={{
                width: Dimensions.get('window').width,
                height: 280,
              }}
              alt="Imagem do produto"
            />
          </Box>
        )}
      />
      {isAdDisabled && (
        <Center
          backgroundColor={'rgba(0,0,0,0.5)'}
          zIndex={999}
          width={Dimensions.get('window').width}
          height={280}
          position={'absolute'}
        >
          <Text
            fontSize={'sm'}
            color={'gray.100'}
            position={'absolute'}
            fontWeight={'bold'}
          >
            ANÚNCIO DESATIVADO
          </Text>
        </Center>
      )}
    </Center>
  )
}
