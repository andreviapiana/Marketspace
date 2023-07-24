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
}

export function Button({ title, variant, icon, ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={'42px'}
      bg={
        variant ? (variant === 'primary' ? 'gray.300' : 'gray.700') : 'blue.400'
      }
      rounded="md"
      _pressed={{
        bg: variant === 'primary' ? 'gray.500' : 'blue.500',
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
