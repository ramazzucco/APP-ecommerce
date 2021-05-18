const getOptionsOrderBy = (handlerChange) => {
    return [
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: `price&direction=ASC`,
                    title: "menor precio",
                },
                input: {
                    className: "defaultcheckbox",
                    id: `price&direction=ASC`,
                    name: `price&direction=ASC`,
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: `price&direction=DESC`,
                    title: "mayor precio",
                },
                input: {
                    className: "defaultcheckbox",
                    id: `price&direction=DESC`,
                    name: `price&direction=DESC`,
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: `price&direction=ASC&max=30000`,
                    title: "menor a 30000",
                },
                input: {
                    className: "defaultcheckbox",
                    id: `price&direction=ASC&max=30000`,
                    name: `price&direction=ASC&max=30000`,
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: `price&direction=ASC&min=30000&max=60000`,
                    title: "30000 - 60000",
                },
                input: {
                    className: "defaultcheckbox",
                    id: `price&direction=ASC&min=30000&max=60000`,
                    name: `price&direction=ASC&min=30000&max=60000`,
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: `price&direction=ASC&min=60000&max=90000`,
                    title: "60000 - 90000",
                },
                input: {
                    className: "defaultcheckbox",
                    id: `price&direction=ASC&min=60000&max=90000`,
                    name: `price&direction=ASC&min=60000&max=90000`,
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: `price&direction=ASC&min=90000&max=120000`,
                    title: "90000 - 120000",
                },
                input: {
                    className: "defaultcheckbox",
                    id: `price&direction=ASC&min=90000&max=120000`,
                    name: `price&direction=ASC&min=90000&max=120000`,
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2 border-bottom pb-3",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: `price&direction=ASC&min=120000`,
                    title: "mayor a 120000",
                },
                input: {
                    className: "defaultcheckbox",
                    id: `price&direction=ASC&min=120000`,
                    name: `price&direction=ASC&min=120000`,
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2 mt-3",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: "discount&direction=DESC",
                    title: "mayor descuento",
                },
                input: {
                    className: "defaultcheckbox",
                    id: "discount&direction=DESC",
                    name: "discount&direction=DESC",
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2 border-bottom pb-3",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: "discount&direction=ASC",
                    title: "menor descuento",
                },
                input: {
                    className: "defaultcheckbox",
                    id: "discount&direction=ASC",
                    name: "discount&direction=ASC",
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2 mt-3",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: "marca&direction=ASC",
                    title: "marca (a-z)",
                },
                input: {
                    className: "defaultcheckbox",
                    id: "marca&direction=ASC",
                    name: "marca&direction=ASC",
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2 border-bottom pb-3",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: "marca&direction=DESC",
                    title: "marca (z-a)",
                },
                input: {
                    className: "defaultcheckbox",
                    id: "marca&direction=DESC",
                    name: "marca&direction=DESC",
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 mb-2 mt-3",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: "stock&direction=ASC",
                    title: "menor stock",
                },
                input: {
                    className: "defaultcheckbox",
                    id: "stock&direction=ASC",
                    name: "stock&direction=ASC",
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
        {
            id: "input",
            input: {
                div: "item col-12 col-lg-9 d-none d-md-flex align-items-center p-0 pb-2 mb-2 border-bottom pb-3",
                label: {
                    className: "col-10 p-0 pl-2 mb-1 bg-main-contrast-4",
                    htmlfor: "stock&direction=DESC",
                    title: "mayor stock",
                },
                input: {
                    className: "defaultcheckbox",
                    id: "stock&direction=DESC",
                    name: "stock&direction=DESC",
                    type: "checkbox",
                    placeholder: "",
                    onChange: handlerChange,
                    error: "",
                },
            },
        },
    ];
};

export { getOptionsOrderBy };
