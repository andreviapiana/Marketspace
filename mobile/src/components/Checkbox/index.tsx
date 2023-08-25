import { HStack, Pressable, Text, VStack, Box } from 'native-base'
import { Feather } from '@expo/vector-icons'

type Option = {
  title: string
  value: string
}

type CheckboxProps = {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
}

export function Checkbox({ options, value, onChange }: CheckboxProps) {
  function handlePress(item: Option) {
    if (value?.includes(item.value)) {
      onChange(value.filter((i) => i !== item.value))
    } else {
      onChange(value.concat(item.value))
    }
  }
  return (
    <VStack>
      {options.map((item) => (
        <HStack key={item.title} alignItems={'center'}>
          <Box
            w="5"
            h="5"
            mr={3}
            mb={2}
            rounded={'xs'}
            bg={value.includes(item.value) ? 'blue.400' : 'rgba(0,0,0,0)'}
          >
            <Pressable
              w="5"
              h="5"
              justifyContent={'center'}
              alignItems={'center'}
              borderColor={value.includes(item.value) ? 'blue.400' : 'gray.400'}
              borderWidth={'2'}
              rounded={'xs'}
              onPress={() => handlePress(item)}
              style={{
                overflow: 'hidden',
              }}
            >
              {value.includes(item.value) && (
                <Feather name="check" size={14} color="white" />
              )}
            </Pressable>
          </Box>

          <Text
            mb={2}
            fontSize={'md'}
            color="gray.600"
            textTransform={'capitalize'}
          >
            {item.title}
          </Text>
        </HStack>
      ))}
    </VStack>
  )
}
