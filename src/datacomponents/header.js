import { handlersubmenu, toggleIcon } from "../services/index";

export default function Style(props, showlogin, showsignup, handlerButtonMenu, logout){
    const styles = [
        {
            id: "styledefault",
            backgroundcolor: {
                header: "",
                brand: "",
                buttonmenu: "rm-btn-outline rm-orange",
                submenuheader: "submenudefault main-color",
                submenuavatar: "submenudefault main-color",
            },
            textcolor: {
                link: "",
                submenuheader: "sublink",
                submenuavatar: "sublink"
            }
        },
        {
            id: "light",
            backgroundcolor: {
                header: "header1",
                brand: "",
                submenuheader: "submenu1"
            },
            textcolor: {
                header: "",
                link: "link1"
            }
        },
    ]

    const backgroundcolor = styles.filter( style => style.id === props.style )[0].backgroundcolor;
    const textcolor = styles.filter( style => style.id === props.style )[0].textcolor;

    const classHeader = `d-flex flex-wrap p-2 position-static ${backgroundcolor.header}`;

    const classBrandDiv = `brand col-1 p-0`;
    const classBrandImg = `${backgroundcolor.brand}`;

    const classButtonMenuDiv = `col-11 d-flex d-md-none align-items-center justify-content-end`;
    const classButtonMenu = `${backgroundcolor.buttonmenu}`;

    const classNav = `dropdown col-12 col-md-8 p-0 d-flex flex-md-row-reverse flex-wrap align-items-center`;

    const classSearchDiv = `search col-11 col-md-12 col-lg-5 col-xl-6 d-flex justify-content-lg-end p-0 mx-auto position-relative`;
    const classInputSearch = `col-8 ml-auto`;
    const classLabelSearch = `d-flex justify-content-end align-items-center col-2 pl-0 m-0`;

    const classLinksDiv = `links col-12 pl-md-0 col-md-12 col-lg-7 col-xl-6 d-flex flex-column flex-md-row justify-content-between align-items-center`;
    const classLink = `${textcolor.link} outline py-2 py-md-0`;

    // const classUsersButton = `dropdown col-12 col-md-4 p-0 d-flex justify-content-center justify-content-md-end my-3 my-md-0`;
    const classButtonLogin = `col-4 col-sm-2 col-md-5 rm-btn-outline rm-orange text-uppercase`;
    const classButtonSignup = `col-4 col-sm-2 col-md-5 rm-btn rm-orange text-uppercase ml-3`;

    const classSubmenuHeader = `submenu headerlinks ${backgroundcolor.submenuheader} text-center d-none text-capitalize shadow`;
    const classSubmenuHeaderLink = `${textcolor.submenuheader} my-2`;

    const classSubmenuAvatar = `submenu avatar ${backgroundcolor.submenuavatar} d-none text-capitalize shadow`;
    const classSubmenuAvatarLink = `${textcolor.submenuavatar} my-2`;

    const classSubmenuCart = `submenu cart ${backgroundcolor.submenuavatar} d-none text-capitalize shadow`;
    const classSubmenuCartContentDiv = 'content';
    const classSubmenuCartContentP = 'empty w-100 text-center text-light';
    const classSubmenuCartButtonDiv = 'buttons mt-3';
    const classSubmenuCartButtonClear = 'btn border-0 outline mr-3 text-sombra-main-4';
    const classSubmenuCartButtonGocart = 'btn border-0 outline';

    const classSubmenuBell = `submenu bell ${backgroundcolor.submenuavatar} d-none text-capitalize text-light`;

    const classAvatarDiv = `usersheader col-12 col-md-3 d-none d-md-flex justify-content-center justify-content-md-end align-items-center flex-wrap my-3 m-md-0`;
    const classAvatarImg = "justify-content-end outline ml-md-auto mr-md-2 mr-lg-0"
    const classAvatarP = `username text-capitalize m-0 ml-3 d-md-none d-lg-flex  justify-content-end text-color-main`;

    const header = {
        header: classHeader,
        brand: {
            div: classBrandDiv,
            img: classBrandImg
        },
        buttonmenudiv: classButtonMenuDiv,
        buttonmenu: classButtonMenu,
        classnav: classNav,
        search: {
            div: classSearchDiv,
            input: classInputSearch,
            label: classLabelSearch
        },
        links: {
            classdiv: classLinksDiv,
            classlink: classLink,
            data:  [
                {
                    title: "Home",
                    link: "/page",
                },
                {
                    submenu: true,
                    title: "Categories",
                    link: "/page/todaslascategorias",
                    icon: <i className="fa fa-chevron-up d-none float-right d-md-flex ml-1 mt-2" style={{fontSize:'0.8rem'}}></i>,
                    onClick: () => {
                        handlersubmenu("headerlinks", props.width);
                        toggleIcon('#Categories i','up','fa-chevron-up','fa-chevron-down');
                    },
                },
                {
                    title: "About Us",
                    link: "/page/aboutus",
                },
                {
                    title: "Contact",
                    link: "/page/contact",
                },
                {
                    title: "Faq",
                    link: "/page/faq",
                }
            ]
        },
        usersbuttons: {
            data: [
                {
                    id: "loginheader",
                    title: "Login",
                    content: "",
                    className: classButtonLogin,
                    type: "button",
                    onClick: showlogin,
                },
                {
                    id: "signupheader",
                    title: "Signup",
                    content: "",
                    className: classButtonSignup,
                    type: "button",
                    onClick: showsignup,
                }
            ],
            avatar: {
                div: classAvatarDiv,
                img: classAvatarImg,
                p: classAvatarP
            }
        },
        submenuheader: {
            div: classSubmenuHeader,
            link: classSubmenuHeaderLink,
        },
        submenuavatar: {
            div: classSubmenuAvatar,
            link: classSubmenuAvatarLink
        },
        submenucart: {
            classname:{
                div: classSubmenuCart,
                content: {
                    div: classSubmenuCartContentDiv,
                    p: classSubmenuCartContentP
                },
                buttons: {
                    div: classSubmenuCartButtonDiv,
                    clear: classSubmenuCartButtonClear,
                    gocart: classSubmenuCartButtonGocart
                }
            },
        },
        submenubell: {
            div: classSubmenuBell
        }
    }

    const categories = [
        {
            title: "celulares",
            path: `/page/celulares`,
            className: header.submenuheader.link,
        },
        {
            title: "laptops",
            path: `/page/laptops`,
            className: header.submenuheader.link,
        },
        {
            title: "parlantes",
            path: `/page/parlantes`,
            className: header.submenuheader.link,
        },
        {
            title: "teclados",
            path: `/page/teclados`,
            className: header.submenuheader.link,
        },
        {
            title: "mouse",
            path: `/page/mouse`,
            className: header.submenuheader.link,
        },
    ]

    const buttonmenu = {
        id:"buttonmenuheader",
        title: "",
        content: <i className="fas fa-bars fa-2x"></i>,
        className: header.buttonmenu,
        type: "button",
        onClick: handlerButtonMenu
    }

    const avatar = {
        link: props.user && props.user.user.status !== 2 ? "/page/users" : "/admin",
    }

    const myprofile = [
        {
            title: "my profile",
            link: props.user && props.user.user.status !== 2 ? "/page/users" : "/admin",
            className: classSubmenuAvatarLink
        },
        {
            title: "logout",
            link: "/page",
            onClick: logout,
            className: classSubmenuAvatarLink
        }
    ]

    return {
        header,
        categories,
        buttonmenu,
        avatar,
        myprofile,
    }

}