import { ProductImageDTO } from './ProductImageDTO'
import { PaymentMethodsDTO } from './PaymentMethodsDTO'

export type ProductDTO = {
  id: string
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  is_active: boolean
  product_images: ProductImageDTO[]
  payment_methods: PaymentMethodsDTO[]
  user: {
    avatar: string
    name: string
    tel: string
  }
  user_id: string
}
