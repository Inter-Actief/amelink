<template>
    <Button v-if="!oidc.isAuthenticated" as="div" :label="$gettext('Sign-in')" severity="secondary" @click="oidc.login">
    </Button>
    <Button v-else @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" severity="secondary">
        <UserIcon></UserIcon>
    </Button>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
    </Menu>
</template>

<script lang="ts" setup>
import { useOidcStore } from '@/stores/oidcStore';
import { UserIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';
const oidc = useOidcStore()

const menu = ref();
const items = computed(() => [
    {
        label: oidc.profile?.name,
        items: [
            {
                label: 'Logout',
                command: () => {
                    oidc.logout()
                }
            },
        ]
    }
]);

const toggle = (event: Event) => {
    menu.value.toggle(event);
};
</script>

<style>
</style>