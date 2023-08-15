import { PaymentMethodsDTO } from '@dtos/PaymentMethodsDTO'
import { Checkbox } from 'native-base'

type PaymentsCheckboxProps = {
  options: PaymentMethodsDTO[]
  onChange: (value: boolean) => void
  accessibilityLabel: string
}

export function PaymentsCheckbox({ options, ...rest }: PaymentsCheckboxProps) {
  return (
    <Checkbox.Group {...rest}>
      {options.map((option) => (
        <Checkbox
          key={option.key}
          value={option.key}
          my="1"
          _checked={{ bg: 'blue.400', borderColor: 'blue.400' }}
        >
          {option.name}
        </Checkbox>
      ))}
    </Checkbox.Group>
  )
}
