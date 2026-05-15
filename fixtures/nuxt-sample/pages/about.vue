<script setup lang="ts">
useHead({ title: 'About — Nuxt Sample' })
</script>

<template>
  <div>
    <Header />
    <main>
      <h1>About this sample</h1>
      <p>A minimal Nuxt 3 project used as a fixture for the Project Inspector skill.</p>
      <NuxtLink to="/">Home</NuxtLink>
    </main>
  </div>
</template>
