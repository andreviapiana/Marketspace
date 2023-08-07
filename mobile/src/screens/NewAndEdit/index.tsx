import {
  Checkbox,
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
import { useNavigation } from '@react-navigation/native'
import { Input } from '@components/Input'
import { TextArea } from '@components/TextArea'
import { useState } from 'react'
import { Button } from '@components/Button'

import * as ImagePicker from 'expo-image-picker'
import uuid from 'react-native-uuid'
import { ProductPhoto } from '@components/ProductPhoto'
import { Controller, useForm } from 'react-hook-form'
import { CreateProductDTO } from '@dtos/CreateProductDTO'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const newAndEditSchema = yup.object({
  name: yup.string().required('Informe o nome').min(2, 'O nome é muito curto.'),
  description: yup
    .string()
    .required('Informe a descrição')
    .min(3, 'A descrição é muito curta.'),
  price: yup.string().required('Informe o preço de venda'),
})

const PHOTO_SIZE = 100

export interface ProductImageProps {
  name: string
  uri: string
  type: string
}

type FormDataProps = {
  name: string
  description: string
  price: string
}

export function NewAndEdit() {
  // Navegando de volta p/ a tela Anterior //
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  // Armazenando o valor do seletor do estado do item (Radio) //
  const [isNew, setIsNew] = useState<boolean>(true)

  // Armazenando o valor do slider de Troca do Produto //
  const [acceptTrade, setAcceptTrade] = useState(false)

  // Valor dos Checkbox de Método de Pagamento do Produto //
  const [paymentMethods, setPaymentMethods] = useState([])

  // Armazenando os Inputs //
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
    },
    resolver: yupResolver(newAndEditSchema),
  })

  // Armazenando as Imagens //
  const [images, setImages] = useState<ProductImageProps[]>([])

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

  function handleRemovePhoto(photo: ProductImageProps) {
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

  // Atualizando o State dos Meios de Pagamento com os campos Selecionados //
  function handleOnChangeFilter(change: Partial<CreateProductDTO>) {
    setPaymentMethods((prevFilter) => ({
      ...prevFilter,
      ...change,
    }))
  }

  // Função de Ir para o Preview //
  function handleGoToPreview({ name, description, price }: FormDataProps) {
    if (images.length === 0) {
      return toast.show({
        title: 'Selecione ao menos uma imagem!',
        placement: 'top',
        bgColor: 'red.500',
      })
    }

    if (paymentMethods.length === 0) {
      return toast.show({
        title: 'Selecione ao menos um meio de pagamento!',
        placement: 'top',
        bgColor: 'red.500',
      })
    }
    console.log(
      'INPUT DO NOME =>',
      name,
      'INPUT DA DESCRIÇÃO =>',
      description,
      'INPUT DO PREÇO =>',
      price,
      'ESTADO DO ITEM =>',
      isNew,
      'ACEITA TROCA =>',
      acceptTrade,
      'FORMA DE PAGAMENTO =>',
      paymentMethods,
      'IMAGENS =>',
      images,
    )
    navigation.navigate('product', {
      name,
      description,
      price,
      isNew,
      acceptTrade,
      paymentMethods,
      images,
    })
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

          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="Estado do item"
            direction={'row'}
            alignItems={'center'}
            value={isNew ? 'new' : 'used'}
            onChange={(nextValue) => {
              // eslint-disable-next-line no-unneeded-ternary
              setIsNew(nextValue === 'new' ? true : false)
            }}
          >
            <Radio value="new" my={1} size="md" fontFamily={'body'}>
              Produto novo
            </Radio>
            <Radio value="used" my={1} size="md" marginLeft={5}>
              Produto usado
            </Radio>
          </Radio.Group>
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

          <Switch
            offTrackColor="gray.300"
            thumbColor="white"
            onTrackColor="blue.400"
            alignSelf={'flex-start'}
            size={'lg'}
            mt={0}
            mb={0}
            isChecked={acceptTrade}
            onToggle={setAcceptTrade}
            value={acceptTrade}
          />

          <HStack alignItems="baseline">
            <Heading fontSize="sm" fontFamily={'heading'}>
              Meios de pagamento aceitos
            </Heading>
          </HStack>

          <Checkbox.Group
            colorScheme="blue"
            accessibilityLabel="pick an item"
            onChange={(value) =>
              handleOnChangeFilter({ payment_methods: value })
            }
          >
            <Checkbox
              value="boleto"
              my="1"
              _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
            >
              Boleto
            </Checkbox>

            <Checkbox
              value="pix"
              my="1"
              _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
            >
              Pix
            </Checkbox>

            <Checkbox
              value="cash"
              my="1"
              _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
            >
              Dinheiro
            </Checkbox>

            <Checkbox
              value="card"
              my="1"
              _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
            >
              Cartão de Crédito
            </Checkbox>

            <Checkbox
              value="deposit"
              my="1"
              _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
            >
              Depósito Bancário
            </Checkbox>
          </Checkbox.Group>
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
          <Button flex={1} title={'Cancelar'} variant={'primary'} />
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
