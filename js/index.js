//SELECIONANDO UL PARA ADICIONAR CARDS
const showcase = document.querySelector('.showcase')

//CRIANDO ARRAY PARA ITENS NO CARRINHO
let itemsAdded = []

//FUNÇÃO PARA CRIAR CARDS
function createCard(position) {
    showcase.insertAdjacentHTML('beforeend', `
    <li class="itemCard">
        <div class="image__container">
            <img class="card__img" src=${data[position].img} alt=${data[position].nameItem}>
        </div>
        <div class="description__container">
            <p class="item__tag">${data[position].tag}</p>
            <h3 class="item__name">${data[position].nameItem}</h3>
            <p class="item__description">${data[position].description}</p>
            <p class="item__price">R$ ${data[position].value}</p>
            <p id = "${data[position].id}" class="item__add">${data[position].addCart}</p>
        </div>
    </li>
    `)
}

//FUNÇÃO PARA LISTAR TODOS OS CARDS
function autoListAll() {
    showcase.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        createCard(i)
    }
}
autoListAll()

//LISTENER PARA DARK MODE
const darkToggle = document.querySelector('.dark__toggle')
const html = document.querySelector('html')

darkToggle.addEventListener('click', function (event) {
    html.classList.toggle('dark--mode')
})

//FUNÇÃO PARA FILTRAR CARDS
function filter(tag) {
    showcase.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        if (data[i].tag == tag) {
            createCard(i)
        }
    }
}

//SELECIONANDO UL DA NAV
const categories = document.querySelector('#nav__menu')
const all = document.querySelector('.all')
const accessories = document.querySelector('.accessories')
const shoes = document.querySelector('.shoes')
const tshirts = document.querySelector('.tshirts')

//ADICIONANDO LISTENER PARA A NAV E FILTRANDO AS TAGS
categories.addEventListener('click', function (event) {
    const eventT = event.target
    if (eventT.classList.value.includes('all') && !all.classList.value.includes('option--selected')) {
        all.classList.add('option--selected')
        accessories.classList.remove('option--selected')
        shoes.classList.remove('option--selected')
        tshirts.classList.remove('option--selected')
        autoListAll()
    } else if (eventT.classList.value.includes('accessories') && !accessories.classList.value.includes('option--selected')) {
        accessories.classList.add('option--selected')
        all.classList.remove('option--selected')
        shoes.classList.remove('option--selected')
        tshirts.classList.remove('option--selected')
        filter('Acessórios')
    } else if (eventT.classList.value.includes('shoes') && !shoes.classList.value.includes('option--selected')) {
        shoes.classList.add('option--selected')
        accessories.classList.remove('option--selected')
        all.classList.remove('option--selected')
        tshirts.classList.remove('option--selected')
        filter('Calçados')
    } else if (eventT.classList.value.includes('tshirts') && !tshirts.classList.value.includes('option--selected')) {
        tshirts.classList.add('option--selected')
        accessories.classList.remove('option--selected')
        shoes.classList.remove('option--selected')
        all.classList.remove('option--selected')
        filter('Camisetas')
    }
})

//SELECIONANDO INPUT E BUTTON DE PESQUISA
const input = document.querySelector('input')
const button = document.querySelector('button')

//FUNÇÃO PARA BUSCAR click
input.addEventListener('change', function (event) {
    showcase.innerHTML = ""
    const inputL = input.value.toLocaleLowerCase()
    for (let i = 0; i < data.length; i++) {
        if (data[i].nameItem.toLowerCase().includes(inputL) 
        || data[i].tag.toLowerCase().includes(inputL) 
        || data[i].description.toLowerCase().includes(inputL) 
        || data[i].value == Number(inputL)) {
            createCard(i)
        }
    }
})

//FUNÇÃO PARA BUSCAR change
button.addEventListener('click', function (event) {
    showcase.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        if (data[i].nameItem.includes(input.value) 
        || data[i].tag.includes(input.value) 
        || data[i].description.includes(input.value) 
        || data[i].value == Number(input.value)) {
            createCard(i)
        }
    }
})

//SELECIONANDO UL DO CARRINHO PARA ADICIONAR CARDS
const cart = document.querySelector('.cart__list')

