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
                    <button class="product-item-buy">в корзину</button>
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

    _fetchData() {
        this.data = [
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
    }

    _render() {
        for (let dataEl of this.data) {
            const product = new Product(dataEl);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }

    totalAmount() {
        let sumProducts = 0;
        this.data.forEach(item => sumProducts += item.price)
        return sumProducts;
    }
}

const list = new ProductsList();

class Cart {
    constructor(elementsCart) {
        this.elementsCart = elementsCart; // массив объектов товаров
        this.totalCost = 0; // общая стоимость корзины
        this.totalRender = ''; // отрисовка корзины
    }

    parseElements() { // метод подсчета общей стоимость корзины
        for (let item of this.elementsCart) {
            let elementInstance = new CartElement();
            this.totalCost += elementInstance.getElementCost();
            this.totalRender += elementInstance.renderElement();
        }

    }

}

class CartElement {
    constructor(elementInstance) {
        this.id = elementInstance.id; // id товара
        this.quantity = elementInstance.quantity; // количество товара
    }

    getElementCost() { // метод getElementCost() - подсчет стоимости товара с учетом количества

    }

    renderElement() { // отрисовка товара в корзине

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