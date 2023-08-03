/* eslint-disable jsx-a11y/alt-text */
import { Image, IImageProps } from 'native-base'

type Props = IImageProps & {
  size: number
}

export function ProductPhoto({ size, ...rest }: Props) {
  return <Image w={size} h={size} rounded={6} {...rest} />
}