//FUNÇÃO PARA CRIAR CARDS DO CARRINHO
function cartCards(position) {
    cart.insertAdjacentHTML('beforeend', `
    <li class="cart__card">
        <div class="cart__img__container">
            <img class="cart__img" src=${itemsAdded[position].img} alt=${itemsAdded[position].nameItem}>
        </div>
        <div>
            <p class="cart__description cart__description__title">${itemsAdded[position].nameItem}</p>
            <p class="item__price">R$ ${itemsAdded[position].value}</p>
            <p id = "${itemsAdded[position].id}" class="cart__remove">Remover produto</p>
        </div>
        <div class="quantity__buttons">
        <button id = "${itemsAdded[position].id}" class="increase__item">+</button>
        <p class="quantity__item">${itemsAdded[position].quantity}</p>
        <button id = "${itemsAdded[position].id}" class="decrease__item">-</button>
        </div>
    </li>
    `)
}

//SELECIONANDO BOTÃO DE ADICIONAR AO CARRINHO
const addToCart = document.querySelector('.item__add')

//ADICIONANDO LISTENER NO CARD PARA ADICIONAR NO CART 
showcase.addEventListener('click', function (event) {
    const eventT = event.target
    //PUSH DO ITEM PARA O ARRAY itemsAdded
    if (eventT.classList == 'item__add' && data[eventT.id - 1].quantity < 1) {
        data[eventT.id - 1].quantity += 1
        itemsAdded.push(data[eventT.id - 1])
        listSumEmpty()
    } else if (itemsAdded[eventT.id - 1].quantity >= 1) {
        itemsAdded[eventT.id - 1].quantity += 1
        listSumEmpty()
    }
})

//FUNÇÃO PARA LISTAR ITENS NO CARRINHO
function autoListCart() {
    cart.innerHTML = ''
    for (let i = 0; i < itemsAdded.length; i++) {
        cartCards(i)
    }
}

//SELECIONANDO TAGS P PARA MOSTRAR QUANTIDADE
const itemsQuantity = document.querySelector('.items__quantity')
const itemsValue = document.querySelector('.items__value')

//SOMAR E MOSTRAR QUANTIDADE E VALOR
function sumQuantityAndValue() {
    //QUANTIDADE
    itemsQuantity.innerHTML = ''
    let quantity = 0
    for (let i = 0; i < itemsAdded.length; i++) {
        quantity += itemsAdded[i].quantity
    }
    itemsQuantity.innerHTML = `${quantity}`
    //VALOR
    itemsValue.innerHTML = ''
    let value = 0
    for (let j = 0; j < itemsAdded.length; j++) {
        value += itemsAdded[j].value * itemsAdded[j].quantity
    }
    itemsValue.innerHTML = `R$ ${value},00`
}

//SELECIONANDO TAGS APARA ALTERAR QUANTIDADE NO CARRINHO
const quantityItem = document.querySelector('.quantity__buttons')
const increaseItem = document.querySelector('.increase__item')
const decreaseItem = document.querySelector('.decrease__item')

//ADICIONANDO LISTENER NO CARD PARA REMOVER NO CART
cart.addEventListener('click', function(event) {
    const eventT = event.target
    if (eventT.classList == 'cart__remove') {
        itemsAdded = itemsAdded.filter(item => item.id !== Number(eventT.id))
        data[eventT.id - 1].quantity = 0
        listSumEmpty()
    //AUMENTAR QUANTIDADE NO CART
    } else if (eventT.classList == 'increase__item') {
        for (let i = 0; i < itemsAdded.length; i++) {
            if (itemsAdded[i].id == Number(eventT.id)) {
                itemsAdded[i].quantity++
                listSumEmpty()
            }
        }
    //DIMINUIR QUANTIDADE NO CART
    } else if (eventT.classList == 'decrease__item') {
        for (let i = 0; i < itemsAdded.length; i++) {
            if (itemsAdded[i].id == Number(eventT.id) && itemsAdded[i].quantity > 1) {
                itemsAdded[i].quantity--
                listSumEmpty()
            }
        }
    }
})

//CARRINHO VAZIO
const totalValue = document.querySelector('.total__cart')
function emptyCart() {
    if (itemsAdded == '') {
        cart.innerHTML = ''
        cart.insertAdjacentHTML('beforeend', `
        <span class="empty__info">
            <p class="empty__cart">Carrinho vazio</p>
            <p class="empty__add">Adicione itens</p>
        </span>
    `)
        totalValue.setAttribute('hidden', true)
    } else {
        totalValue.removeAttribute("hidden")
    }
}
emptyCart()

//LIST-SUM-EMPTY
function listSumEmpty() {
    autoListCart()
    sumQuantityAndValue()
    emptyCart()
}

//CARRINHO E PESQUISA MOBILE
const buttonMobileCart = document.querySelector('.mobile__cart')
const MobileCart = document.querySelector('.search__cart')
buttonMobileCart.addEventListener('click', function(event) {
    if (MobileCart.style.display == "none") {
        MobileCart.style.display="block"
    } else {
        MobileCart.style.display="none"
    }
})