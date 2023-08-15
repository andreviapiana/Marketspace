import { ProductImageDTO } from './ProductImageDTO'
import { UserDTO } from './UserDTO'
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
  user: UserDTO
}
