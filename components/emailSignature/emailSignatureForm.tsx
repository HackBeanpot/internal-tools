import React, { ChangeEvent, useState } from 'react'
import { SignatureData } from '../../lib/types'
import {
  Stack,
  Typography
} from '@mui/material'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { StyledTextValidator } from '../../styles/emailSignatureForm'
import { StyledButton } from '../../styles/common'

/**
 * @param setSignatureData State setter from parent component
 * @param embedded Displays a more compact version of the form when embedded is true.
 */
interface EmailSignatureFormProps {
  setSignatureData: (signatureData: SignatureData) => void
  embedded: boolean
}

export default function EmailSignatureForm (
  { setSignatureData, embedded }: EmailSignatureFormProps
): React.ReactElement {
  const [formData, setFormData] = useState<SignatureData>({
    fullName: '',
    title: '',
    phone: '',
    email: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({
      ...formData,
      [name]: value
    })

    if (embedded) {
      setSignatureData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = () => {
    setSignatureData(formData)
    setFormData({
      fullName: '',
      title: '',
      phone: '',
      email: ''
    })
  }

  const createValidatedInputField = (name: string, value: string, label: string) => (
    <StyledTextValidator
      label={label}
      onChange={handleChange}
      name={name}
      type="text"
      validators={['required']}
      errorMessages={['Required.']}
      value={value}
      size={embedded ? 'small' : 'normal'}
    />
  )

  return (
    <ValidatorForm
      onSubmit={handleSubmit}
    >
      <Stack spacing={3}>
        {!embedded && <Typography variant="h5"> Enter your info here! </Typography>}
        {createValidatedInputField('fullName', formData.fullName, 'Full name')}
        {createValidatedInputField('title', formData.title, 'Title')}
        {createValidatedInputField('phone', formData.phone, 'Phone')}
        {createValidatedInputField('email', formData.email, 'Email (@hackbeanpot.com)')}
        {!embedded && (
          <StyledButton
            size="large"
            color="info"
            variant="contained"
            type="submit"
            width="medium"
          >
            Generate signature!
          </StyledButton>
        )}
      </Stack>
    </ValidatorForm>
  )
}
