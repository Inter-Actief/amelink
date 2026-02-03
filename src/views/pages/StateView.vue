<template>
  <div>
    User:
    {{ store.user }}
  </div>
</template>

<script lang="ts" setup>
import { useOidcStore } from '@/stores/oidcStore';
const store = useOidcStore()
</script>

<style>

</style>