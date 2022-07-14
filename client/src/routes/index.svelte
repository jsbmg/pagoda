<script context="module">
  import { user } from './store.js';

  export async function load({ params, fetch, session, stuff }) {
    const url = `http://localhost:8080/hello`;
    const response = await fetch(url);

    return {
      status: response.status,
      props: {
        hello: response.ok && (await response.json())
      }
    };
  }
</script>

<script>
  export let hello;

  const handleClick = async (event) => {
    event.preventDefault();
    const url = `http://localhost:8080/signup`;
    const options = {
      method: 'POST',
      body: JSON.stringify($user),
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  }
</script>

<h1>Test</h1>
<div>This should say "Hello, World!": {hello}</div>
<form>
  <label>Username:
    <input type="text" bind:value={$user.username} />
  </label>
  <label>Email:
    <input type="text" bind:value={$user.email} />
  </label>
  <label>Password:
    <input type="password" bind:value={$user.password} />
  </label>
  <button on:click={handleClick}>Submit</button>
</form>



<style>
  input, label {
    display: block;
  }
</style>