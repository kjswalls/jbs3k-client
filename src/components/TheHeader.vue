<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'TheHeader',
});
</script>

<template>
    <header class="TheHeader">
        <span class="h1">
            Jeff Bezos Simulator 3000
        </span>
    </header>
</template>

<style lang="scss" scoped>
.TheHeader {
    margin-bottom: 20px;
    pointer-events: none;
}

@media (max-width: $sm) {
    .TheHeader {
        text-align: center;
    }
}
</style>
