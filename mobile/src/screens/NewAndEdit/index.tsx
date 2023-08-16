import {
  FlatList,
  HStack,
  Heading,
  Icon,
  IconButton,
  Pressable,
  Radio,
  ScrollView,
  Skeleton,
  Switch,
  Text,
  VStack,
  useToast,
} from 'native-base'

import { Feather } from '@expo/vector-icons'

import { Input } from '@components/Input'
import { TextArea } from '@components/TextArea'
import { Button } from '@components/Button'
import { ProductPhoto } from '@components/ProductPhoto'
import { PaymentsCheckbox } from './components/PaymentsCheckbox'

import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import * as ImagePicker from 'expo-image-picker'
import uuid from 'react-native-uuid'

import { Controller, useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { ProductImageDTO } from '@dtos/ProductImageDTO'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const newAndEditSchema = yup.object({
  name: yup.string().required('Informe o nome').min(2, 'O nome é muito curto.'),
  description: yup
    .string()
    .required('Informe a descrição')
    .min(3, 'A descrição é muito curta.'),
  price: yup.number().required('Informe o preço de venda'),
  is_new: yup.boolean().required(),
  accept_trade: yup.boolean().required(),
  payment_methods: yup
    .array()
    .of(yup.string())
    .min(1, 'Selecione um meio de pagamento.')
    .required('Selecione um meio de pagamento.'),
})

type FormDataProps = yup.InferType<typeof newAndEditSchema>

const PHOTO_SIZE = 100

export function NewAndEdit() {
  // Navegando de volta p/ a tela Anterior //
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  function handleGoBack() {
    handleResetFormAndImages()
    navigation.goBack()
  }

  // Armazenando os Inputs //
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: '',
      description: '',
      is_new: true,
      accept_trade: false,
      payment_methods: [],
    },
    resolver: yupResolver(newAndEditSchema),
  })

  // Armazenando as Imagens //
  const [images, setImages] = useState<ProductImageDTO[]>([])

  // Loading nas Fotos //
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  // Armazenando imagens a serem deletadas //
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

  // Notificação Toast //
  const toast = useToast()

  // Image Picker //
  async function handlePhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) return

      if (photoSelected.assets[0].uri) {
        const fileExtension = photoSelected.assets[0].uri.split('.').pop()

        const photoFile = {
          name: `${String(uuid.v4())}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any

        setImages((prev) => [photoFile, ...prev])
      }
    } catch (error) {
      if (error) {
        return toast.show({
          title: 'Não foi possível utilizar a foto. Tente novamente.',
          placement: 'top',
          bgColor: 'red.500',
        })
      }
    } finally {
      setPhotoIsLoading(false)
    }
  }

  function handleRemovePhoto(photo: ProductImageDTO) {
    setImages((prev) =>
      prev.filter((item) => {
        if (
          item.name === photo.name /* &&
          photo.uri.match(`${api.defaults.baseURL}/images/`) */
        ) {
          setImagesToDelete((prev) => [...prev, photo.name])
        }
        return item.name !== photo.name
      }),
    )
  }

  // Função de Ir para o Preview //
  function handleGoToPreview({
    name,
    description,
    price,
    is_new,
    accept_trade,
    payment_methods,
  }: FormDataProps) {
    if (images.length === 0) {
      return toast.show({
        title: 'Selecione ao menos uma imagem!',
        placement: 'top',
        bgColor: 'red.500',
      })
    }

    if (payment_methods.length === 0) {
      return toast.show({
        title: 'Selecione ao menos um meio de pagamento!',
        placement: 'top',
        bgColor: 'red.500',
      })
    }

    navigation.navigate('preview', {
      handleResetFormAndImages,
      name,
      description,
      price,
      is_new,
      accept_trade,
      payment_methods,
      images,
    })
  }

  async function handleResetFormAndImages() {
    reset()
    setImages([])
  }

  return (
    <VStack flex={1} mt={65}>
      <HStack justifyContent={'center'}>
        <IconButton
          rounded="full"
          width={10}
          height={6}
          marginBottom={3}
          marginLeft={3}
          justifyContent={'flex-start'}
          position={'absolute'}
          left={0}
          icon={
            <Icon as={Feather} name="arrow-left" color="gray.700" size="lg" />
          }
          onPress={handleGoBack}
        />
        <Heading
          color="gray.700"
          fontSize="lg"
          fontFamily={'heading'}
          position={'relative'}
        >
          Meus anúncios
        </Heading>
      </HStack>

      <ScrollView mt={8}>
        <VStack paddingX={6}>
          <Heading
            color="gray.700"
            fontSize="md"
            fontFamily={'heading'}
            marginBottom={1}
          >
            Imagens
          </Heading>

          <Text marginBottom={4} fontSize={'sm'}>
            Escolha até 3 imagens para mostrar o quanto o seu produto é
            incrível!
          </Text>

          <FlatList
            data={images}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <VStack>
                <ProductPhoto
                  source={{ uri: item.uri }}
                  alt="Foto do produto"
                  size={PHOTO_SIZE}
                />
                <Pressable
                  w="4"
                  h="4"
                  rounded="full"
                  bg="gray.600"
                  alignItems="center"
                  justifyContent="center"
                  position="absolute"
                  top={1}
                  right={1}
                  onPress={() => handleRemovePhoto(item)}
                  _pressed={{
                    backgroundColor: 'gray.500',
                  }}
                >
                  <Icon as={Feather} name="x" color="gray.400" size="xs" />
                </Pressable>
              </VStack>
            )}
            ListHeaderComponent={
              photoIsLoading ? (
                <Skeleton
                  w={PHOTO_SIZE}
                  h={PHOTO_SIZE}
                  rounded={6}
                  startColor="gray.500"
                  endColor="gray.400"
                />
              ) : null
            }
            ListFooterComponent={
              images.length < 3 ? (
                <Pressable
                  w={100}
                  h={100}
                  rounded={6}
                  bg="gray.300"
                  alignItems="center"
                  justifyContent="center"
                  onPress={handlePhotoSelect}
                  _pressed={{
                    opacity: 0.7,
                  }}
                >
                  <Icon as={Feather} name="plus" color="gray.400" size="lg" />
                </Pressable>
              ) : null
            }
            contentContainerStyle={{
              paddingVertical: 6,
              gap: 8,
            }}
            horizontal
          />
        </VStack>

        <VStack marginBottom={8} marginTop={8} paddingX={6}>
          <Heading
            color="gray.700"
            fontSize="md"
            fontFamily={'heading'}
            marginBottom={4}
          >
            Sobre o produto
          </Heading>

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
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextArea
                placeholder="Descrição do produto"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.description?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="is_new"
            render={({ field: { onChange, value } }) => (
              <Radio.Group
                name="is_new"
                accessibilityLabel="Estado do Item"
                value={value.toString()}
                onChange={onChange}
              >
                <HStack space="5">
                  <Radio colorScheme="blue" value="true" my={1}>
                    Novo
                  </Radio>
                  <Radio colorScheme="blue" value="false" my={1} marginLeft={5}>
                    Usado
                  </Radio>
                </HStack>
              </Radio.Group>
            )}
          />
        </VStack>

        <VStack space={2} paddingX={6} paddingBottom={6}>
          <Heading fontSize="md" fontFamily={'heading'}>
            Venda
          </Heading>

          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="0,00"
                onChangeText={onChange}
                value={value ? value.toString() : ''}
                errorMessage={errors.price?.message}
                InputLeftElement={<Text marginLeft={4}>R$</Text>}
                keyboardType={'numeric'}
              />
            )}
          />

          <Heading fontSize="sm" fontFamily={'heading'}>
            Aceita troca?
          </Heading>

          <Controller
            control={control}
            name="accept_trade"
            render={({ field: { onChange, value } }) => (
              <Switch
                justifyContent="center"
                alignItems={'center'}
                offTrackColor="gray.300"
                thumbColor="white"
                onTrackColor="blue.400"
                alignSelf={'flex-start'}
                size={'lg'}
                mt={0}
                mb={0}
                onToggle={() => onChange(!value)}
                value={value}
              />
            )}
          />

          <HStack alignItems="baseline">
            <Heading fontSize="sm" fontFamily={'heading'}>
              Meios de pagamento aceitos
            </Heading>
          </HStack>

          <Controller
            control={control}
            name="payment_methods"
            render={({ field: { onChange } }) => (
              <PaymentsCheckbox
                onChange={onChange}
                accessibilityLabel="Escolha os meios de pagamento"
                options={[
                  { key: 'boleto', name: 'Boleto' },
                  { key: 'pix', name: 'Pix' },
                  { key: 'cash', name: 'Dinheiro' },
                  { key: 'card', name: 'Cartão de crédito' },
                  { key: 'deposit', name: 'Transferência bancária' },
                ]}
              />
            )}
          />
          {errors.payment_methods && (
            <Text color="#dc2626" fontSize="12">
              {errors.payment_methods.message}
            </Text>
          )}
        </VStack>

        <HStack
          justifyContent={'space-between'}
          paddingX={6}
          paddingTop={5}
          paddingBottom={7}
          alignItems={'center'}
          backgroundColor={'gray.100'}
          flex={1}
          space={3}
        >
          <Button
            flex={1}
            title={'Cancelar'}
            variant={'primary'}
            onPress={handleGoBack}
          />
          <Button
            flex={1}
            title={'Avançar'}
            variant={'secondary'}
            onPress={handleSubmit(handleGoToPreview)}
          />
        </HStack>
      </ScrollView>
    </VStack>
  )
}
