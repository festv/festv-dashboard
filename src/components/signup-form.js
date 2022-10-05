import { useEffect } from 'react';
import { TextInput, PasswordInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

const SignUpForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      pwd: "",
      cpwd: "",
      tos: false,
    },
    validate: {
      email: (value) => /^\S+@\S+$/.test(value) ? null : 'Invalid email',
      cpwd: (value) => value != form.values.pwd ? "Passcodes don't match" : null
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        placeholder='Your Name'
        {...form.getInputProps('name')}
      />
      <TextInput
        label="Email"
        placeholder='Your Email'
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label="Passcode"
        placeholder='Enter passcode'
        {...form.getInputProps('pwd')}
      />
      <PasswordInput
        label="Confirm Passcode"
        {...form.getInputProps('cpwd')}
      />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default SignUpForm;