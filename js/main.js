const Shop = {
    data() {
        return {
            products: [],
            cart: [],
            filtered: [],
            totalSum: 0,
            isVisibleCart: false,
            liveSearch: '',
            isVisibleSearch: false,
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        addProduct(product) {
            this.getJson(`js/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cart.find(el => el.id === product.id);
                        if (find) {
                            find.quantity += 1;
                        } else {
                            let prod = Object.assign({ quantity: 1, title: product.title, id: product.id, picture: product.picture }, product);
                            this.cart.push(prod);
                        }
                        this.getTotalSum;
                    } else {
                        console.log('error');
                    }
                })
        },
        removeProduct(product, removeAll = false) {
            this.getJson(`js/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (removeAll || product.quantity == 1) {
                            this.cart.splice(this.cart.indexOf(product), 1);
                        } else {
                            product.quantity -= 1
                        }
                        this.getTotalSum;
                    } else {
                        console.log('error');
                    }
                })
        },
        totalSumRender() {
            if (this.totalSum)
                return `<span class="cart-item-result-cost">${this.totalSum} руб.</span>`;
            else
                return `<span class="cart-item-result-cost">Нет товаров</span>`;
        },
        filterGoods() {
            if (this.liveSearch.trim()) {
                const regexp = new RegExp(this.liveSearch.trim(), 'i');
                this.filtered = this.products.filter(product => regexp.test(product.title));
                this.filtered = this.filtered.slice(0, 5);
                this.isVisibleSearch = true;
                return this.filtered;
            }
            else this.isVisibleSearch = false;
        },
    },
    computed: {
        getTotalSum() {
            this.totalSum = 0;
            for (let product of this.cart) {
                this.totalSum += product.price * product.quantity;
            }
        }
    },
    mounted() {
        this.getJson(`js/getProducts.json`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            })
    }
};

Vue.createApp(Shop).mount('#app');


