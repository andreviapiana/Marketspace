/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Text,
  VStack,
  Heading,
  ScrollView,
  Pressable,
  Center,
  Icon,
  View,
  Skeleton,
  useToast,
} from 'native-base'

import LogoSvg from '@assets/logo.svg'
import defaultUserImg from '@assets/avatar.png'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { UserPhoto } from '@components/UserPhoto'

import { useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { useNavigation } from '@react-navigation/native'

import { Controller, useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { api } from '@services/api'

import { AppError } from '@utils/AppError'

import { useAuth } from '@hooks/useAuth'

const PHOTO_SIZE = 88

type FormDataProps = {
  name: string
  email: string
  tel: string
  password: string
  password_confirm: string
}

type AvatarProps = {
  name: string
  uri: string
  type: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  tel: yup
    .string()
    .required('Informe seu telefone.')
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
      'Telefone inválido.',
    ),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere'),
})

export function SignUp() {
  // useAuth //
  const { signIn } = useAuth()

  // Loading no Avatar //
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  // Loading Geral //
  const [isLoading, setIsLoading] = useState(false)

  // Notificação Toast //
  const toast = useToast()

  // Navegando de volta p/ a SignIn //
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  // State para Mostrar e Ocultar as Senhas //
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Armazenando a Foto da Galeria //
  const [userPhoto, setUserPhoto] = useState<AvatarProps>({} as AvatarProps)

  // Image Picker //
  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
        )
        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop()

        const photoFile = {
          name: `.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any

        setUserPhoto(photoFile)
        toast.show({
          title: 'Foto selecionada!',
          placement: 'top',
          bgColor: 'green.500',
        })
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível selecionar a foto.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setPhotoIsLoading(false)
    }
  }

  // Armazenando os Inputs //
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })

  // Função de SignUp //
  async function handleSignUp({ name, email, tel, password }: FormDataProps) {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('tel', tel)
      formData.append('password', password)
      if (userPhoto.uri) {
        formData.append('avatar', userPhoto as any)
      } else {
        return toast.show({
          title: 'Por favor selecione uma imagem!',
          placement: 'top',
          bgColor: 'red.500',
        })
      }
      setIsLoading(true)
      await api.post('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={12} pb={14} pt={16}>
        <Center>
          <Center mb={3}>
            <LogoSvg width={'60px'} height={'40px'} />
          </Center>

          <Heading fontSize={'lg'} mb={2} fontFamily="heading">
            Boas vindas!
          </Heading>

          <Text color="gray.500" fontSize="sm" mb={8} textAlign={'center'}>
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </Center>

        <Center>
          <View position={'relative'}>
            {photoIsLoading ? (
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
                mb={4}
              />
            ) : (
              <UserPhoto
                source={userPhoto.uri ? { uri: userPhoto.uri } : defaultUserImg}
                alt="Foto do usuário"
                size={PHOTO_SIZE}
                mb={4}
              />
            )}
            <Pressable
              onPress={handleUserPhotoSelect}
              size={10}
              backgroundColor={'blue.400'}
              borderRadius={999}
              position={'absolute'}
              bottom={4}
              right={-8}
              justifyContent={'center'}
              alignItems={'center'}
              _pressed={{
                backgroundColor: 'blue.500',
              }}
            >
              <Icon
                as={MaterialIcons}
                name="border-color"
                size={4}
                color={'gray.200'}
              />
            </Pressable>
          </View>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="tel"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.tel?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
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
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                type={showConfirm ? 'text' : 'password'}
                InputRightElement={
                  <Pressable onPress={() => setShowConfirm(!showConfirm)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={showConfirm ? 'visibility' : 'visibility-off'}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
                placeholder="Confirmar senha"
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            variant={'secondary'}
            mb={12}
            mt={4}
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Center mb={16}>
          <Heading
            color="gray.500"
            fontSize="sm"
            mb={4}
            fontFamily="heading"
            fontWeight={'normal'}
          >
            Já tem uma conta?
          </Heading>

          <Button
            title="Ir para o login"
            variant={'primary'}
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
