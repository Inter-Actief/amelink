<template>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RouterLink :to="{ name: 'activities' }">
                <div class="relative">
                    <img class="format rounded-lg w-full h-auto" src="/images/ia-placeholder.png" />
                    <div
                        class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-purple-800">
                        <p class="text-2xl md:text-2xl lg:text-3xl">{{ $gettext('Activities') }}</p>
                    </div>
                </div>
            </RouterLink>
            <RouterLink :to="{ name: 'news' }">
                <div class="relative">
                    <img class="format rounded-lg w-full h-auto" src="/images/ia-placeholder.png" />
                    <div
                        class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-purple-800">
                        <p class="text-2xl md:text-2xl lg:text-3xl">{{ $gettext('News') }}</p>
                    </div>
                </div>
            </RouterLink>
            <RouterLink :to="{ name: 'education' }" class="md:order-4 lg:col-start-2 lg:row-start-2 lg:order-none">
                <div class="relative">
                    <img class="format rounded-lg w-full h-auto" src="/images/ia-placeholder.png" />
                    <div
                        class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-purple-800">
                        <p class="text-2xl md:text-2xl lg:text-3xl">{{ $gettext('Education') }}</p>
                    </div>
                </div>
            </RouterLink>
            <RouterLink :to="{ name: 'home' }" class="md:order-3 lg:col-start-1 lg:row-start-2 lg:order-none">
                <div class="relative">
                    <img class="format rounded-lg w-full h-auto" src="/images/ia-placeholder.png" />
                    <div
                        class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-purple-800">
                        <p class="text-2xl md:text-2xl lg:text-3xl">{{ $gettext('Companies') }}</p>
                    </div>
                </div>
            </RouterLink>
        </div>
        <!-- DynamicContent -->
        <SectionCard :name="$gettext('Current items')" max-height>
            <template #content>
                <DynamicContent />
            </template>
        </SectionCard>
    </div>
</template>

<script setup lang="ts">
import SectionCard from '../ui/SectionCard.vue';
import DynamicContent from './DynamicContent.vue';
</script>

<style scoped></style>
