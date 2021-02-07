export const CartItem = {
    props: ['productCart'],
    template: `<div class="cart-item">
                <img class="cart-item-picture" height="60" :src="productCart.picture">
                <div class="cart-item-title-price">
                    <span class="cart-item-title">{{ productCart.title }}</span>
                    <span class="cart-item-price">Цена: {{ productCart.price }} руб.</span>
                </div>
                <div class="cart-item-quantity-wrap">
                    <span class="cart-item-quantity">{{ productCart.quantity }} шт.</span>
                    <span class="cart-item-plus-minus">
                        <svg class="cart-item-minus" @click="$root.$refs.basket.removeProduct(productCart)"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="15" height="15" viewBox="0 0 52 52"
                            style="enable-background:new 0 0 52 52;" xml:space="preserve">
                            <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
                                S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" />
                            <path
                                d="M39,25H13c-0.552,0-1,0.447-1,1s0.448,1,1,1h26c0.552,0,1-0.447,1-1S39.552,25,39,25z" />
                        </svg>
                        <svg class="cart-item-plus" @click="$root.$refs.basket.addProduct(productCart)"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="15" height="15" viewBox="0 0 52 52"
                            style="enable-background:new 0 0 52 52;" xml:space="preserve">
                            <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
                                S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" />
                            <path d="M38.5,25H27V14c0-0.553-0.448-1-1-1s-1,0.447-1,1v11H13.5c-0.552,0-1,0.447-1,1s0.448,1,1,1H25v12c0,0.553,0.448,1,1,1
                                s1-0.447,1-1V27h11.5c0.552,0,1-0.447,1-1S39.052,25,38.5,25z" />
                        </svg>
                    </span>
                </div>
                <span class="cart-item-cost">{{ productCart.quantity * productCart.price }} руб.</span>
                <span class="cart-item-del" @click="$root.$refs.basket.removeProduct(productCart, true)"></span>
            </div>`
};