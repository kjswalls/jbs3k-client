<script>
import { defineComponent } from '@vue/composition-api';
import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
    name: 'TheLayout',
    components: {
        TheHeader,
    },
});
</script>

<template>
    <div class="TheLayout">
        <main class="content">
            <TheHeader />
            <slot></slot>
        </main>
        <section class="overlay">
            <PortalTarget name="cartOverlay"></PortalTarget>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.TheLayout {
    background: $pink;
    padding: 6% 10%;
    width: 100vw;
    min-width: 300px;
    height: 100vh;
    position: relative;

    .content {
        background: $white;
        border: 5px solid $black;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        align-items: normal;
        width: 100%;
        height: 100%;
        padding: 4% 5%;
    }

    .overlay {
        position: absolute;
        top: 0;
        right: 0;
        max-width: 80%;
        height: 100%;

        .vue-portal-target {
            height: 100%;
        }
    }
}

@media (max-width: $xs) {
    .TheLayout {
        .content {
            align-items: center;
        }
    }
}
</style>
