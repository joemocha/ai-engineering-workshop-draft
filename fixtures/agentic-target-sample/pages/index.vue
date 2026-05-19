<script setup lang="ts">
const { greeting } = useExample()
</script>

<template>
  <div>
    <Header />
    <main>
      <h1>{{ greeting }}</h1>
      <p>This is the home page of the Nuxt sample fixture.</p>
      <NuxtLink to="/about">About</NuxtLink>
    </main>
  </div>
</template>
