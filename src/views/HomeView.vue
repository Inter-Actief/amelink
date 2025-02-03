<script setup lang="ts">
const triggerError = () => {
    throw new Error("Hallo glitchtip!")
}
</script>

<template>
    <main>
        <button @click="triggerError()">error</button>
    </main>
</template>
