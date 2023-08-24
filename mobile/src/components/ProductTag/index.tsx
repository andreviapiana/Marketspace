import { Text, View } from 'native-base'

type TagProps = {
  is_new: boolean
}

export function ProductTag({ is_new }: TagProps) {
  return (
    <View
      backgroundColor={is_new ? 'blue.500' : 'gray.600'}
      px={2}
      py={0.5}
      borderRadius={999}
      alignSelf={'flex-start'}
    >
      <Text fontSize={10} color={'white'}>
        {is_new ? 'NOVO' : 'USADO'}
      </Text>
    </View>
  )
}
