import { TextInput, PasswordInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

function Signup() {
  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 8 ? null : 'Password should contain at least 8 characters'),
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
      const response = await fetch('/api/signup', options);
      console.log(await response.status);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <h1>Signup</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Username"
          placeholder="Username"
          {...form.getInputProps('username')}
        />
        <TextInput
          required
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          required
          label="Confirm Password"
          placeholder="Confirm Password"
          {...form.getInputProps('confirmPassword')}
        />
        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default Signup;