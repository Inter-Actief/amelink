<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 pb-8 md:pb-12">
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
        <div
            class="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-1 lg:self-start md:order-5 lg:order-none">
            <SectionCard :name="$gettext('Current items')" max-height>
                <template #content>
                    <DynamicContent />
                </template>
            </SectionCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import SectionCard from '../ui/SectionCard.vue';
import DynamicContent from './DynamicContent.vue';
</script>

<style scoped></style>
