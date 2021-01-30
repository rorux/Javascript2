export const SearchItem = {
    props: ['product'],
    template: `<div class="search-item">
                <img class="search-item-picture" height="60" :src="product.picture">
                <span class="search-item-title">{{ product.title }}</span>
                <span class="search-item-price">({{ product.price }} руб.)</span>
            </div>`
};