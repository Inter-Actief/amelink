<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 pb-8 md:pb-12">
        <RouterLink :to="{ name: 'activities' }">
            <div class="relative rounded-lg">
                <ImageFade :images="activityImages" :interval="10_000"/>
                <div
                    class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-blue-800">
                    <p class="text-2xl md:text-2xl lg:text-3xl">{{ $gettext('Activities') }}</p>
                </div>
            </div>
        </RouterLink>
        <RouterLink :to="{ name: 'news' }">
            <div class="relative">
                <img class="format rounded-lg w-full h-auto" src="/images/pillars/news/news0.jpg" />
                <div
                    class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-blue-800">
                    <p class="text-2xl md:text-2xl lg:text-3xl">{{ $gettext('News') }}</p>
                </div>
            </div>
        </RouterLink>
        <RouterLink :to="{ name: 'education' }" class="md:order-4 lg:col-start-2 lg:row-start-2 lg:order-none">
            <div class="relative">
                <img class="format rounded-lg w-full h-auto" src="/images/pillars/education/education0.jpg" />
                <div
                    class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-blue-800">
                    <p class="text-2xl md:text-2xl lg:text-3xl">{{ $gettext('Education') }}</p>
                </div>
            </div>
        </RouterLink>
        <RouterLink :to="{ name: 'home' }" class="md:order-3 lg:col-start-1 lg:row-start-2 lg:order-none">
            <div class="relative">
                <ImageFade :images="careerImages" :interval="10_000" />
                <div
                    class="absolute bottom-0 left-0 w-full bg-opacity-30 text-white p-4 rounded-b-lg transition duration-300 bg-slate-800 hover:bg-blue-800">
                    <p class="text-2xl md:text-2xl lg:text-3xl">{{ $gettext('Companies') }}</p>
                </div>
            </div>
        </RouterLink>
        <div
            class="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-1 md:order-5 lg:order-none">
            <SectionCard name="Info" max-height>
                <template #content>
                    Content!
                </template>
            </SectionCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import ImageFade from '../ui/ImageFade.vue';
import SectionCard from '../ui/SectionCard.vue';

function arrayToN(n: number) {
    return new Array(n).fill(null).map((_, i) => i)
}

function shuffle(arr: Array<any>) {
    return arr.sort(() => Math.random() - 0.5)
}

const activityImages = shuffle(arrayToN(5).map(x => `/images/pillars/activities/activities${x}.jpg`))
const careerImages = shuffle(arrayToN(3).map(x => `/images/pillars/career/career${x}.jpg`))
</script>

<style scoped></style>
