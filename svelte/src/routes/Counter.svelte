<script>
  let count = 0;
</script>

<div class="counter">
  <button on:click={() => count--}> - </button>
  <strong>{count}</strong>
  <button on:click={() => count++}> + </button>
</div>
