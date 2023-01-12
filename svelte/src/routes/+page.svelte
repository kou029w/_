<script>
  import Counter from "./Counter.svelte";
  import icon from "$lib/images/icon.svg";
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <h1>
    <picture>
      <img src={icon} alt="Welcome" />
    </picture>
  </h1>

  <Counter />
</section>
