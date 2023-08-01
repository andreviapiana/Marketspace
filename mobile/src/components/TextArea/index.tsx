import {
  TextArea as NativeBaseTextArea,
  IInputProps,
  FormControl,
} from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null
}

export function TextArea({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseTextArea
        bg="gray.100"
        h={40}
        px={4}
        borderWidth={0}
        borderRadius={'md'}
        autoCompleteType={true}
        fontSize="md"
        color="gray.600"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bgColor: 'gray.100',
          borderWidth: 1,
          borderColor: 'gray.500',
        }}
        {...rest}
      />

      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
