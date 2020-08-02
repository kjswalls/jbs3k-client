<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    onMounted,
    watch,
} from '@vue/composition-api';
import { Item } from '@/types/item';
import { useCurrency } from '@/functions/util';
import { useCart } from '@/functions/cart';

export default defineComponent({
    name: 'TheCartItem',
    props: {
        itemArray: {
            type: Array as () => Item[],
            required: true,
        },
    },
    setup(props, context) {
        const itemRef = ref<HTMLLIElement>(null);
        const isCountTransitioning = ref(false);
        const { addToCart, removeFromCart, canAffordItem } = useCart();
        const { formatNumber } = useCurrency();
        const item = computed(() => props.itemArray[0]);
        const title = computed(() => item.value.title);
        const formattedPrice = computed(() => formatNumber(item.value.price));
        const numberOfItems = computed(() => props.itemArray.length);
        const formattedSubtotal = computed(() =>
            formatNumber(numberOfItems.value * item.value.price)
        );
        const isAddDisabled = computed(() => !canAffordItem(item.value));
        const scrollItemIntoView = async () => {
            await context.root.$nextTick();
            if (itemRef.value) {
                itemRef.value.scrollIntoView();
            }
        };
        const animateCount = () => {
            isCountTransitioning.value = true;
            setTimeout(() => {
                isCountTransitioning.value = false;
            }, 200);
        };
        onMounted(scrollItemIntoView);
        watch(
            () => numberOfItems.value,
            () => {
                scrollItemIntoView();
                animateCount();
            }
        );

        return {
            itemRef,
            isCountTransitioning,
            item,
            title,
            formattedPrice,
            numberOfItems,
            formattedSubtotal,
            addToCart,
            removeFromCart,
            isAddDisabled,
        };
    },
});
</script>

<template>
    <li class="TheCartItem" ref="itemRef">
        <div class="row">
            <span class="primaryBody name">{{ title }}</span>
            <span class="primaryBody price">{{ formattedPrice }}</span>
        </div>
        <div class="row">
            <div class="counter">
                <BaseButton
                    class="counterButton decrement"
                    @click.native="removeFromCart(item)"
                >
                    -
                </BaseButton>
                <div
                    :class="[
                        'primaryBody',
                        'count',
                        { animated: isCountTransitioning },
                    ]"
                >
                    {{ numberOfItems }}
                </div>
                <BaseButton
                    class="counterButton increment"
                    @click.native="addToCart(item)"
                    :disabled="isAddDisabled"
                >
                    +
                </BaseButton>
            </div>
            <span class="secondaryBody subtotal">{{ formattedSubtotal }}</span>
        </div>
    </li>
</template>

<style lang="scss" scoped>
.TheCartItem {
    border-bottom: 1px solid $lightGray;
    display: flex;
    flex-direction: column;
    padding-bottom: 12px;

    &:not(:last-child) {
        margin-bottom: 24px;
    }

    .row {
        display: flex;
        justify-content: space-between;

        &:not(:last-child) {
            margin-bottom: 15px;
        }

        .counterButton {
            border: none;
            padding: 4px 8px;
        }

        .count {
            margin: 0px 15px;
            display: inline-block;
            transition: all 0.2s ease;

            &.animated {
                transform: scale(1.05);
                border-bottom: 1px solid $pink;
            }
        }
    }

    .name {
        color: $purple;
        margin-right: 5px;
    }

    .subtotal {
        color: $mediumGray;
        align-self: center;
    }
}
</style>
