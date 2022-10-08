import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Container sx={{display:"flex", justifyContent:"center", alignItems: 'center', flexDirection:'column', height:"100vh", width:"100vw"}}>
      <Title
        align="center"
        sx={ (theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 }) }
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={ 5 }>
        Do not have an account yet?{ ' ' }
        <Anchor size="sm">
          <Link to="/register" style={{color:"inherit",textDecoration: "inherit"}}>
            Create account
          </Link>
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={ 30 } mt={ 30 } radius="md">
        <TextInput radius="xl" label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput radius="xl" label="Password" placeholder="Your password" required mt="md" />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Anchor onClick={ (event) => event.preventDefault() } href="#" size="sm">
          Forgot password?
        </Anchor>
        </Group>
        <Button radius="xl" fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

export default Login;