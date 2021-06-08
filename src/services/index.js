import { urlbase } from "./getInfoPage";

// const root = document.getElementById("root");
// let width;

// width = root.clientWidth;

// window.onresize = () => {
//     width = window.innerWidth;
// }

const qS = (selector) => {
    return document.querySelector(selector);
}
const qSall = (selector) => {
    return document.querySelectorAll(selector);
}
const gEbID = (id) => {
    return document.getElementById(id);
}

const toggleIcon = (selector,includes,icon1,icon2) => {
    const icon = document.querySelector(selector);

    icon.className.includes(includes)
        ? icon.classList.replace(icon1,icon2)
        : icon.classList.replace(icon2,icon1);
}

const getRememberTheme = () => {
    const remembertheme = localStorage.getItem("theme");
    return remembertheme;
}


const getSession = async () => {
    const getsession = localStorage.getItem("session");
    const session = await JSON.parse(getsession);

    return session;
}

const hidesubmenues = (e) => {
    if(e.target.className.includes("submenu")) e.target.classList.add("d-none");
};

const handlersubmenu = (selector, responsive) => {
    const submenues = document.querySelectorAll(".submenu");

    if(responsive){  // Si el ancho es menor a 768px cuando clickea evita que se abra el sub menu.
        if(responsive > 768){
            submenues.forEach( submenu => {

                if(submenu.className.includes(selector)){
                    submenu.classList.toggle("d-none");
                } else {
                    if(!submenu.className.includes("d-none")){
                        submenu.classList.toggle("d-none");
                    }
                }
            })
        }
    } else {
        submenues.forEach( submenu => {

            if(submenu.className.includes(selector)){
                submenu.classList.toggle("d-none");
            } else {
                if(!submenu.className.includes("d-none")){
                    submenu.classList.toggle("d-none");
                }
            }
        })
    }

}

const responsiveHideSubmenues = (width) => {
    const submenues = document.querySelectorAll(".submenu");

    submenues.forEach( submenu => {
        if(submenu && width < 768 && !submenu.className.includes("d-none")){
            submenu.classList.toggle("d-none")
        }
    })
}


const closeSubMenues = () => {
    const submenues = document.querySelectorAll('.submenu');
    const section = document.querySelector('section');

    if(section){
        submenues.forEach( submenu => {
            if(!submenu.className.includes('d-none')) submenu.classList.toggle('d-none');
            if(submenu.className.includes('headerlinks')){
                document.querySelector('.links #Categories i').classList.replace('fa-chevron-down','fa-chevron-up');
            }
        })
    }
}

const addToCart = (e,user,items,setItems,product) => {
    let cart = JSON.parse(localStorage.getItem('cart'));

    const newitem = `<div class="item col-11 px-2 d-flex rounded my-3 mx-auto py-3 sombra-main-2 shadow-sm">
        <i class="far fa-window-close w-100 text-right pr-3 mb-2 pointer"></i>
            <div class='image'>
                <img src='${urlbase}/images/${product.image}' alt='${product.name}' width='30px'/>
            </div>
            <div class='info d-flex flex-wrap pl-2 text-left' style='font-size: 0.8rem'>
                <p class='w-100 mb-1'>${product.name}</p>
                <p class='mr-3'>$ ${product.price}</p>
                <p>${product.discount > 0 ? product.discount + ' % OFF': ''}</p>
            </div>
    </div>`;

    if(cart){
        const savecart = { user: user, cantitems: items + 1, items: cart.items + newitem, products: [...cart.products, product] };

        localStorage.setItem('cart',JSON.stringify(savecart));

        if(user.tokenhashed) localStorage.setItem('userdatacart', JSON.stringify(savecart))

    } else {
        const savecart = { user: user, cantitems: items + 1, items: newitem, products: [product] };

        localStorage.setItem('cart',JSON.stringify(savecart));

        if(user.tokenhashed) localStorage.setItem('userdatacart', JSON.stringify(savecart))
    }

    document.querySelector('.submenu.cart .content').innerHTML += newitem;

    setItems(items + 1);
}

const addFavourite = (e) => {
    const id = e.target.attributes.dataid.value;
    const iconheart = gEbID(id);
    const favouriteproducts = JSON.parse(localStorage.getItem('favourite'));

    iconheart.className.includes('far')
        ? iconheart.classList.replace('far','fas')
        : iconheart.classList.replace('fas','far');

    if(!favouriteproducts){
        const favouriteid = JSON.stringify({ ids: [ e.target.attributes.dataid.value ] });

        localStorage.setItem('favourite', favouriteid);
    } else {
        let favouriteids

        favouriteproducts.ids.map( id => {
            if(id === e.target.attributes.dataid.value){
                favouriteids = { ids: favouriteproducts.ids.filter( id => id !== e.target.attributes.dataid.value)}
            } else {
                favouriteids = { ids: [...favouriteproducts.ids, e.target.attributes.dataid.value]}
            }

            return 'done';
        })

        favouriteids.ids.length
            ? localStorage.setItem('favourite', JSON.stringify(favouriteids))
            : localStorage.removeItem('favourite');
    }
}

const getFavourite = () => {

    const favourite = JSON.parse(localStorage.getItem('favourite'));

    if(favourite){
        favourite.ids.map( fId => {
            const cards = document.querySelectorAll(`.card${fId} .fa-heart`);

            if(cards){
               cards.forEach( card => {
                   card.classList.replace('far','fas');
               })
            }
            return 'done';
        })
    }
}

