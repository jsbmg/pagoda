<script context="module">
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

  const handleClick = async () => {
    const url = `http://localhost:8080/clickme`;
    const response = await fetch(url);
    console.log(response.status);
    console.log(await response.json());
  }
</script>

<script>
  export let hello;
</script>

<h1>Test</h1>
<div>This should say "Hello, World!": {hello}</div>
<button on:click={handleClick}>This should log "I was clicked"</button>