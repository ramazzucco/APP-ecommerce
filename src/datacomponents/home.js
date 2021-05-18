const datainfocards = [
    {
        classnamecard: "border rounded-lg col-10 col-md-5 col-lg-3 mb-3 p-4 d-flex flex-column justify-content-center bg-main-contrast-3",
        icons: ["fab fa-bitcoin fa-5x mb-4"],
        title: {
            className: "title font-weight-bold text-capitalize",
            content: "crypto-currency"
        },
        description: {
            className: "description",
            content: "Aceptamos una gran variedad de cryptomonedas."
        },
        link: {
            to: "/page/paymentsmethods/#cryptocurrency",
            content: "> click for more info <"
        }
    },
    {
        classnamecard: "border rounded-lg col-10 col-md-5 col-lg-3 mb-3 p-4 d-flex flex-column justify-content-center bg-main-contrast-3",
        icons: ["far fa-credit-card fa-5x mb-4"],
        title: {
            className: "title font-weight-bold text-capitalize",
            content: "credit card"
        },
        description: {
            className: "description",
            content: "Aceptamos todas las tarjetas de creidto y debito."
        },
        link: {
            to: "/page/paymentsmethods/#creditcard",
            content: "> click for more info <"
        }
    },
    {
        classnamecard: "border rounded-lg col-10 col-md-5 col-lg-3 mb-3 p-4 d-flex flex-column justify-content-center bg-main-contrast-3",
        icons: ["fab fa-cc-paypal fa-4x mb-4","fab fa-cc-amazon-pay fa-4x ml-3 mb-4"],
        title: {
            className: "title font-weight-bold text-capitalize",
            content: "online-pay"
        },
        description: {
            className: "description",
            content: "Aceptamos medio de pagos online asociados a paypal y amazon."
        },
        link: {
            to: "/page/paymentsmethods/#onlinepay",
            content: "> click for more info <"
        }
    }
]

const generaldataproductcard = {
    carouselprovider: {
        classname: "overflow-hidden mb-5",
        style: {
            minHeight: '490px'
        },
        hasmasterspinner: true,
    },
    slide: {
        classname: "list-unstyled mt-3"
    },
    card:{
        classname:{
            card: `col-11 py-3 d-flex justify-content-between align-items-center card position-relative`,
            image: `image d-flex justify-content-center`,
            imagewidth: "90%",
            info: `info d-flex flex-wrap justify-content-center align-items-center`,
            infoName: `name w-100 text-center text-truncate`,
            infoPrice: "h5 mb-0",
            infoDiscount: "mb-0 ml-3",
            divButtons: "buy w-100 text-center p-2",
            linkbutton: 'd-flex flex-column justify-content-start pt-3', // Es para el link que contiene a la imagen y la informacion del producto.
            diviconfavourite: 'w-100 d-flex p-2',
            button: "w-100 rm-btn rm-orange mt-1 outline",
        },
        stylelink:{
            minWidth: '150px',
            maxWidth: '150px',
        },
        style: {
            minHeight: '400px',
        },
        stylediviconfavourite: {
            position: 'absolute',
            top: '0',
            left: '0'
        }
    },
    buttons: {
        container: {
            classname: "buttonsSlide w-100 d-flex position-absolute",
            style: {top: "40%"},
        },
        back: {
            classname: "btn",
            content: <i className="fas fa-arrow-circle-left fa-2x text-color-main"></i>,
        },
        next: {
            classname: "btn ml-auto",
            content: <i className="fas fa-arrow-circle-right fa-2x text-color-main"></i>,
        }
    }
}

export { datainfocards, generaldataproductcard }