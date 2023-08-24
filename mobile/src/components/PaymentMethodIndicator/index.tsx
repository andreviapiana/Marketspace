import { HStack, Heading, VStack, Icon, Text } from 'native-base'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { PaymentMethodsDTO } from '@dtos/PaymentMethodsDTO'

type PaymentMethodIndicatorProps = {
  payment_methods: PaymentMethodsDTO[]
}

export function PaymentMethodIndicator({
  payment_methods,
}: PaymentMethodIndicatorProps) {
  // Opções de Pagamento a serem Mapeadas //
  function paymentMethodIndicator(paymentMethod: string) {
    switch (paymentMethod) {
      case 'boleto':
        return (
          <HStack mt={2}>
            <Icon
              as={Ionicons}
              name="barcode-outline"
              size={'md'}
              alignItems={'center'}
            />
            <Text ml={2}>Boleto</Text>
          </HStack>
        )
      case 'pix':
        return (
          <HStack mt={2}>
            <Icon
              as={FontAwesome}
              name="qrcode"
              size={'md'}
              alignItems={'center'}
            />
            <Text ml={2}>Pix</Text>
          </HStack>
        )
      case 'deposit':
        return (
          <HStack mt={2}>
            <Icon
              as={FontAwesome}
              name="bank"
              size={'md'}
              alignItems={'center'}
            />
            <Text ml={2}>Depósito Bancário</Text>
          </HStack>
        )
      case 'cash':
        return (
          <HStack mt={2}>
            <Icon
              as={FontAwesome}
              name="money"
              size={'md'}
              alignItems={'center'}
            />
            <Text ml={2}>Dinheiro</Text>
          </HStack>
        )
      case 'card':
        return (
          <HStack mt={2}>
            <Icon
              as={FontAwesome}
              name="credit-card"
              size={'md'}
              alignItems={'center'}
            />
            <Text ml={2}>Cartão de Crédito</Text>
          </HStack>
        )

      default:
        break
    }
  }
  return (
    <VStack mb={6}>
      <Heading fontFamily={'heading'} fontSize={'sm'}>
        Meios de pagamento:
      </Heading>
      {payment_methods?.map((item) => (
        <HStack key={item.key} mt="1">
          {paymentMethodIndicator(item.key)}
        </HStack>
      ))}
    </VStack>
  )
}
