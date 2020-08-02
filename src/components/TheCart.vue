<script lang="ts">
import {
    defineComponent,
    reactive,
    ref,
    computed,
    watch,
} from '@vue/composition-api';
import gsap from 'gsap';
import { useCart } from '@/functions/cart';
import { useFunds } from '@/functions/funds';
import { useCurrency } from '@/functions/util';
import TheCartItem from '@/components/TheCartItem.vue';

export default defineComponent({
    name: 'TheCart',
    components: {
        TheCartItem,
    },
    setup() {
        const { cart, currentTotal } = useCart();
        const { funds } = useFunds();
        const localFunds = reactive({
            balance: 0,
        });
        const { formatNumber, numberToWords } = useCurrency();
        const formattedTotal = computed(() => formatNumber(currentTotal.value));
        const readableBalance = computed(() =>
            numberToWords(funds.currentBalance)
        );
        const formattedAnimatedBalance = computed(() => {
            return formatNumber(localFunds.balance);
        });
        const isPortalDisabled = ref(true);
        const toggleOverlay = async (event: MouseEvent, hide: boolean) => {
            event.preventDefault();
            isPortalDisabled.value = hide;
            if (!isPortalDisabled.value) {
                document.addEventListener('click', event => {
                    const clickedElement = event.target as HTMLElement;
                    if (clickedElement.closest('.contentWrapper')) {
                        return;
                    }
                    isPortalDisabled.value = true;
                });
            }
        };
        watch(
            () => funds.currentBalance,
            newValue => {
                gsap.to(localFunds, { duration: 1, balance: newValue });
            }
        );

        return {
            cart,
            currentTotal,
            formattedTotal,
            formattedAnimatedBalance,
            readableBalance,
            toggleOverlay,
            isPortalDisabled,
        };
    },
});
</script>

<template>
    <div class="TheCart">
        <Portal
            to="cartOverlay"
            :disabled="isPortalDisabled || !currentTotal"
            slim
        >
            <div :class="['contentWrapper', { inOverlay: !isPortalDisabled }]">
                <BaseButton
                    :class="['closeButton']"
                    @click.native="event => toggleOverlay(event, true)"
                >
                    Ｘ
                </BaseButton>
                <div class="remainingBalance">
                    <p class="primaryBody balanceLabel">
                        remaining asset balance
                    </p>
                    <p class="formattedBalance">
                        {{ formattedAnimatedBalance }}
                    </p>
                    <v-popover placement="top" offset="16" trigger="click">
                        <p class="primaryBody actionable">
                            {{ `${readableBalance} dollars` }}
                        </p>
                        <template slot="popover">
                            <p class="secondaryBody">As of July 31, 2020.</p>
                            <p>
                                <a
                                    href="https://www.forbes.com/profile/jeff-bezos/#7e600ce51b23"
                                    class="secondaryBody actionable"
                                    target="_blank"
                                    rel="noopener"
                                    >Source 🤑</a
                                >
                            </p>
                        </template>
                    </v-popover>
                </div>
                <p class="showOverlay" v-if="currentTotal">
                    <a
                        href="/"
                        class="secondaryBody actionable"
                        @click="event => toggleOverlay(event, false)"
                        >View cart 🛒</a
                    >
                </p>
                <ul class="list" v-if="currentTotal">
                    <TheCartItem
                        v-for="(itemArray, itemName) in cart"
                        :key="itemName"
                        :itemArray="itemArray"
                    />
                </ul>
                <div class="display" v-if="currentTotal">
                    <div class="total">
                        <span class="primaryBody">Total</span>
                        <span class="primaryBody">{{ formattedTotal }}</span>
                    </div>
                </div>
            </div>
        </Portal>
    </div>
</template>

<style lang="scss" scoped>
.TheCart {
    grid-column: 1;
    grid-row: 1;
}

.contentWrapper {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    min-height: 150px;
    width: 100%;
    border: 3px solid $pink;
    border-radius: 30px;
    height: 100%;

    &.inOverlay {
        background-color: $white;
        box-shadow: 5px 5px 5px $black, -5px 1px 5px $black;

        .closeButton {
            display: block;
        }
    }

    .closeButton {
        display: none;
        margin-top: 16px;
        margin-right: 16px;
        align-self: flex-end;
        border-radius: 50%;
    }

    .remainingBalance {
        text-align: center;
        margin: 16px 32px;

        p {
            margin: 3px 0px;
        }

        .balanceLabel {
            color: $mediumGray;
        }

        .formattedBalance {
            @include h1;
        }
    }

    .showOverlay {
        text-align: center;
        display: none;
        margin-top: 0px;
    }

    .list {
        list-style: none;
        display: flex;
        flex-direction: column;
        margin: 16px 0px 0px;
        padding: 0px 32px;
        overflow-y: auto;
        scroll-behavior: smooth;
    }

    .display {
        margin: 32px;
        margin-top: 0px;
        padding-top: 32px;
        border-top: 1px solid $black;

        .total {
            background: $lightGray;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            padding: 15px;
        }
    }
}

@media (min-width: $xs) {
    .contentWrapper {
        max-height: 400px;

        &.inOverlay {
            max-height: 100%;
        }
    }
}

@media (max-width: $sm) {
    .contentWrapper {
        .remainingBalance {
            .formattedBalance {
                @include h2;
            }
        }

        .showOverlay {
            display: block;
        }

        .list,
        .display {
            display: none;
        }

        &.inOverlay {
            .list {
                display: flex;
            }

            .display {
                display: block;
            }
        }
    }
}

@media (min-width: $sm) {
    .TheCart {
        grid-column: 2;
        grid-row: 1 / -1;
    }

    .contentWrapper {
        min-width: 325px;
        max-height: unset;
    }
}
</style>
