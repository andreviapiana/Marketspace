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
} from 'native-base'

import LogoSvg from '@assets/logo.svg'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { UserPhoto } from '@components/UserPhoto'

import { useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Alert } from 'react-native'

const PHOTO_SIZE = 88

export function SignUp() {
  // Loading no Avatar //
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

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
          return Alert.alert(
            'Essa imagem é muito grande. Escolha uma de até 5MB.',
          )
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

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={12} pb={14} pt={16} backgroundColor="gray.200">
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

          <Input type="text" placeholder="Nome" />

          <Input type="text" placeholder="Email" />

          <Input type="text" placeholder="Telefone" />

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
          />

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
          />

          <Button title="Criar" variant={'secondary'} mb={12} />
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

          <Button title="Ir para o login" variant={'primary'} />
        </Center>
      </VStack>
    </ScrollView>
  )
}
