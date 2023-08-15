import { Center, Text } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export function EmptyList() {
  return (
    <Center mt={8}>
      <MaterialCommunityIcons name={'alert-decagram-outline'} size={64} />
      <Text color="gray.500" fontSize="md" fontWeight={'bold'} mt="6" mb="2">
        Nenhum anúncio encontrado!
      </Text>
    </Center>
  )
}
