/* eslint-disable jsx-a11y/alt-text */
import { Image, IImageProps } from 'native-base'

type Props = IImageProps & {
  size: number
}

export function UserPhoto({ size, ...rest }: Props) {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="blue.400"
      {...rest}
    />
  )
}
