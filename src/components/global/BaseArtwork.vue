<script>
import { defineComponent } from '@vue/composition-api';

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
        popoverContent: {
            type: String,
        },
        popoverSource: {
            type: String,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        popoverBoundary() {
            return document.querySelector('main.content');
        },
        isPopoverDisabled() {
            return !this.popoverContent || window.innerWidth < 768; // window size is not reactive
        },
        shouldShowTooltip() {
            return this.isHovered;
        },
    },
    methods: {
        setHover(state) {
            this.isHovered = state;
        },
    },
});
</script>

<template>
    <div
        class="BaseArtwork"
        @mouseover="setHover(true)"
        @mouseleave="setHover(false)"
    >
        <v-popover
            placement="right-end"
            offset="16"
            :boundariesElement="popoverBoundary"
            trigger="manual"
            :open="shouldShowTooltip"
            :delay="{ show: 100, hide: 100 }"
            :disabled="isPopoverDisabled"
        >
            <img class="image" :src="imageSrc" :alt="altText" />
            <template slot="popover">
                <div
                    class="popoverContent"
                    @mouseover="setHover(true)"
                    @mouseleave="setHover(false)"
                >
                    <p class="secondaryBody">{{ popoverContent }}</p>
                    <p v-if="popoverSource">
                        <a
                            :href="popoverSource"
                            class="secondaryBody actionable"
                            target="_blank"
                            rel="noopener"
                            >Source 😇</a
                        >
                    </p>
                </div>
            </template>
        </v-popover>
    </div>
</template>

<style lang="scss" scoped>
.BaseArtwork {
    cursor: pointer;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    .image {
        max-height: 100px;
        height: 100%;
        width: 100%;
        // styles alt text
        text-align: center;
    }
}
</style>
