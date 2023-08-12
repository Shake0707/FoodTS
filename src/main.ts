///////////////////////////////////////// animation-logo
const animationLogo = document.getElementById('animation-logotip') as HTMLSpanElement;

function anim(): void {
    let i = 0;
    const patr1 = setInterval(() => {
        i++;
        animationLogo.innerHTML = i + '';
        if (i >= 50) clearInterval(patr1);
    }, 50)

    const part2 = setInterval(() => {
        i++;
        animationLogo.innerHTML = i + '';
        if (i >= 70) clearInterval(part2);
    }, 90)

    const part3 = setInterval(() => {
        i++;
        animationLogo.innerHTML = i + '';
        if (i >= 92) clearInterval(part3);
    }, 140)

    const part4 = setInterval(() => {
        i++;
        animationLogo.innerHTML = i + '';
        if (i >= 100) clearInterval(part4);
    }, 170)
}

anim();


////////////////////////////////////////////////// gamburge's number and price
const btnPlus = document.querySelectorAll('.plus') as NodeListOf<HTMLAnchorElement>;
const btnMinus = document.querySelectorAll('.minus') as NodeListOf<HTMLAnchorElement>;
const productNum = document.querySelectorAll('.main__product-num') as NodeListOf<HTMLOutputElement>;
const summa = document.querySelectorAll('.main__product-price span') as NodeListOf<HTMLSpanElement>;
const kkcalSpans = document.querySelectorAll('.main__product-kcall span') as NodeListOf<HTMLSpanElement>;

//////////////////////////Foods price OBJ
interface IFoodsPrice {
    price: number;
}
const foodsPrice: IFoodsPrice[] = [
    { price: 10000 },
    { price: 20500 },
    { price: 31900 },
]

//////////////////////////kkcal OBJ

interface IBurgersKkcal {
    plainBurger: number;
    freshBurger: number;
    freshCombo: number;
}

interface IKkcalObj {
    doubleMayonnaise: number;
    lettuce: number;
    cheese: number;
}
const kkcalObj: IKkcalObj & IBurgersKkcal = {
    plainBurger: 5000,
    freshBurger: 6500,
    freshCombo: 8000,
    doubleMayonnaise: 1360,
    lettuce: 12,
    cheese: 402,
}

for (let i = 0; i < productNum.length; i++) {
    const elemPlus = btnPlus[i];
    const elemMinus = btnMinus[i];
    const elemOut = productNum[i];
    const summaLen = summa[i];
    const foodsLen = foodsPrice[i];
    const kkcalSpan = kkcalSpans[i];
    let num: number = 0;
    const burgerName = elemOut.parentElement?.parentElement?.parentElement?.id as string;
    elemPlus.addEventListener('click', () => {
        if (num < 10) {
            elemOut.value = +elemOut.value + 1 + '';
            num++;
            let result: number = foodsLen.price + +summaLen.innerHTML;
            summaLen.innerHTML = result + '';
            kkcalSpan.innerHTML = +kkcalSpan.innerHTML + kkcalObj[burgerName as keyof IBurgersKkcal] + '';
        }
    })
    elemMinus.addEventListener('click', () => {
        if (num > 0) {
            elemOut.value = +elemOut.value - 1 + '';
            num--;
            let result: number = +summaLen.innerHTML - foodsLen.price;
            summaLen.innerHTML = result + '';
            kkcalSpan.innerHTML = +kkcalSpan.innerHTML - kkcalObj[burgerName as keyof IBurgersKkcal] + '';
        }
    })
}

interface IPrice {
    doubleMayonnaise: number;
    lettuce: number;
    cheese: number;
}
const prices: IPrice = {
    doubleMayonnaise: 500, lettuce: 400, cheese: 600,
}

////////////////////////////////////////////////KKCAL FUNCTION

const checkboxes = document.querySelectorAll('.main__product-checkbox') as NodeListOf<HTMLInputElement>;
checkboxes.forEach(item => item.addEventListener('change', e => {
    const thisInp = e.target as HTMLInputElement;
    const attrSpanandSection: string | null = thisInp.getAttribute('data-product');
    const attrProduct = thisInp.getAttribute('data-extra');
    const thisSpan = document.querySelector(`span[add-kkcal='${attrSpanandSection}']`) as HTMLSpanElement;
    const thisSection = document.getElementById(attrSpanandSection as string) as HTMLSelectElement;
    const sectionPirice = thisSection.children[1].children[1].children[0] as HTMLSpanElement;
    if (thisInp.checked) {
        thisSpan.innerHTML = +thisSpan.innerHTML + kkcalObj[attrProduct as keyof IKkcalObj] + '';
        sectionPirice.innerHTML = +sectionPirice.innerHTML + prices[attrProduct as keyof IPrice] + '';
    } else {
        thisSpan.innerHTML = +thisSpan.innerHTML - kkcalObj[attrProduct as keyof IKkcalObj] + '';
        sectionPirice.innerHTML = +sectionPirice.innerHTML - prices[attrProduct as keyof IPrice] + '';
    }
}))

///////////////////////////////////////////////// MODAL

const productImg = document.querySelectorAll('.main__product-info') as NodeListOf<HTMLDivElement>;
const getModal = document.querySelector('.view') as HTMLDivElement;

productImg.forEach(item => item.addEventListener('dblclick', () => {
    const srcAtribute = item.children[0].getAttribute('src') as string;
    const img = getModal.children[1] as HTMLImageElement;
    img.src = srcAtribute;
    getModal.classList.add('active');
}))

document.querySelector('.view__close')?.addEventListener('click', () => {
    getModal.classList.remove('active');
})

//////////////////////////// order

const orderSection = document.querySelector('.receipt') as HTMLDivElement;
const orderWindow = orderSection.children[0] as HTMLDivElement;

document.querySelector('.addCart')?.addEventListener('click', (e) => {
    e.preventDefault();
    orderSection.classList.remove('close');
    orderSection.classList.add('active');
    let products = '';
    let sum = 0;
    let orderKkcal = 0;
    productNum.forEach(item => {
        if (item.innerHTML != '0') {
            const productName = item.parentElement?.parentElement?.parentElement?.id as string;
            products += `${productName}(${item.innerHTML}); `;
            const price = item.parentElement?.parentElement?.children[1].children[0].innerHTML as string;
            sum += +price;
        }
    })
    kkcalSpans.forEach(span => {
        if (span.innerHTML != '0') {
            orderKkcal += +span.innerHTML;
        }
    })

    orderWindow.children[1].innerHTML = `
    <mark>Товары:</mark>
    ${products}
    <br>
    <mark>Калории:</mark> ${orderKkcal} калорий<br>
    <mark>Общая стоимость:</mark> ${sum} сум
    `
})

orderWindow.children[2].addEventListener('click', () => {
    document.location.reload();
});

/////// close order
orderSection.addEventListener('click', e => {
    const elem = e.target as HTMLElement
    if (elem.classList.contains('receipt__window')) return;
    orderSection.classList.remove('active');
    orderSection.classList.add('close');
    orderWindow.classList.add('close');
})