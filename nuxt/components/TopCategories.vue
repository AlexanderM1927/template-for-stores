<template>
    <section v-if="!isLoading" class="container">
        <h2 class="title">{{ texts.top_categories }}</h2>
        <div class="top-categories">
            <div 
                v-for="(category) in categories" 
                :key="category.id" 
                class="top-categories__category"
                :style="`background-image: url(${category.image})`"
                @click="navigateTo('/items?c=' + category.id)"
            >
                <div class="top-categories__category-name">
                    {{ category.name }}
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import texts from '@/config/texts.json'
import TopCategoryService from '@/services/TopCategoryService'

const appConfig = useRuntimeConfig()
const topCategoryService = new TopCategoryService(appConfig)
const isLoading: Ref<Boolean> = ref(true)
const categories: Ref<[ICategory]|[]> = ref([])

const getTopCategories = async () => {
    isLoading.value = true
    try {
        const { data: dataFromRequest }: any = await topCategoryService.getTopCategories()
        const topCategory = dataFromRequest[0]
        if (!topCategory) return
        const { data } = topCategory.attributes.categories
        if (!data) return
        categories.value = data.map(({ id, attributes }: { id: number, attributes: any }) => {
            const categorie: ICategory = {
                ...attributes,
                image: useImageFromStrapi(attributes.image.data.attributes.url),
                id: id
            }
            return categorie
        })
    } catch (e) {
        console.log(e)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    getTopCategories()
})
</script>
<style scoped lang="scss">
@import "@/styles/_breakpoints.scss";

.top-categories {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
}

.top-categories__category {
    width: 15rem;
    background-repeat: no-repeat;
    background-size: cover;
    height: 15rem;
    position: relative;
    cursor: pointer;
}

.top-categories__category::after {
    content: '';
    width: 100%;
    height: 100%;
    inset: 0;
    position: absolute;
    background: inherit;
    filter:
        blur(0.3rem)
        saturate(400%);
    z-index: -1;
}

@media only screen and (max-width: $grid-breakpoints-sm) {
    .top-categories {
        flex-direction: column;
    }
}

.top-categories__category-name {
    padding: 1rem;
    background: rgba(0, 0, 0, 0.32);
    color: white;
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>