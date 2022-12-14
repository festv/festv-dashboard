import { useState } from "react"
// import SignUpForm from "components/signup-form"
import { Stepper, TextInput, PasswordInput, Button, Group, Box, Progress, Text, Center, Container, Paper, Title, Anchor } from "@mantine/core";
import { DateRangePicker } from '@mantine/dates'
// import { DateRangePickerValue } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useInputState } from "@mantine/hooks";
import { IconCheck, IconX } from '@tabler/icons';
import { Link } from "react-router-dom";

const PasswordRequirement = ({ meets, label }) => {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size={14} stroke={1.5} /> : <IconX size={14} stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const pwdReq = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

const getStrength = (password) => {
  let multiplier = password.length > 5 ? 0 : 1;
  pwdReq.forEach((requirement) => requirement.re.test(password) ? null : multiplier += 1);
  return Math.max(100 - (100 / (pwdReq.length + 1)) * multiplier, 0);
}

const Register = () => {
  const [active, setActive] = useState(0);
  const [dates, setDates] = useState([new Date(), new Date().setDate(new Date().getDate()+2)])
  const [pwd, setPwd] = useInputState('');
  const strength = getStrength(pwd);
  const checks = pwdReq.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(pwd)} />
  ));
  const bars = Array(4).fill(0).map((_, index) => (
    <Progress
      styles={{ bar: { transitionDuration: '0ms' } }}
      value={pwd.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0}
      color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
      key={index}
      size={4}
    />
  ));
  const userForm = useForm({
    initialValues: {
      email: "",
      name: "",
      pwd: "",
      cpwd: "",
    },
    validate: {
      name: (value) => value.length > 0 ? null : "Name cannot be empty",
      email: (value) => /^\S+@\S+$/.test(value) ? null : 'Invalid email',
      cpwd: (value) => value !== pwd ? "Passcodes don't match" : null
    }
  })
  const festForm = useForm({
    initialValues: {
      festName: "",
      dates: dates,
    }
  })
  const handleUserFormSubmit = (e) => {
    e.preventDefault()
    let fv = userForm.validate()
    if (!fv.hasErrors) {nextStep()}
  }
  const handleFestFormSubmit = (e) => {
    e.preventDefault();
    let fv = festForm.validate();
    if (!fv.hasErrors) {nextStep()}
  }
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <Container my={30}>
      <Title
        align="center"
        sx={ (theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 }) }
      >
        Hey there! Welcome
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={ 5 }>
        Already have an account?{ ' ' }
        <Anchor component="span" size="sm">
          <Link to="/login" style={{color:"inherit",textDecoration: "inherit"}}>
            Login
          </Link>
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" px={100} py={50} mt={30} radius="md">
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Sign Up" description="Enter your details" allowStepClick={active>0}>
            <form onSubmit={handleUserFormSubmit}>
              <TextInput mt={10} label="Name" radius="xl" placeholder='Your Name' {...userForm.getInputProps('name')} />
              <TextInput mt={10} label="Email" radius="xl" placeholder='Your Email' {...userForm.getInputProps('email')} />
              <PasswordInput mt={10} onChange={setPwd} radius="xl" label="Passcode" placeholder='Enter passcode'  />
              <Group spacing={5} grow mt="xs" mb="md">
                {bars}
              </Group>
              <PasswordRequirement label="Has at least 6 characters" meets={pwd.length > 5} />
              {checks}
              <PasswordInput mt={10} label="Confirm Passcode" radius="xl" {...userForm.getInputProps('cpwd')} />
              <Group position="center" mt="xl">
                <Button variant="filled" radius="xl" uppercase onClick={prevStep}>Previous</Button>
                <Button variant="filled" radius="xl" uppercase type='submit'>Next</Button>
              </Group>
            </form>
          </Stepper.Step>
          <Stepper.Step label="Register Fest" description="Enter the fest details" allowStepSelect={active>1}>
            <form onSubmit={handleFestFormSubmit}>
              <TextInput radius="xl" mt={10} label="Name for the fest" placeholder="Fest name" {...festForm.getInputProps('festName')} />
              <DateRangePicker radius="xl" firstDayOfWeek="sunday" label="When is this fest happening?" mt={10} value={dates} onChange={setDates} {...festForm.getInputProps('dates')} />
              <Group position="center" mt="xl">
                <Button variant="filled" radius="xl" uppercase onClick={prevStep}>Previous</Button>
                <Button variant="filled" radius="xl" uppercase type='submit'>Next</Button>
              </Group>
            </form>
          </Stepper.Step>
        </Stepper>
      </Paper>
    </Container>
  )
}

export default Register