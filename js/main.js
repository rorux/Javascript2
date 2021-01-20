class Product {
    constructor(product) {
        let { title, price = 0, id, picture = 'https://placehold.it/200x300' } = product;
        this.title = title;
        this.picture = picture;
        this.price = price;
        this.id = id;
    }

    render() {
        return `<div class="product-item">
                    <img class="product-item-picture" height="300" src="${this.picture}">
                    <h3 class="product-item-title">${this.title}</h3>
                    <p class="product-item-price">${this.price} руб.</p>
                    <button class="product-item-buy" data-id="${this.id}">в корзину</button>
                </div>`;
    }

}

class ProductsList {
    constructor(container = '.products') {
        this.data = [];
        this.products = [];
        this.container = document.querySelector(container);
        this._fetchData();
        this._render();
        console.log(this.totalAmount());
    }

    init() { }

    static goods = [
        '',
        { id: 1, title: 'Invicta IN9204OB', price: 9000, picture: 'img/1.jpg' },
        { id: 2, title: 'Casio G-SHOCK GMW-B5000D-1E', price: 49000, picture: 'img/2.jpg' },
        { id: 3, title: 'Boccia Titanium 3608-02', price: 5000, picture: 'img/3.jpg' },
        { id: 4, title: 'Casio G-SHOCK GST-B200D-1AER', price: 34000, picture: 'img/4.jpg' },
        { id: 5, title: 'Ingersoll I07401', price: 19000, picture: 'img/5.jpg' },
        { id: 6, title: 'Traser TR_109040', price: 25000, picture: 'img/6.jpg' },
        { id: 7, title: 'Orient ER27004W', price: 10000, picture: 'img/7.jpg' },
        { id: 8, title: 'Штурманские 2609-3714129', price: 29000, picture: 'img/8.jpg' },
        { id: 9, title: 'Aviator V.1.22.0.149.4', price: 27000, picture: 'img/9.jpg' }
    ];

    _fetchData() {
        this.data = ProductsList.goods;
    }

    _render() {
        for (let dataEl of this.data) {
            if (dataEl) {
                const product = new Product(dataEl);
                this.products.push(product);
                this.container.insertAdjacentHTML('beforeend', product.render());
            }
        }
    }

    totalAmount() {
        let sumProducts = 0;
        this.data.forEach(el => {
            if (el)
                sumProducts += el.price;
        })
        return sumProducts;
    }
}

const list = new ProductsList();

class Cart {
    constructor() {
        this.elementsCart = {}; // объект экземпляров класса CartElement
        this.elementsCartId = []; // массив id товаров в корзине
        this.costCart = 0; // общая стоимость корзины
        this.renderCart = ''; // отрисовка корзины
    }

    addGoods(itemObj) {
        // если товар был в корзине, то его количество +1, иначе просто добавляем товар в корзину
        (this.elementsCart[itemObj.id]) ? this.elementsCart[itemObj.id].quantity += 1 : this.elementsCart[itemObj.id] = itemObj;
        if (this.elementsCartId.indexOf(itemObj.id) == -1) this.elementsCartId.push(itemObj.id);

    }

    renderCartTextarea() {
        this.renderCart = '';
        this.elementsCartId.forEach(idItem => this.renderCart += this.elementsCart[idItem].renderElement())
        this._getCartTextarea().innerHTML = this.renderCart;
    }

    _getCartTextarea() {
        return document.querySelector('#cart-textarea');
    }

    getCostCart() {
        this.costCart = 0;
        this.elementsCartId.forEach(idItem => this.costCart += this.elementsCart[idItem].getElementCost());
        return this.costCart;
    }

    renderCostCart() {
        this._getCartTextarea().innerHTML += `<p class="cart-item-result">Итого: <span class="cart-item-result-cost">${this.getCostCart()} руб.</span></p>`;
    }

    removeItemFromCart(id) {
        alert('del')
    }

}

class CartElement {
    constructor(elementInstance) {
        this.id = elementInstance.id; // id товара
        this.title = elementInstance.title; // название товара
        this.price = elementInstance.price; // цена товара
        this.picture = elementInstance.picture; // картинка товара
        this.quantity = 1; // картинка товара
    }

    getElementCost() { // метод getElementCost() - подсчет стоимости товара с учетом количества
        return this.price * this.quantity;
    }

    renderElement() { // отрисовка товара в корзине
        return `<p class="cart-item"><img class="cart-item-picture" height="60" src="${this.picture}"> <span class="cart-item-title">${this.title}</span> <span class="cart-item-quantity">${this.quantity} шт.</span> <span class="cart-item-cost">${this.getElementCost()} руб.</span><span class="cart-item-del" onclick="removeItemFromCart(${this.id})" data-id="${this.id}"></span></p>`;
    }

    aaa() {
        alert(2)
    }
}








/* const products = [
    { id: 1, title: 'Invicta IN9204OB', price: 9000, picture: 'img/1.jpg' },
    { id: 2, title: 'Casio G-SHOCK GMW-B5000D-1E', price: 49000, picture: 'img/2.jpg' },
    { id: 3, title: 'Boccia Titanium 3608-02', price: 5000 },//, picture: 'img/3.jpg' },
    { id: 4, title: 'Casio G-SHOCK GST-B200D-1AER', price: 34000, picture: 'img/4.jpg' },
    { id: 5, title: 'Ingersoll I07401', price: 19000, picture: 'img/5.jpg' },
    { id: 6, title: 'Traser TR_109040', price: 25000, picture: 'img/6.jpg' },
    { id: 7, title: 'Orient ER27004W', price: 10000, picture: 'img/7.jpg' },
    { id: 8, title: 'Штурманские 2609-3714129', price: 29000, picture: 'img/8.jpg' },
    { id: 9, title: 'Aviator V.1.22.0.149.4', price: 27000, picture: 'img/9.jpg' }
];


const renderProduct = (title = 'Часы', price = 1000, picture = 'https://placehold.it/200x300') => `<div class="product-item">
                                                                        <img class="product-item-picture" height="300" src="${picture}">
                                                                        <h3 class="product-item-title">${title}</h3>
                                                                        <p class="product-item-price">${price} руб.</p>
                                                                        <button class="product-item-buy">в корзину</button>
                                                                    </div>`;

const render = productsList => {
    const productsElements = productsList.map(item => renderProduct(item.title, item.price, item.picture));
    productsElements.forEach(item => document.querySelector('.products').innerHTML += item);
};

render(products); */