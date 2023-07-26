import {
  Button as ButtonNativeBase,
  HStack,
  IButtonProps,
  Text,
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

type Props = IButtonProps & {
  title: string
  variant?: 'primary' | 'secondary'
  icon?: keyof typeof MaterialIcons.glyphMap
  size?: 'small' | 'large'
}

export function Button({
  title,
  variant,
  icon,
  size = 'large',
  ...rest
}: Props) {
  return (
    <ButtonNativeBase
      w={size === 'large' ? 'full' : 'auto'}
      h={'42px'}
      bg={
        variant ? (variant === 'primary' ? 'gray.300' : 'gray.700') : 'blue.400'
      }
      rounded="md"
      _pressed={{
        bg: variant
          ? variant === 'primary'
            ? 'gray.400'
            : 'gray.600'
          : 'blue.500',
      }}
      {...rest}
    >
      <HStack alignItems={'center'}>
        {icon && (
          <MaterialIcons
            name={icon}
            color={variant === 'primary' ? '#3E3A40' : '#F7F7F8'}
            size={16}
          />
        )}
        <Text
          color={variant === 'primary' ? 'gray.600' : 'gray.100'}
          fontFamily="heading"
          fontSize="sm"
          fontWeight={'bold'}
          marginLeft={icon ? 2 : 0}
        >
          {title}
        </Text>
      </HStack>
    </ButtonNativeBase>
  )
}
