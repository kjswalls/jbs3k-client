<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'BaseButton',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<template>
    <button class="BaseButton" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.BaseButton {
    background: $lightGray;
    padding: 8px 10px;
    border: 2px solid $gray;
    border-radius: 5px;
    font-family: 'Roboto Mono', monospace;
    font-weight: bold;
    font-size: 12px;
    color: $darkGray;
    transition: all 0.2s ease;

    &:hover {
        background: $purple;
        color: $white;
        cursor: pointer;
        border: 2px solid $purple;
    }

    &:active {
        transform: scale(1.05);
    }

    &:focus {
        outline: none;
    }

    &:focus-visible {
        outline: solid;
    }

    &:disabled {
        border: 2px solid $gray;
        background: $lightGray;
        color: $gray;
        cursor: not-allowed;
    }
}
</style>
