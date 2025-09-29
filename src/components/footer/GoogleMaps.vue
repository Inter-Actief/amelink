<template>
    <div class="footer_googlemaps">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d610.8172442102239!2d6.856929971951965!3d52.23849789819062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b813d066e78861%3A0x94a8e9829a7bba75!2sDrienerlolaan%205%2C%20e208%2C%207522%20NB%20Enschede!5e0!3m2!1snl!2snl!4v1714484273914!5m2!1snl!2snl"
            width="600" height="450" style="border: 0" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    </div>
</template>

<script setup lang="ts"></script>

<style>
.footer_googlemaps {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    opacity: 0.8;

    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 40%;
        height: 100%;
        pointer-events: none;
        background: linear-gradient(90deg, rgba(29, 66, 138, 1) 0%, rgba(29, 66, 138, 0) 100%);
    }

    iframe {
        height: 100%;
        display: block;
    }
}

.ia-section.googlemaps {
    padding: 0;

    .footer_googlemaps {
        position: relative;
        opacity: 1;

        iframe {
            height: 40rem;
            width: 100%;
        }

        &:before {
            display: none;
        }
    }
}
</style>
