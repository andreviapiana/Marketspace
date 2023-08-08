import {
  Text,
  VStack,
  Heading,
  ScrollView,
  Pressable,
  Icon,
  Center,
  useToast,
} from 'native-base'

import LogoSvg from '@assets/logo.svg'
import LogoNameSvg from '@assets/logo_name.svg'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Controller, useForm } from 'react-hook-form'

import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'

type FormData = {
  email: string
  password: string
}

export function SignIn() {
  // useAuth //
  const { signIn } = useAuth()

  // State para Mostrar e Ocultar a Senha //
  const [show, setShow] = useState(false)

  // Navegando p/ a SignUp //
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  // Toast //
  const toast = useToast()

  // Loading //
  const [isLoading, setIsLoading] = useState(false)

  // Armazenando os Inputs //
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  // Função de SignIn //
  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })

      setIsLoading(false)
    }
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

            <Controller
              control={control}
              name="email"
              rules={{ required: 'Informe o e-mail' }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{ required: 'Informe a senha' }}
              render={({ field: { onChange } }) => (
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
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              title="Entrar"
              mt={4}
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
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
