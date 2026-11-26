<template>
    <Button
        v-if="!oidc.isAuthenticated"
        as="div"
        class="header-action"
        :label="$gettext('Sign-in')"
        severity="secondary"
        @click="oidc.login"
    >
    </Button>
    <Button
        v-else
        class="header-action"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        severity="secondary"
    >
        <UserIcon></UserIcon>
    </Button>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true"> </Menu>
</template>

<script lang="ts" setup>
import { useOidcStore } from '@/stores/oidcStore'
import { UserIcon } from '@lucide/vue'
import { computed, ref } from 'vue'
import { useGettext } from 'vue3-gettext'

const { $gettext } = useGettext()
const oidc = useOidcStore()
const menu = ref()
const items = computed(() => [
    {
        label: oidc.profile?.name,
        items: [
            {
                label: $gettext('Logout'),
                command: () => {
                    oidc.logout()
                },
            },
        ],
    },
])

const toggle = (event: Event) => {
    menu.value.toggle(event)
}
</script>
