<script>
  function submitForm() {
    fetch("/api/mail/sendmail");
  }
</script>

<form on:submit|preventDefault={submitForm}>
  <button type="submit">Submit</button>
</form>
