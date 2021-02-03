import { CartItem } from "./CartItem.js";

export const Cart = {
    inject: ['getJson', 'postJson', 'putJson', 'delJson'],
    components: {
        CartItem
    },
    data() {
        return {
            cart: [],
            totalSum: 0,
            isVisibleCart: false,
        }
    },
    computed: {
        getTotalSum() {
            this.totalSum = 0;
            for (let product of this.cart) {
                this.totalSum += product.price * product.quantity;
            }
            return this.totalSum;
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cart.find(el => el.id === product.id);
            if (find) {
                this.putJson(`/api/cart/${find.id}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++
                        }
                    });
                return;
            }

            let prod = Object.assign({ quantity: 1 }, product);
            this.postJson(`/api/cart`, prod)
                .then(data => {
                    if (data.result) {
                        this.cart.push(prod);
                    }
                });
        },
        removeProduct(product, removeAll = false) {
            if (removeAll || product.quantity == 1) {
                this.delJson(`/api/cart/del/${product.id}`, product)
                    .then(data => {
                        if (data.result) {
                            this.cart.splice(this.cart.indexOf(product), 1);
                        }
                    });
            } else {
                this.putJson(`/api/cart/${product.id}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            --product.quantity
                        }
                    });
            }
            /* this.getJson(`js/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (removeAll || product.quantity == 1) {
                            this.cart.splice(this.cart.indexOf(product), 1);
                        } else {
                            product.quantity -= 1
                        }
                    } else {
                        console.log('error');
                    }
                }) */
        },
    },
    mounted() {
        this.getJson(`/api/cart`)
            .then(data => {
                for (let product of data.contents) {
                    this.cart.push(product);
                }
            })
    },
    template: `<button class="btn-cart" @click="this.isVisibleCart = !this.isVisibleCart">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="25" height="25" viewBox="0 0 366.305 366.305" xml:space="preserve">
                        <path d="M160.336,292.917c-20.167,0-36.579,16.42-36.579,36.579c0,20.167,16.412,36.579,36.579,36.579
                            s36.579-16.412,36.579-36.579C196.915,309.328,180.511,292.917,160.336,292.917z M160.336,349.817
                            c-11.201,0-20.321-9.112-20.321-20.321c0-11.201,9.12-20.321,20.321-20.321c11.201,0,20.321,9.12,20.321,20.321
                            C180.658,340.705,171.545,349.817,160.336,349.817z" />
                        <path d="M274.965,292.917c-20.167,0-36.579,16.42-36.579,36.579c0,20.167,16.412,36.579,36.579,36.579
                            c20.159,0,36.579-16.412,36.579-36.579C311.544,309.328,295.124,292.917,274.965,292.917z M274.965,349.817
                            c-11.209,0-20.321-9.112-20.321-20.321c0-11.201,9.112-20.321,20.321-20.321c11.193,0,20.321,9.12,20.321,20.321
                            C295.287,340.705,286.158,349.817,274.965,349.817z" />
                        <path d="M364.575,92.783c-1.536-1.967-3.894-3.113-6.397-3.113H83.342L60.688,6.23
                            c-0.049-0.179-0.179-0.317-0.244-0.488c-0.179-0.528-0.447-0.992-0.732-1.463c-0.268-0.447-0.512-0.886-0.853-1.268
                            c-0.333-0.382-0.723-0.667-1.13-0.975C57.306,1.711,56.9,1.394,56.42,1.158c-0.447-0.228-0.927-0.341-1.422-0.488
                            c-0.528-0.154-1.04-0.284-1.601-0.325c-0.195-0.008-0.358-0.114-0.561-0.114H8.129C3.642,0.231,0,3.873,0,8.36
                            s3.642,8.129,8.129,8.129h38.489l22.622,83.334l40.627,164.579c0.894,3.633,4.154,6.186,7.893,6.186h199.768
                            c3.739,0,6.991-2.544,7.893-6.186l40.643-164.652C366.672,97.319,366.119,94.758,364.575,92.783z M311.17,254.33H124.131
                            L87.504,105.927h260.301L311.17,254.33z" />
                    </svg>
                </button>
                <div class="cart-items-wrap" v-show="this.isVisibleCart">
                    <span class="cart-title">Корзина</span>
                    <div id="cart-textarea">
                        <CartItem v-for="el of cart" :key="el.id" :productCart="el"></CartItem>
                    </div>
                    <p class="cart-item-result" v-if="this.getTotalSum">Итого: <span class="cart-item-result-cost">{{
                            this.totalSum
                            }}
                            руб.</span></p>
                    <p v-else="">Нет товаров</p>
                </div>
                `
}