/* class Item {

    constructor(product) {
        let { title, price = 0, id, picture = 'https://placehold.it/200x300' } = product;
        this.title = title;
        this.picture = picture;
        this.price = price;
        this.id = id;
        this.rendered = false;
    }

    render() {
        this.rendered = true;
        return `<div class="product-item" data-id="${this.id}">
                    <img class="product-item-picture" height="300" src="${this.picture}">
                    <h3 class="product-item-title">${this.title}</h3>
                    <p class="product-item-price">${this.price} руб.</p>
                    <button class="product-item-buy" data-id="${this.id}">в корзину</button>
                </div>`;
    }

}

class Product extends Item { }

class CartItem extends Item {

    constructor(el) {
        super(el);
        this.quantity = el.quantity;
    }

    changeQuantity(count) {
        this.quantity += count;
        this._updateItem();
    }

    remove() {
        document.querySelector(`.cart-item[data-id="${this.id}"]`).remove();
    }

    render() {
        this.rendered = true;
        return `<p class="cart-item" data-id="${this.id}">
                    <img class="cart-item-picture" height="60" src="${this.picture}">
                    <span class="cart-item-title-price">
                        <span class="cart-item-title">${this.title}</span>
                        <span class="cart-item-price">Цена: ${this.price} руб.</span>
                    </span>
                    <span class="cart-item-quantity-wrap">
                        <span class="cart-item-quantity">${this.quantity} шт.</span>
                        <span class="cart-item-plus-minus">
                            <svg class="cart-item-minus" data-id="${this.id}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve">
                                <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
                                    S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
                                <path d="M39,25H13c-0.552,0-1,0.447-1,1s0.448,1,1,1h26c0.552,0,1-0.447,1-1S39.552,25,39,25z"/>
                            </svg>
                            <svg class="cart-item-plus" data-id="${this.id}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve">
                                <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
                                    S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
                                <path d="M38.5,25H27V14c0-0.553-0.448-1-1-1s-1,0.447-1,1v11H13.5c-0.552,0-1,0.447-1,1s0.448,1,1,1H25v12c0,0.553,0.448,1,1,1
                                    s1-0.447,1-1V27h11.5c0.552,0,1-0.447,1-1S39.052,25,38.5,25z"/>
                            </svg>
                        </span>
                    </span>
                    <span class="cart-item-cost">${this.quantity * this.price} руб.</span>
                    <span class="cart-item-del" data-id="${this.id}"></span>
                </p>`;
    }

    _updateItem() {
        const block = document.querySelector(`.cart-item[data-id="${this.id}"]`);
        block.querySelector('.cart-item-quantity').textContent = `${this.quantity}  шт.`;
        block.querySelector('.cart-item-cost').textContent = `${this.quantity * this.price} руб.`;
    }

}

class List {

    //static API = 'http://localhost/cart/js';

    static itemsMap = {
        Cart: CartItem,
        ProductsList: Product
    };


    constructor(url, container = '.products') {
        this.url = url;
        this.products = [];
        this.filtered = [];
        this.totalSum = 0;
        this.container = document.querySelector(container);
        this.init();
    }

    init() {
        return false;
    }

    calcSum() {
        return this.products.reduce((accum, item) => accum += item.price, 0);
    }

    getJson(url) {
        return fetch(url ? url : `js/${this.url}`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    handleData(data) {
        for (let dataEl of data) {
            const product = new List.itemsMap[this.constructor.name](dataEl);
            this.products.push(product);
        }

        this._render();
    }

    getItem(id) {
        return this.products.find(product => product.id === id);
    }

    filter(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.products.filter(product => regexp.test(product.title));
        this.products.forEach(product => {
            const block = document.querySelector(`.product-item[data-id="${product.id}"]`);

            if (this.filtered.includes(product)) {
                block.classList.remove('hide');
            } else {
                block.classList.add('hide');
            }
        })
    }

    _render() {
        for (let product of this.products) {
            if (product.rendered) {
                continue;
            }

            this.container.insertAdjacentHTML('beforeend', product.render());
        }
    }

    getTotalSum() {
        this.totalSum = 0;
        for (let product of this.products) {
            this.totalSum += product.price * product.quantity;
        }
    }

}

class ProductsList extends List {

    constructor(cart, url = 'getProducts.json', container = '.products') {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then((data) => this.handleData(data));
    }

    init() {
        this.container.addEventListener('click', e => {
            if (e.target.classList.contains('product-item-buy')) {
                const id = +e.target.dataset['id'];
                this.cart.addProduct(this.getItem(id));
            }
        });
        console.log('ProductsList');
        console.log(this);
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector(`.search-field`).value);
        })
    }

}

class Cart extends List {

    constructor(url = 'getBasket.json', container = '#cart-textarea') {
        super(url, container);
        this.getJson()
            .then((data) => {
                this.handleData(data.contents);
                this.handleTotalSum();
            });
        this.cartWrap = document.querySelector('.cart-items-wrap');
        this.cartResult = document.querySelector('.cart-item-result');
    }

    init() {
        this.container.addEventListener('click', e => {
            if (e.target.classList.contains('cart-item-minus')) {
                const id = +e.target.dataset['id'];
                this.removeProduct(this.getItem(id));
            }
            if (e.target.classList.contains('cart-item-plus')) {
                const id = +e.target.dataset['id'];
                this.addProduct(this.getItem(id));
            }
            if (e.target.classList.contains('cart-item-del')) {
                const id = +e.target.dataset['id'];
                this.removeProduct(this.getItem(id), true);
            }
        });
        document.querySelector('.btn-cart').addEventListener('click', () => {
            this.cartWrap.classList.toggle('hide');
        });
        console.log('Cart');
        console.log(this);
    }

    addProduct(product) {
        this.getJson(`js/addToBasket.json`)
            .then(data => {
                if (data.result) {
                    let find = this.products.find(el => el.id === product.id);
                    if (find) {
                        find.changeQuantity(1);
                    } else {
                        let prod = Object.assign({ quantity: 1, title: product.title, id: product.id, picture: product.picture }, product);
                        this.handleData([prod]);
                    }
                    this.handleTotalSum();
                } else {
                    console.log('error');
                }
            })
    }

    removeProduct(product, removeAll = false) {
        this.getJson(`js/deleteFromBasket.json`)
            .then(data => {
                if (data.result) {
                    if (removeAll || product.quantity == 1) {
                        this.products.splice(this.products.indexOf(product), 1);
                        product.remove();
                    } else {
                        product.changeQuantity(-1)
                    }
                    this.handleTotalSum();
                } else {
                    console.log('error');
                }
            })
    }

    handleTotalSum() {
        this.getTotalSum();
        this.cartResult.innerHTML = `Итого: <span class="cart-item-result-cost">${this.totalSum} руб.</span>`;
    }

}

let cart = new Cart();
const list = new ProductsList(cart); */