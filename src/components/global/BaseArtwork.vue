<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'BaseArtwork',
    props: {
        imageSrc: {
            type: String,
            required: true,
        },
        altText: {
            type: String,
            required: true,
        },
    },
})
</script>

<template>
    <div class="BaseArtwork">
        <img class="image" :src="imageSrc" :alt="altText" />
    </div>
</template>

<style lang="scss" scoped>
.BaseArtwork {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    .image {
        max-width: 100%;
        // styles alt text
        text-align: center;
    }
}
</style>
