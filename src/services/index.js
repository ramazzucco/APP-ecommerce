import { urlbase } from "./getInfoPage";

const root = document.getElementById("root");
let width;

width = root.clientWidth;

window.onresize = () => {
    width = window.innerWidth;
}

const qS = (selector) => {
    return document.querySelector(selector);
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
    // const section = document.querySelector("section");

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
            icon: action === 'successful' ?
                'fas fa-check-circle fa-2x text-success' : 'fas fa-exclamation-triangle fa-2x text-danger',
            title: `mb-1 ml-3 ${action === 'successful' ? 'text-success' : 'text-danger'} h3`,
            section: 'mt-5',
            content: `text-center text-${action === 'successful' ? 'success' : 'danger'} mb-0`,
            divbutton: 'button d-flex justify-content-center',
            button: `w-50 btn btn-sm btn-outline-${action === 'successful' ? 'success' : 'danger'} mt-5`
        },
        style: {
            div: `border-top: 5px solid ${action === 'successful' ? '#28A745' : '#DC3545'}`
        }
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

export {
    width,
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
    gEbID,
    modal,
}