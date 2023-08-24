import { Box, Center, FlatList, Image, Text } from 'native-base'

import { ProductImageDTO } from '@dtos/ProductImageDTO'

import { Dimensions } from 'react-native'
import { api } from '@services/api'

type CarouselProps = {
  isAdDisabled?: boolean
  productImages?: ProductImageDTO[]
}

export function ProductCarousel({
  isAdDisabled,
  productImages,
}: CarouselProps) {
  return (
    <Center>
      <FlatList
        data={productImages}
        horizontal
        pagingEnabled
        keyExtractor={(item) => (item.uri ? item.uri : item.path)}
        renderItem={({ item }) => (
          <Box>
            <Image
              key={item.name}
              source={{
                uri: item.uri
                  ? item.uri
                  : `${api.defaults.baseURL}/images/${item.path}`,
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
