export type PaymentMethodsDTO = {
  key: string
  name: string
}

export const paymentMethods = [
  {
    name: 'Boleto',
    key: 'boleto',
  },
  {
    name: 'Pix',
    key: 'pix',
  },
  {
    name: 'Dinheiro',
    key: 'cash',
  },
  {
    name: 'Cartão de Crédito',
    key: 'card',
  },
  {
    name: 'Depósito Bancário',
    key: 'deposit',
  },
]
