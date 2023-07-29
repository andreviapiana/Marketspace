import { HStack, IPressableProps, Icon, Pressable, Text } from 'native-base'

import { Feather } from '@expo/vector-icons'

type Props = IPressableProps & {
  name: string
  value: boolean
}

export function ConditionFilter({ name, value, ...rest }: Props) {
  return (
    <Pressable
      h={28}
      mr={3}
      paddingX={4}
      paddingRight={value ? 2 : 4}
      bg="gray.300"
      rounded="full"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={value}
      _pressed={{
        bgColor: 'blue.400',
      }}
      {...rest}
    >
      <HStack alignItems={'center'} space={1.5}>
        <Text
          color={value ? 'gray.100' : 'gray.500'}
          textTransform="uppercase"
          fontSize="xs"
          fontWeight="bold"
        >
          {name}
        </Text>
        {value && (
          <Icon
            as={Feather}
            name="x"
            color="blue.400"
            size="sm"
            rounded="full"
            backgroundColor={'gray.100'}
          />
        )}
      </HStack>
    </Pressable>
  )
}
