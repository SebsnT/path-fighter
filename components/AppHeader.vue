<template>
  <header class="header">
    <h1 class="title">PathFighter</h1>
    <OptionToolbar />
  </header>
</template>

<style scoped>
.title {
  color: white;
  padding-left: 20px;
  padding-bottom: 0px;
  font-size: 20px;
}

@media (max-width: 600px) {
  .header {
    flex-direction: column;
  }

  .title {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
    padding: 0;
  }
}
</style>
