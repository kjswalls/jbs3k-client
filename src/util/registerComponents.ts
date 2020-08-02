import Vue from 'vue';
import BaseArtwork from '@/components/global/BaseArtwork.vue';
import BaseButton from '@/components/global/BaseButton.vue';

const globalComponents = [BaseArtwork, BaseButton];

const registerGlobalComponents = () => {
    globalComponents.forEach(component =>
        Vue.component(component.name, component)
    );
};

export default registerGlobalComponents;
