import { Box, Center, FlatList, Image } from 'native-base'

import { Dimensions } from 'react-native'

const carouselItems = [
  {
    imgUrl:
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
]

export function ProductCarousel() {
  const active = true

  return (
    <Center>
      <FlatList
        opacity={active ? 1 : 0.6}
        data={carouselItems}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.imgUrl}
        renderItem={({ item }) => (
          <Box>
            <Image
              source={{
                uri: item.imgUrl,
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
    </Center>
  )
}
