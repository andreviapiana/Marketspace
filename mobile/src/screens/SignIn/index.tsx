import {
  Text,
  VStack,
  Heading,
  ScrollView,
  Pressable,
  Icon,
  Center,
} from 'native-base'

import LogoSvg from '@assets/logo.svg'
import LogoNameSvg from '@assets/logo_name.svg'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function SignIn() {
  // State para Mostrar e Ocultar a Senha //
  const [show, setShow] = useState(false)

  // Navegando p/ a SignUp //
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} pb={16} backgroundColor="gray.100">
        <VStack
          flex={1}
          px={12}
          pb={16}
          pt={'109px'}
          backgroundColor="gray.200"
          roundedBottom={24}
        >
          <Center>
            <Center mb={5}>
              <LogoSvg />
            </Center>

            <LogoNameSvg />

            <Text color="gray.500" fontSize="sm" mb={20}>
              Seu espaço de compra e venda
            </Text>
          </Center>

          <Center>
            <Heading
              color="gray.600"
              fontSize="sm"
              mb={4}
              fontFamily="heading"
              fontWeight={'normal'}
            >
              Acesse sua conta
            </Heading>

            <Input type="text" placeholder="Email" />

            <Input
              type={show ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? 'visibility' : 'visibility-off'}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Senha"
              mb={4}
            />

            <Button title="Entrar" />
          </Center>
        </VStack>

        <VStack pt={'56px'} px={12}>
          <Center>
            <Heading
              color="gray.500"
              fontSize="sm"
              mb={4}
              fontFamily="heading"
              fontWeight={'normal'}
            >
              Ainda não tem acesso?
            </Heading>

            <Button
              title="Criar uma conta"
              variant={'primary'}
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
