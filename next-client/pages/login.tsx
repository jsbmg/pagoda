import { TextInput, PasswordInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

function Login() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await fetch('/api/login/password', options);
      if (response.status === 401) {
        form.setErrors({'password': 'Invalid username or password'});
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <h1>Login</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Username"
          placeholder="Username"
          {...form.getInputProps('username')}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default Login;