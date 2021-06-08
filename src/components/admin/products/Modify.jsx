import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getDataForm } from '../../../datacomponents/admin/products'
import { modal, qS, compareObjects } from '../../../services'
import { urlbase } from '../../../services/getInfoPage'
import { submit } from '../../../services/handlerForm'

// Components.
import Form from '../../form/Form'
import Input from '../../form/Input'

export default function Modify(props) {

    const [ products, setProducts ] = useState([])
    const [ datapost, setDatapost ] = useState()
    const [ categories, setCategories ] = useState([])

    const params = useParams();

    useEffect(() => {
        qS('.products .modify-product').classList.add('show');
    },[])

    useEffect(() => {
        if(params){
            props.products.map( product => {
                if(product.id === Number(params.id)) setDatapost(product);
                return '';
            })
        }
    },[props.products,params])

    useEffect(() => {
        const category = qS('.modify-product #category_id');
        const selectproduct = qS('.modify-product #order-list-product');
        if(category) category.options.selectedIndex = datapost.category_id - 1;
        if(selectproduct && !datapost) selectproduct.options.selectedIndex = 0;
    },[datapost])

    useEffect(() => {
        if(props.categories && categories.length === 0) setCategories(props.categories);
    },[props.categories, categories])

    useEffect(() => {
        if(products.length === 0){
            setProducts(props.products);
        }
    },[props.products,products])

    const handlerOnChange = (e) => {
        products.map( product => {
            if(product.id === Number(e.target.value)) setDatapost(product);
            return '';
        })
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();

        const productocompare = props.products.filter(product => product.id === datapost.id)[0];

        // Le agrego la propiedad que falta para que no tire error la funcion compareObjects.
        if(typeof datapost.image === 'object') productocompare.oldimage = datapost.oldimage;

        if(compareObjects(datapost, productocompare)){
            modal('warning', 'Cuidado !', 'Debe modificar el producto para ser enviado.');
            qS('.modal-info div').classList.replace('bg-main-sombra-2','bg-green-sheen');
        } else {
            const url = `${urlbase}/api/product/update`;
            const token = localStorage.getItem('token');

            let options;

            if(typeof datapost.image === 'string'){
                options = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({...datapost, token: token})
                }
            } else {
                const formdata = new FormData(qS('form#modify-product'));

                formdata.append('token', token);
                formdata.append('id', datapost.id);
                formdata.append('image', datapost.image);
                formdata.append('oldimage', datapost.oldimage);

                options = {
                    method: 'PUT',
                    body: formdata
                }
            }

            const submitform = await submit(url, options, props.setProducts, 'modify-product', props.products);

            if(submitform && submitform.successful){
                modal('successful', 'Enhorabuena !', 'El producto fue modificado');
            }
            qS('.modal-info div').classList.replace('bg-main-sombra-2','bg-opal');

        }
    };

    const handlerChange = (e) => {
        setDatapost({...datapost, [e.target.name]: e.target.value});
    };

    const handlerCancel = () => {
        setDatapost();
        if(products.length === 0) setProducts(props.products);
    }

    const dataform = getDataForm(
        'modify-product',
        handlerSubmit,
        handlerChange,
        handlerCancel,
        categories,
        datapost
    );

    const handlerChangeImage = (e) =>{
        qS('.error.image').innerHTML = '';

        const preview = document.querySelector('.modify-product .image img');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
        }

        if(file) reader.readAsDataURL(file);

        setDatapost({...datapost, oldimage: datapost.oldimage, image: e.target.files[0]})
    }

    const datainputimage = {
            div: 'w-100',
            label: {
                className: 'w-100 btn-admin btn-green-sheen mt-3 pointer text-center py-2 mb-1 px-2',
                htmlfor: "image",
                title: "Cambiar imagen",
                icon: <i className="fas fa-upload align-self-center mr-3"></i>
            },
            input: {
                className: '',
                id: "image",
                name: "image",
                type: "file",
                placeholder: '',
                error: "error image",
                required: true,
                classNameError: 'd-flex justify-content-start align-items-center w-100 text-danger',
                icon: '',
                onChange: handlerChangeImage,
            },
    }

    return (
        <div className='modify-product section pl-4 pl-lg-2 pr-md-0 my-3'>
            <div className="title bg-opal text-champagne text-left rounded px-4 py-1 mt-4">
                <h3 className='d-flex flex-wrap align-items-center'>
                    Modificar producto
                    <span className='h4 ml-md-5 mb-0 align-self-end text-truncate'>
                        {datapost ? `"${datapost.name}"` : ''}
                    </span>
                </h3>
            </div>
            <div className='col-12 d-flex flex-wrap align-items-center my-3 px-4'>
                <label htmlFor="order-list-product" className='text-green-sheen pl-1 pl-sm-0 mb-0 mr-4'>
                    Seleccione un producto
                </label>
                <select
                    name="order-list-product"
                    id="order-list-product"
                    className='col-12 col-md-8 col-lg-6 bg-champagne text-green-sheen text-center rounded py-1 px-3'
                    onChange={handlerOnChange}
                >
                    <option disabled defaultValue={true}>-</option>
                    {
                        products
                            ? products.map( (product, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={product.id}
                                    >
                                        {product.name}
                                    </option>
                                )
                            })
                            : <option disabled>
                                No hay productos.
                            </option>
                    }
                </select>
            <hr className='mt-3 mb-0 w-100' />
            </div>
            <div className='d-flex flex-column-reverse flex-md-row flex-wrap justify-content-center px-4'>
                {
                    datapost
                        ? <React.Fragment>
                            <Form {...dataform} />
                            <div className='image d-flex flex-column align-items-center col-12 col-md-4'>
                                <p className='mt-4 mb-2 align-self-start text-green-sheen'>
                                    Imagen
                                </p>
                                <img
                                    src={`${urlbase}/images/${datapost.image}`}
                                    alt={`${datapost.name}`}
                                    width='100%'
                                    className='border-green-sheen rounded'
                                />
                                <Input {...datainputimage} />
                            </div>
                        </React.Fragment>
                        : <p className='text-center h5 my-5'>
                            Ningun producto seleccionado!
                        </p>
                }
            </div>
        </div>
    )
}
