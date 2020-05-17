<script>
import { defineComponent } from '@vue/composition-api'
import TheLayout from '@/components/TheLayout.vue'

export default defineComponent({
    name: 'App',
    components: {
        TheLayout,
    },
})
</script>

<template>
    <div id="app">
        <TheLayout>
            <router-view />
        </TheLayout>
    </div>
</template>

<style lang="scss">
html {
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: inherit;
}

body {
    margin: 0px;
}

#app {
    font-family: 'Roboto Mono', monospace;
    color: $black;
}
</style>
