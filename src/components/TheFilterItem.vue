<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Filter } from '@/types/filter';

export default defineComponent({
    name: 'TheFilterItem',
    props: {
        filter: {
            type: Object as () => Filter,
            required: true,
        },
        isActive: {
            type: Boolean,
        },
    },
});
</script>

<template>
    <li class="TheFilterItem">
        <BaseButton
            :class="['secondaryBody', 'filterButton', { isActive }]"
            @click.native="filter.handler"
        >
            {{ filter.name }}
        </BaseButton>
    </li>
</template>

<style lang="scss" scoped>
.TheFilterItem {
    transition: all 0.2s ease;

    .filterButton {
        background: none;
        border: 1px solid $lightGray;
        border-radius: 10px;
        color: $black;
        font-weight: normal;
        margin: 3px;
        padding: 8px 12px;
        white-space: nowrap;

        &:hover {
            background: $purple;
            color: $white;
            border: 1px solid $purple;
        }

        &.isActive {
            border: 1px solid $pink;
        }
    }
}
</style>
