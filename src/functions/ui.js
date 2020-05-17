import { ref } from '@vue/composition-api'

export function useHover() {
    const isHovered = ref(false)

    function toggleHover(newState) {
        isHovered.value = newState
    }

    return {
        isHovered,
        toggleHover,
    }
}
