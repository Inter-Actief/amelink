<template>
    <div class="grid grid-cols-4 grid-rows-2 gap-12 pb-12">
        <RouterLink :to="{ name: 'activities' }">
            <div class="relative">
                <img class="format rounded-lg w-full h-auto" src="/images/ia-placeholder.png" />
                <div
                    class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-purple-800">
                    <p class="text-3xl">{{ $gettext('Activities') }}</p>
                </div>
            </div>
        </RouterLink>
        <RouterLink :to="{ name: 'news' }">
            <div class="relative">
                <img class="format rounded-lg w-full h-auto" src="/images/ia-placeholder.png" />
                <div
                    class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-purple-800">
                    <p class="text-3xl">{{ $gettext('News') }}</p>
                </div>
            </div>
        </RouterLink>
        <RouterLink :to="{ name: 'education' }">
            <div class="relative col-start-2 row-start-2">
                <img class="format rounded-lg w-full h-auto" src="/images/ia-placeholder.png" />
                <div
                    class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-purple-800">
                    <p class="text-3xl">{{ $gettext('Education') }}</p>
                </div>
            </div>
        </RouterLink>
        <RouterLink :to="{ name: 'home' }">
            <div class="relative col-start-1 row-start-2">
                <img class="format rounded-lg w-full h-auto" src="/images/ia-placeholder.png" />
                <div
                    class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-purple-800">
                    <p class="text-3xl">{{ $gettext('Companies') }}</p>
                </div>
            </div>
        </RouterLink>
        <div class="col-span-2 row-span-2 col-start-3 row-start-1">
            <SectionCard name="Info" max-height>
                <template #content>
                    Content!
                </template>
            </SectionCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import SectionCard from '../ui/SectionCard.vue';
</script>

<style scoped lang="scss"></style>
