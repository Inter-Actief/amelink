<template>
  <div>
    <template v-if="!loading && result">
        <template v-if="result.pinnedNews?.totalCount! > 0">
            <!-- Pinned news -->
             {{ result.pinnedNews?.results! }}
        </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@/composables/queries';

const today = new Date()
const weekAgo = new Date(today)
weekAgo.setDate(today.getDate() - 7)

const { result, loading } = useQuery('dynamicContent', {
    today: today.toISOString(),
    recency: weekAgo.toISOString()
})


</script>

<style>

</style>