import React, { useEffect, useState } from 'react';
import { getDataForm } from '../../../datacomponents/admin/products';
import { modal, qS } from '../../../services';
import { urlbase } from '../../../services/getInfoPage';
import { cancel, submit } from '../../../services/handlerForm';

// Components.
import Form from '../../form/Form';
import Preview from './Preview';

export default function Add(props) {

    const [ datapost, setDatapost ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ amountofproducts, setAmountofproducts ] = useState(0)
    const [ addmultipleproduct, setAddmultipleproduct ] = useState([])

    useEffect(() => {
        qS('.products .add-product').classList.add('show');
    },[])

    useEffect(() => {
        if(props.categories && categories.length === 0){
            setCategories([{
                id: '',
                title: 'Seleccione una categoria'
            },
            ...props.categories
            ])
        }
    },[props.categories, categories])

    const handlerChange = (e) => {

        if(e.target.classList.value.includes("text-danger")){
            e.target.classList.remove("border","border-danger","text-danger");
            e.target.nextSibling.innerHTML = '';
        }

        if(e.target.name === 'image'){
            setDatapost({...datapost, [e.target.name]: e.target.files[0]})

            const preview = document.querySelector('.product-preview img');
            const file    = document.querySelector('input[type=file]').files[0];
            const reader  = new FileReader();

            reader.onloadend = function () {
                preview.src = reader.result;
            }

            if(file) reader.readAsDataURL(file);
        } else {
            setDatapost({...datapost, [e.target.name]: e.target.value})
        }

    }

    const handlerSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const url = urlbase + "/api/product/create";

        const formdata = new FormData(document.querySelector("form#add-product"));

        formdata.append('token', token);

        const options = {
            method: 'POST',
            body: formdata
        }

        const submitform = await submit(url, options, props.setProducts, 'add-product', props.products);

        if(submitform && submitform.successful){
            modal('successful', 'Enhorabuena !', 'El producto fue agregado');
            qS('.modal-info div').classList.replace('bg-main-sombra-2','bg-opal');
            cancel('add-product');
            setDatapost([]);
        }

    }

    const handlerCancel = () => {
        cancel('add-product');
        setDatapost([]);
    }

    const dataform = getDataForm(
        'add-product',
        handlerSubmit,
        handlerChange,
        handlerCancel,
        categories,
        datapost,
    );

    const handlerAmountOfProducts = (e) =>{

        amountofproducts < e.target.value
            ? setAmountofproducts(amountofproducts + 1)
            : setAmountofproducts(amountofproducts - 1)

    }

    useEffect(() => {
        if(amountofproducts > 0){

            const formselement = [];

            for (let i = 0; i < amountofproducts; i++) {
                formselement.push(
                    <React.Fragment>
                        <hr className='m-0 w-100' />
                        <Form { ...dataform } key={i} />
                        <Preview datapost={datapost} key={i} />
                        <hr className='m-0 w-100' />
                    </React.Fragment>
                );
            }

            setAddmultipleproduct(formselement);
        }
    },[amountofproducts,dataform,datapost])

    return (
        <div className='add-product section pl-4 pl-lg-2 pr-md-0'>
            <div className="title d-flex align-items-center bg-opal text-champagne text-left rounded pl-4 py-1 mt-5"
            >
                <h3>Agregar producto</h3>
            </div>
            <div className='my-3 col-12 px-4'>
                <button
                    className='btn-admin btn-green-sheen'
                    onClick={(e) => e.target.nextSibling.classList.toggle('d-none')}
                >
                    Agregar multiples productos
                </button>
                <input
                    type="number"
                    className='add-multiple-products d-none rounded bg-champagne col-1 ml-4 p-1 text-center'
                    onChange={handlerAmountOfProducts}
                    min={0}
                />
            </div>
            <div className='d-flex flex-wrap col-12 px-0 pl-md-3 px-lg-4'>
                {
                    addmultipleproduct.length
                        ? addmultipleproduct.map( form => {
                            return form
                        })
                        : (
                            <React.Fragment>
                                <hr className='my-1 w-100' />
                                <Form { ...dataform } />
                                <Preview datapost={datapost} />
                                <hr className='my-1 w-100' />
                            </React.Fragment>
                        )
                }
            </div>
        </div>
    )
}
