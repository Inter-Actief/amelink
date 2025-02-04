<template>

  <div class="homepage_cards">

    <template
        v-if="cards !== null"
        v-for="item in cards"
        :key="item"
    >

      <router-link :class="['item', item.class]" :to="{ name: item.routername, params: {  } }">

        <div class="image">
          <img class="placeholder" width="1600" height="1067" src="@/assets/images/ia_placeholder.png"/>
        </div>

        <div class="content">
          <div class="title">{{ item.name }}</div>
        </div>

      </router-link>

    </template>

  </div>

</template>

<script setup lang="ts">

const cards = [
  {
    'routername' : 'activities',
    'img' : '',
    'name' : 'Activities',
    'class' : 'purple',
  },
  {
    'routername' : 'news',
    'img' : '',
    'name' : 'News',
    'class' : 'blue',
  },
  {
    'routername' : 'education',
    'img' : '',
    'name' : 'Education',
    'class' : 'red',
  },
  {
    'routername' : 'home',
    'img' : '',
    'name' : 'Companies',
    'class' : 'lightblue',
  },
  {
    'routername' : 'home',
    'img' : '',
    'name' : 'Association',
    'class' : 'default',
  }
]

</script>

<style scoped lang="scss">

.homepage_cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $gap;
    width: 100%;

    .item {
        display: grid;
        position: relative;

        &:nth-child(1) {
            grid-area: 1 / 1 / 2 / 2;
        }

        &:nth-child(2) {
            grid-area: 1 / 2 / 2 / 3;
        }

        &:nth-child(3) {
            grid-area: 2 / 1 / 3 / 2;
        }

        &:nth-child(4) {
            grid-area: 2 / 2 / 3 / 3;
        }

        &:nth-child(5) {
            grid-area: 1 / 3 / 3 / 5;
        }

        .image {
            overflow: hidden;
            border-radius: $border-radius;
            min-height: 100%;
            height: 25rem;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }
        }

        .content {
            border-radius: 0 0 $border-radius $border-radius;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 1rem;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.2);
            transition: 300ms;
        }

        &.purple:hover .content {
            background-color: rgba( $color_purple, 0.5 );
        }

        &.lightblue:hover .content {
            background-color: rgba( $color_lightblue, 0.5 );
        }

        &.red:hover .content {
            background-color: rgba( $color_red, 0.5 );
        }

        &.blue:hover .content {
            background-color: rgba( $color_blue, 0.5 );
        }
    }


    @media screen and (max-width: $screen-lg) {
        grid-template-columns: repeat(2, 1fr);

        .item {
            &:nth-child(1) {
                grid-area: 3 / 1 / 4 / 2;
            }

            &:nth-child(2) {
                grid-area: 3 / 2 / 4 / 3;
            }

            &:nth-child(3) {
                grid-area: 4 / 1 / 5 / 2;
            }

            &:nth-child(4) {
                grid-area: 4 / 2 / 5 / 3;
            }

            &:nth-child(5) {
                grid-area: 1 / 1 / 3 / 3;
            }
        }
    }

    @media screen and (max-width: $screen-lm) {
        grid-template-columns: repeat(1, 1fr);

        .item:nth-child(n) {
            grid-area: initial;
        }
    }
}

</style>