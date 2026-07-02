<template>
    <template v-if="photographers && photographers.length == 1">
        <p>{{ $gettext('Pictures by') }} {{ photographers[0]! }}</p>
    </template>
    <template v-else-if="photographers && photographers.length > 1">
        <p>{{ $gettext('Pictures by') }} {{ photographers.slice(0, photographers.length - 1).join(", ") }} & {{
            photographers[photographers.length - 1] }}</p>
    </template>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    photographers?: Array<string | null | undefined>
}>(), {
    photographers: () => []
})
</script>

<style></style>
