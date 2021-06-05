const getDataForm = (id,handlerSubmit,handlerChange,handlerCancel,categories,inputvalue,) => {
    const classdivgroup = 'input-group d-flex flex-column justify-content-end col-12 col-md-10 col-lg-8 text-metallic-seaweed mb-2';
    const classlabel = 'mb-1';
    const classinput = 'bg-transparent text-champagne-contrast-2 rounded p-2';

    const dataform = {
        form: {
            id: id,
            className: 'col-12 col-md-8 p-0 d-flex flex-wrap align-items-start justify-cntent-start my-4 pb-4',
            onSubmit: handlerSubmit,
            buttons: {
                className: 'order-9 d-flex flex-wrap justify-content-start align-items-center col-12 mt-4',
                submit: {
                    className: 'btn-admin col-12 col-md-5 col-lg-3 py-2'
                },
                button: {
                    className: 'btn-admin-outline ml-md-4 mt-2 mt-md-0 col-12 col-md-5 col-lg-3 py-2',
                    onClick: () => handlerCancel(),
                }
            }
        },
        fields: [
            {
                id: "select",
                select: {
                    div: classdivgroup + ' order-1',
                    label: {
                        className: classlabel,
                        htmlfor: "category_id",
                        title: "Categoria",
                        icon: ''
                    },
                    select: {
                        className: classinput + ' py-1 text-metallic-seaweed',
                        classNameOptions: 'bg-champagne',
                        id: "category_id",
                        name: "category_id",
                        type: "",
                        placeholder: "",
                        required: true,
                        classNameError: 'd-flex justify-content-start align-items-center w-100 text-danger',
                        error: "error category_id",
                        options: categories ? categories.map( (category,i) => {
                            return {
                                value: category.id,
                                title: category.title,
                            }
                        }) : '',
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classdivgroup + ' order-2',
                    label: {
                        className: classlabel,
                        htmlfor: "marca",
                        title: "Marca",
                    },
                    input: {
                        className: classinput,
                        id: "marca",
                        name: "marca",
                        type: "text",
                        placeholder: "",
                        value: inputvalue ? inputvalue.marca : '',
                        error: "error marca",
                        required: true,
                        classNameError: 'd-flex justify-content-start align-items-center w-100 text-danger',
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classdivgroup + ' order-3',
                    label: {
                        className: classlabel,
                        htmlfor: "name",
                        title: "Nombre",
                    },
                    input: {
                        className: classinput,
                        id: "name",
                        name: "name",
                        type: "text",
                        placeholder: "",
                        value: inputvalue ? inputvalue.name : '',
                        error: "error name",
                        required: true,
                        classNameError: 'd-flex justify-content-start align-items-center w-100 text-danger',
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classdivgroup + ' order-4',
                    label: {
                        className: classlabel,
                        htmlfor: "price",
                        title: "Precio",
                    },
                    input: {
                        className: "position-relative bg-transparent rounded p-2 pl-5",
                        id: "price",
                        name: "price",
                        type: "number",
                        placeholder: '',
                        value: inputvalue ? inputvalue.price : '',
                        error: "error price",
                        required: true,
                        classNameError: 'd-flex justify-content-start align-items-center w-100 text-danger',
                        icon: 'fas fa-dollar-sign position-absolute fa-2x ml-2 mb-1',
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classdivgroup + ' order-5',
                    label: {
                        className: classlabel,
                        htmlfor: "discount",
                        title: "Descuento",
                    },
                    input: {
                        className: classinput,
                        id: "discount",
                        name: "discount",
                        type: "number",
                        placeholder: '',
                        value: inputvalue ? inputvalue.discount : '',
                        error: "error discount",
                        required: true,
                        classNameError: 'd-flex justify-content-start align-items-center w-100 text-danger',
                        icon: '',
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classdivgroup + ' order-6',
                    label: {
                        className: classlabel,
                        htmlfor: "stock",
                        title: "Unidades disponibles",
                    },
                    input: {
                        className: classinput,
                        id: "stock",
                        name: "stock",
                        type: "number",
                        placeholder: '',
                        value: inputvalue ? inputvalue.stock : '',
                        error: "error stock",
                        required: true,
                        classNameError: 'd-flex justify-content-start align-items-center w-100 text-danger',
                        icon: '',
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classdivgroup.replace('d-flex flex-column justify-content-end','d-inline') + ' order-7',
                    label: {
                        className: classlabel + ' p-2 mb-2 mt-4 file',
                        htmlfor: "image",
                        title: "Agregar imagen",
                        icon: <i className="fas fa-upload align-self-center mr-3"></i>
                    },
                    input: {
                        className: classinput,
                        id: "image",
                        name: "image",
                        type: "file",
                        placeholder: '',
                        error: "error image",
                        required: true,
                        classNameError: 'd-flex justify-content-start align-items-center w-100 text-danger',
                        icon: '',
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "textarea",
                textarea: {
                    div: classdivgroup.replace('col-md-10 col-lg-8','') + ' order-8',
                    label: {
                        className: classlabel,
                        htmlfor: "description",
                        title: "Descripcion",
                    },
                    textarea: {
                        className: classinput,
                        id: "description",
                        name: "description",
                        type: "text",
                        placeholder: '',
                        value: inputvalue ? inputvalue.description : '',
                        error: "error description",
                        required: true,
                        classNameError: 'd-flex justify-content-start align-items-center w-100 text-danger',
                        icon: '',
                        onChange: handlerChange,
                    },
                }
            },
        ]
    }

    return id === 'modify-product' ? {
        ...dataform,
        fields: dataform.fields.filter((field,i) => i !== 6)
    } : dataform;
}

export { getDataForm }