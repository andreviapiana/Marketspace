import { VStack, Center, Heading, Text } from 'native-base'

export function PreviewHeader() {
  return (
    <VStack>
      <Center
        justifyContent={'center'}
        backgroundColor={'blue.400'}
        pt={16}
        pb={4}
      >
        <Heading fontFamily={'heading'} fontSize={'md'} color={'gray.100'}>
          Pré visualização do anúncio
        </Heading>
        <Text color={'gray.100'}>É assim que seu produto vai aparecer!</Text>
      </Center>
    </VStack>
  )
}
