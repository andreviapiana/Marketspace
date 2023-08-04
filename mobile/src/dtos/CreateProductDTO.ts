export type CreateProductDTO = {
  product_name: string | null
  description: string | null
  price: number | null
  is_new: boolean | null
  accept_trade: boolean | null
  payment_methods: string[]
}
