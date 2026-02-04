<template>
  <div>
    User: <br />
    {{ store.user }}
    <br />
    <br />

    Backend login: <br />
    {{ result }}
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@/composables/queries';
import { useOidcStore } from '@/stores/oidcStore';
const store = useOidcStore()
const { result } = useQuery('currentUser', {})
</script>

<style>

</style>