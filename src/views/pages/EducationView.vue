<template>
    <div class="ia_section">
        <div class="ia_row">
            <div class="ia_column span4 heightauto">
                <div class="education_sidebar">
                    <div class="head">{{ $gettext('Information') }}</div>

                    <div class="education_menu">
                        <div class="menu">
                            <div class="title">{{ $gettext('General') }}</div>

                            <div class="items">
                                <div class="item" v-for="item in queryItems" :key="item?.id">
                                    <div class="name" @click="scrolltop(`item_${item?.id}`)">
                                        {{ getItemValue(item, 'name') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ia_column span8">
                <div class="education">
                    <div class="item" v-for="item in queryItems" :key="item?.id" :id="`item_${item?.id}`">
                        <div class="title">
                            <h1>{{ getItemValue(item, 'name') }}</h1>
                        </div>

                        <div class="text">
                            <div v-html="processedContent[item?.id!]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { computed, ref, watch } from 'vue'
import { getItemValue, markedText } from '@/functions/functions'
import { useGettext } from 'vue3-gettext'
import { useQueryStore } from '@/stores/queryStore'

const queries = useQueryStore();
const { $gettext } = useGettext();

const { result } = queries.getEducationViewQuery({});

const processedContent = ref<{ [key: string]: string }>({})
const queryResults = computed(() => result.value?.educationpages)
const queryItems = computed(() => (queryResults.value ? queryResults.value.results : null))

watch(queryItems, async (newItems) => {
    if (!newItems) return;

    const contentMap: { [key: string]: string } = { ...processedContent.value };

    for (const item of newItems) {
        if (item?.id) {
            const newContent = getItemValue(item, 'content');
            if (newContent && !contentMap[item.id] || contentMap[item.id] !== newContent) {
                contentMap[item.id] = await markedText(newContent!);
            }
        }
    }

    processedContent.value = contentMap;
    education_sidebar();
}, { immediate: true });

function education_sidebar() {
    setTimeout(() => {
        const element = document.querySelector('.education_sidebar') as HTMLElement
        const height = element.offsetHeight

        if (window.innerHeight > height + 60) {
            element.classList.add('sticky')
        } else {
            element.classList.remove('sticky')
        }
    }, 100)
}

function scrolltop(item: string) {
    if (item === null) {
        return
    }

    window.scrollTo({
        top: document.getElementById(item)!.offsetTop,
        behavior: 'smooth',
    })
}

onMounted(() => {
    window.addEventListener('resize', education_sidebar)
    education_sidebar()
})

// Remove event listener when the component is unmounted
onUnmounted(() => {
    window.removeEventListener('resize', education_sidebar)
})
</script>

<style scoped lang="scss">
.education {
    display: grid;
    gap: $gap;

    .item {
        border: 0 solid #ededed;
        padding: 4rem;
        display: grid;
        gap: $gap;
        background-color: $card_background_color;
        border-radius: $border-radius;

        h1 {
            padding-bottom: 1rem;
            border-bottom: 0.1rem solid $card_border_color;
        }
    }
}

.education_sidebar {
    height: fit-content;

    &.sticky {
        position: sticky;
        top: 3rem;
    }

    .head {
        padding: 2rem 4rem;
        color: #fff;
        font-size: 2.4rem;
        font-weight: 700;
        background-color: $primary-color;
        border-radius: $border-radius $border-radius 0 0;
    }

    .education_menu {
        background-color: $card_background_color;
        padding: 4rem;
        border-radius: 0 0 $border-radius $border-radius;

        .menu {
            display: grid;
            gap: $gap-xs;

            .title {
                font-weight: 700;
                font-size: 2rem;
            }

            .items {
                padding-left: 1.5rem;

                .name {
                    padding: 0.3rem 0;
                    cursor: pointer;
                    width: fit-content;
                    transition: 300ms;
                    background: linear-gradient(currentColor, currentColor) bottom / 0 0.2rem no-repeat;
                    background-position: left bottom;

                    &:hover {
                        background-size: 100% 0.2rem;
                    }
                }
            }
        }
    }
}
</style>