const saveUserPreference = () => {
    window.onbeforeunload = async () => {
        const datacart = JSON.parse(localStorage.getItem('userdatacart'));

        if(datacart !== null){

            const favourite = JSON.parse(localStorage.getItem('favourite'));

            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...datacart.user,
                    datasession: {
                        cantitems: datacart.cantitems,
                        items: datacart.items,
                        favourite: favourite.ids
                    }
                }),
            };
            const request = await fetch(urlbase + '/api/apiUsers/savesession', options);
            const response = await request.json();

            console.log(response)
        }
    }
}

const modal = (action, title, content) => {
    const data = {
        className: {
            div: 'col-10 col-md-8 col-lg-6 bg-main-sombra-2 mx-auto p-5 shadow position-absolute rounded',
            header: 'd-flex justify-content-center align-items-center',
            icon: '',
            title: `mb-1 ml-3 h3`,
            section: 'mt-5',
            content: `text-center mb-0`,
            divbutton: 'button d-flex justify-content-center',
            button: `w-50 btn btn-sm mt-5`
        },
        style: {
            div: 'border-top: 5px solid'
        }
    }

    if(action === 'successful'){
        data.className.div = data.className.div + ' text-success';
        data.className.icon = data.className.icon + ' fas fa-check-circle fa-2x text-success';
        data.className.button = data.className.button + ' btn-outline-success';
        data.style.div = data.style.div + ' #28A745';
    }
    if(action === 'warning'){
        data.style.div = data.style.div + ' #FFC107';
        data.className.div = data.className.div + ' text-warning';
        data.className.icon = data.className.icon + ' fas fa-exclamation-triangle fa-2x text-warning';
        data.className.button = data.className.button + ' btn-outline-warning';
    }
    if(action === 'failed'){
        data.style.div = data.style.div + ' #DC3545';
        data.className.div = data.className.div + ' text-danger';
        data.className.icon = data.className.icon + ' fas fa-exclamation-triangle fa-2x text-danger';
        data.className.button = data.className.button + ' btn-outline-danger';
    }

    qS('.container-modalinfo').classList.toggle('d-none');

    const div = qS('.modal-info div');

    div.classList.value = data.className.div;
    div.setAttribute('style', data.style.div);

    qS('.modal-info header').classList.value = data.className.header;
    qS('.modal-info header i').classList.value = data.className.icon;
    qS('.modal-info header p').classList.value = data.className.title;
    qS('.modal-info header p').innerHTML = title;

    qS('.modal-info section').classList.value = data.className.section;
    qS('.modal-info section p').classList.value = data.className.content;
    qS('.modal-info section p').innerHTML = `"${content}"`;
    qS('.modal-info section div').classList.value = data.className.divbutton;
    qS('.modal-info section button').classList.value = data.className.button;

}

const productListBy = () => {
    const id = (a,b) => {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    }

    const category = (a,b) => {
        if (a.category.title > b.category.title) {
            return 1;
        }
        if (a.category.title < b.category.title) {
            return -1;
        }
        return 0;
    }

    const name = (a,b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    }

    const brand = (a,b) => {
        if (a.marca > b.marca) {
            return 1;
        }
        if (a.marca < b.marca) {
            return -1;
        }
        return 0;
    }

    const price = (a,b) => {
        if (Number(a.price) > Number(b.price)) {
            return 1;
        }
        if (Number(a.price) < Number(b.price)) {
            return -1;
        }
        return 0;
    };

    const discount = (a,b) => {
        if (a.discount > b.discount) {
            return 1;
        }
        if (a.discount < b.discount) {
            return -1;
        }
        return 0;
    }

    const stock = (a,b) => {
        if (a.stock > b.stock) {
            return 1;
        }
        if (a.stock < b.stock) {
            return -1;
        }
        return 0;
    }

    return {
        id,
        category,
        name,
        brand,
        price,
        discount,
        stock
    }
}

const usersListBy = () => {
    const id = (a,b) => {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    }

    const name = (a,b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    }

    const email = (a,b) => {
        if (a.email > b.email) {
            return 1;
        }
        if (a.email < b.email) {
            return -1;
        }
        return 0;
    }

    const address = (a,b) => {
        if (a.address > b.address) {
            return 1;
        }
        if (a.address < b.address) {
            return -1;
        }
        return 0;
    };

    const city = (a,b) => {
        if (a.city > b.city) {
            return 1;
        }
        if (a.city < b.city) {
            return -1;
        }
        return 0;
    }

    const status = (a,b) => {
        if (Number(a.status) > Number(b.status)) {
            return 1;
        }
        if (Number(a.status) < Number(b.status)) {
            return -1;
        }
        return 0;
    }

    return {
        id,
        name,
        email,
        address,
        city,
        status
    }
}

const compareObjects = (obj1,obj2) => {
    const haschange = [];

    if(Object.keys(obj1).length === Object.keys(obj2).length){
        const objlength = Object.keys(obj1).length - 1;
        const ob1values = Object.values(obj1).slice(0,objlength);
        const obj2values = Object.values(obj2).slice(0,objlength);

        for (let i = 0; i < objlength ; i++) {
            haschange.push(Object.is(`${ob1values[i]}`,`${obj2values[i]}`))
        }
    } else {
        window.alert('La funcion ("compareObjects") compara objetos con la misma cantidad de propiedades.')
        console.log('La funcion ("compareObjects") compara objetos con la misma cantidad de propiedades.');
    }

    return haschange.every( value => value === true);
}

export {
    // width,
    getRememberTheme,
    getSession,
    handlersubmenu,
    closeSubMenues,
    hidesubmenues,
    responsiveHideSubmenues,
    addFavourite,
    getFavourite,
    addToCart,
    toggleIcon,
    saveUserPreference,
    qS,
    qSall,
    gEbID,
    modal,
    productListBy,
    usersListBy,
    compareObjects
}