import attributeStyles from "./index";
import { formlight1 } from "./form";

const colors = attributeStyles().colors;

const light1 = {
    id: "light1",
    title: "Tema light 1",
    login: formlight1,
    header: {
        divheader: {
            ...attributeStyles("end").justifycontentbetween,
            backgroundColor: colors.primary,
            minHeight: "10vh",
        },
        divBrand: {
            width: "",
            ...attributeStyles("end").justifycontentaround,
        },
        brand: {
            width: "77px",
            maxHeight: "10vh",
        },
        links: {
            ...attributeStyles("end").justifycontentbetween,
            width: "50%",
            margin: "0 0 8px 0",
        },
        buttons: {
            users: {
                div: {
                    width: "",
                    ...attributeStyles("start").justifycontentaround,
                    margin: "0 0 8px auto",
                },
                unhover: {
                    border: `1px solid ${colors.dark}`,
                    borderRadius: "5px",
                    backgroundColor: "transparent",
                    paddingBottom: "5px",
                    color: colors.dark,
                    marginLeft: "30px",
                    outline: "none",
                },
                hover: {
                    border: `1px solid ${colors.dark}`,
                    borderRadius: "5px",
                    paddingBottom: "5px",
                    color: colors.dark,
                    filter: "invert(30%)",
                    marginLeft: "30px",
                    outline: "none",
                },
            },
            menu: {
                unhover: {
                    border: `1px solid ${colors.dark}`,
                    borderRadius: "5px",
                    backgroundColor: "transparent",
                    color: colors.dark,
                    outline: "none",
                },
                hover: {
                    border: `1px solid ${colors.dark}`,
                    borderRadius: "5px",
                    color: colors.dark,
                    filter: "invert(30%)",
                    outline: "none",
                },
            }
        },
        userImg: {
            width: "30px",
            backgroundColor: "none",
            border: "none",
        },
        userName: {
            width: "",
            ...attributeStyles("end").justifycontentaround,
            margin: "0 0 8px 0",
        },
        headerP: {
            marginBottom: "0",
            marginTop: "3px",
        },
    },
    // Section.
    section: {
        backgroundColor: colors.light,
        minHeight: "60vh",
    },
    submenu: {
        ...attributeStyles().alignitemscenter,
        backgroundColor: colors.lightblue,
        outline: "none",
    },
    submenulink: {
        color: colors.dark,
    },
    footer: {
        backgroundColor: colors.primary,
        minHeight: "30vh",
    },
};

const dark1 = {
    id: "dark1",
    title: "Tema dark 1",
    header: {
        ...attributeStyles("end").justifycontentbetween,
        backgroundColor: "black",
        minHeight: "10vh",
        color: "white",
    },
    section: {
        backgroundColor: "black",
        filter: "opacity(30%)",
        minHeight: "60vh",
    },
    footer: {
        backgroundColor: "black",
        minHeight: "30vh",
    },
};

const styledefault = {
    id: "styledefault",
    title: "Tema default",
    login: light1.login,
    header: light1.header,
    section: light1.section,
    submenu: light1.submenu,
    submenulink: light1.submenulink,
    //footer
    footer: light1.footer,
};

export { styledefault, light1, dark1 }
