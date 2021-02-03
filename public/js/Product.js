export const Product = {
    props: ['product'],
    template: `<div class="product-item">
                <img class="product-item-picture" height="300" :src="product.picture" :alt="product.title">
                <h3 class="product-item-title">{{ product.title }}</h3>
                <p class="product-item-price">{{ product.price }} руб.</p>
                <button class="product-item-buy" @click="this.$root.$refs.basket.addProduct(product)">в корзину</button>
            </div>`
};
