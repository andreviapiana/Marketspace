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

const PHOTO_SIZE = 88

type FormDataProps = {
  name: string
  email: string
  phone: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  phone: yup
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
})

export function SignUp() {
  // Loading no Avatar //
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

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

  // Image Picker //
  async function handleUserPhotoSelected() {
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

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  // Armazenando a Foto da Galeria //
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/andreviapiana.png',
  )

  // Armazenando os Inputs //
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })

  // Função de SignUp //
  function handleSignUp({
    name,
    email,
    phone,
    password,
    password_confirm,
  }: FormDataProps) {
    console.log({ name, email, phone, password, password_confirm })
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

          <Heading fontSize={'lg'} mb={2}>
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
                source={{ uri: userPhoto }}
                alt="Foto do usuário"
                size={88}
                mb={4}
              />
            )}
            <Pressable
              onPress={handleUserPhotoSelected}
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
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phone?.message}
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
                mb={4}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Criar e acessar"
            variant={'secondary'}
            mb={12}
            onPress={handleSubmit(handleSignUp)}
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
