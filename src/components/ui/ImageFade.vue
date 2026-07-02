<template>
  <div class="relative overflow-hidden">
    <img
      v-if="previousImage"
      :key="'prev-' + previousImage"
      :src="previousImage"
      alt=""
      class="absolute inset-0 w-full h-full object-cover rounded-lg"
    />
    <Transition name="fade">
      <img
        :key="currentImage"
        :src="currentImage"
        alt="Slideshow image"
        class="absolute inset-0 w-full h-full object-cover rounded-lg"
      />
    </Transition>
    <!-- Invisible placeholder to maintain container height -->
    <img :src="currentImage" alt="" class="w-full h-auto invisible" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

interface Props {
  images: string[];
  interval?: number;
}

const props = withDefaults(defineProps<Props>(), {
  interval: 3000,
});

const currentIndex = ref(0);
const previousIndex = ref<number | null>(null);

const currentImage = computed(() => {
  if (props.images.length === 0) return "";
  return props.images[currentIndex.value];
});

const previousImage = computed(() =>
  previousIndex.value !== null ? props.images[previousIndex.value] : null
);

let timer: number | undefined;

onMounted(() => {
  if (props.images.length <= 1) return;

  timer = window.setInterval(() => {
    previousIndex.value = currentIndex.value;
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
  }, props.interval);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from {
  opacity: 0;
}
</style>