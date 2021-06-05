import React, { useCallback, useEffect, useState } from 'react'
import { urlbase } from '../../../services/getInfoPage';
import { submit } from '../../../services/handlerForm';
import { gEbID, modal, productListBy, qS, qSall } from '../../../services/index';

// Components.
import Loadingdata from '../../Loadingdata';
import Row from './Row';

export default function Items(props) {

    const [ orderlistproducts, setOrderlistproduct ] = useState('id')
    const [ orderbydirection, setOrderbydirection ] = useState('up')
    const [ products, setProducts ] = useState([])
    const [ producttodelete, setProducttodelete ] = useState([])

    useEffect(() => {
        qS('.products .items-product').classList.add('show');
    },[])

    const productproperties = [
        {
            value: 'id',
            title: 'Id'
        },
        {
            value: 'category',
            title: 'Categoria'
        },
        {
            value: 'name',
            title: 'Nombre'
        },
        {
            value: 'brand',
            title: 'Marca'
        },
        {
            value: 'price',
            title: 'Precio'
        },
        {
            value: 'discount',
            title: 'Descuento'
        },
        {
            value: 'stock',
            title: 'Stock'
        },
    ];

    const orderBy = productListBy;

    const orderListBy = useCallback(() => {
        if(orderlistproducts === 'id'){
            orderbydirection === 'up'
                ? setProducts(props.products.sort((a,b) => orderBy(a,b).id(a,b)))
                : setProducts(props.products.sort((a,b) => orderBy(a,b).id(a,b)).reverse());
        }
        if(orderlistproducts === 'category'){
            orderbydirection === 'up'
                ? setProducts(props.products.sort((a,b) => orderBy(a,b).category(a,b)))
                : setProducts(props.products.sort((a,b) => orderBy(a,b).category(a,b)).reverse());
        }
        if(orderlistproducts === 'name'){
            orderbydirection === 'up'
                ? setProducts(props.products.sort((a,b) => orderBy(a,b).name(a,b)))
                : setProducts(props.products.sort((a,b) => orderBy(a,b).name(a,b)).reverse());
        }
        if(orderlistproducts === 'brand'){
            orderbydirection === 'up'
                ? setProducts(props.products.sort((a,b) => orderBy(a,b).brand(a,b)))
                : setProducts(props.products.sort((a,b) => orderBy(a,b).brand(a,b)).reverse());
        }
        if(orderlistproducts === 'price'){
            orderbydirection === 'up'
                ? setProducts(props.products.sort((a,b) => orderBy(a,b).price(a,b)))
                : setProducts(props.products.sort((a,b) => orderBy(a,b).price(a,b)).reverse());
        }
        if(orderlistproducts === 'discount'){
            orderbydirection === 'up'
                ? setProducts(props.products.sort((a,b) => orderBy(a,b).discount(a,b)))
                : setProducts(props.products.sort((a,b) => orderBy(a,b).discount(a,b)).reverse());
        }
        if(orderlistproducts === 'stock'){
            orderbydirection === 'up'
                ? setProducts(props.products.sort((a,b) => orderBy(a,b).stock(a,b)))
                : setProducts(props.products.sort((a,b) => orderBy(a,b).stock(a,b)).reverse());
        }
    },[props.products,orderlistproducts,orderbydirection,orderBy])

    useEffect(() => {
        setProducts(props.products);
        orderListBy();
    },[props.products,orderListBy])

    const selectRow = (e) => {
        const id = e.target.parentElement.attributes.id.value.slice(1);

        if(e.target.parentElement.style.background === ''){
            e.target.parentElement.style.background = 'rgba(0,0,0,0.3)'
            setProducttodelete([...producttodelete, id]);
        } else {
            e.target.parentElement.style.background = '';
            setProducttodelete(producttodelete.filter( prodtodelete => prodtodelete !== id));
        }

    }

    const handlerModalsOnDelete = (loadinginfotext) => {
        qS('.modal-info section button').click();
        qS('#loading-info .loading-card').classList.replace('bg-main-sombra-2','bg-green-sheen');
        qSall('#loading-info .spinner-grow').forEach( spinner => {
            spinner.classList.replace('text-sombra-main-4','text-metallic-seaweed');
        })
        qS('#loading-info .title p').innerHTML = '';
        qS('#loading-info .title p').classList.add('text-metallic-seaweed');
        qS('#loading-info .title p').innerHTML = loadinginfotext;
        gEbID('loading-info').classList.toggle('d-none');
    }

    const deleteOneProduct = async (e) => {
        const token = localStorage.getItem('token');
        const url = `${urlbase}/api/product/delete`;
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                ids: [e.target.attributes.dataId.value]
            }),
        }

        handlerModalsOnDelete('Eliminando item ...');

        const submitform = await submit(url, options, props.setProducts, 'items-product', props.products);

        if(submitform && submitform.successful){
            gEbID('loading-info').classList.toggle('d-none');
            modal('successful', 'Enhorabuena !', submitform.productsdeleted);
            qS('.modal-info div').classList.replace('bg-main-sombra-2','bg-opal');
        }

    }

    const deleteMultipleProducts = async (e) => {
        e.preventDefault();

        console.log(producttodelete)
        const token = localStorage.getItem('token');
        const url = `${urlbase}/api/product/delete`;
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                ids: producttodelete
            }),
        }

        handlerModalsOnDelete('Eliminando items ...');

        const submitform = await submit(url, options, props.setProducts, 'items-product', props.products);

        if(submitform && submitform.successful){
            gEbID('loading-info').classList.toggle('d-none');
            modal('successful', 'Enhorabuena !', `${submitform.productsdeleted} items fueron eliminados`);
            qS('.modal-info div').classList.replace('bg-main-sombra-2','bg-opal');
        }

    }

    const showModalOnDeleteOne = (e) => {
        const div = qS('.modal-info div');
        const product = JSON.parse(e.target.attributes.dataProduct.value);

        div.classList.value = 'd-flex flex-column w-50 p-5 rounded shadow bg-green-sheen';
        div.setAttribute('style','border-top: 5px solid #DC3545');

        qS('.modal-info header').classList.value = 'text-center mt-2';
        qS('.modal-info header i').classList.value = 'fas fa-exclamation-triangle text-danger fa-3x';
        qS('.modal-info header p').classList.value = '';
        qS('.modal-info header p').innerHTML = '';

        qS('.modal-info section').classList.value = 'my-4';
        qS('.modal-info section p').classList.value = 'text-danger text-center font-weight-bold mt-3';
        qS('.modal-info section p').innerHTML = `Eliminar "${product.name}" ?`;
        qS('.modal-info section div').classList.value = 'd-flex justify-content-center mt-5';
        qS('.modal-info section button').classList.value = 'border-0 bg-transparent text-metallic-seaweed';
        qS('.modal-info section button.other-action').innerHTML = 'Eliminar';
        qS('.modal-info section button.other-action').classList.value = 'other-action btn btn-danger ml-4 text-opal';
        qS('.modal-info section button.other-action').setAttribute('dataId',`${product.id}`);
        qS('.modal-info section button.other-action').onclick = deleteOneProduct;

        qS('.container-modalinfo').classList.toggle('d-none');
    }

    const showModalOnDeleteMultiple = () => {
        let liElement = ''
        producttodelete.map( id => {
            const productname = qS(`.items-list #p${id} .name`);
            liElement = liElement + `<li>${productname.innerText}</li>`;
            return '';
        });

        const ulliElement = `<p>Eliminar los siguientes elementos ?</p><ul>${liElement}</ul>`;

        const div = qS('.modal-info div');

        div.classList.value = 'd-flex flex-column w-50 p-5 rounded shadow bg-green-sheen';
        div.setAttribute('style','border-top: 5px solid #DC3545');

        qS('.modal-info header').classList.value = 'text-center mt-2';
        qS('.modal-info header i').classList.value = 'fas fa-exclamation-triangle text-danger fa-3x';
        qS('.modal-info header p').classList.value = '';
        qS('.modal-info header p').innerHTML = '';

        qS('.modal-info section').classList.value = 'my-4';
        qS('.modal-info section p').classList.value = 'text-danger text-center font-weight-bold mt-3';
        qS('.modal-info section p').innerHTML = ulliElement;
        qS('.modal-info section div').classList.value = 'd-flex justify-content-center mt-5';
        qS('.modal-info section button').classList.value = 'border-0 bg-transparent text-metallic-seaweed';
        qS('.modal-info section button.other-action').innerHTML = 'Eliminar';
        qS('.modal-info section button.other-action').classList.value = 'other-action btn btn-danger ml-4 text-opal';
        qS('.modal-info section button.other-action').onclick = deleteMultipleProducts;

        qS('.container-modalinfo').classList.toggle('d-none');
    }

    window.onkeydown = (e) => {
        if(e.key === 'Escape'){
            const rows = document.querySelectorAll('.items-product table tr');
            let rowselected = 0;

            rows.forEach( row => {
                console.log(row)
                if(row.style.background === 'rgba(0, 0, 0, 0.3) none repeat scroll 0% 0%'){
                    row.rowIndex%2 === 0
                        ? row.setAttribute('style','background: rgba(0, 0, 0, 0) repeat scroll 0% 0%')
                        : row.setAttribute('style','background: rgba(0, 0, 0, 0.05) repeat scroll 0% 0%');
                        rowselected++
                }
            });

            if(rowselected > 0) setProducttodelete([]);
        }
    }

    return (
        <div className='items-product section pl-4 pl-lg-2 pr-md-0 my-3'>
            <div className="title bg-metallic-seaweed text-champagne text-left border-metallic-seaweed rounded pl-4 py-2 mt-4">
                <h3>Lista de productos</h3>
            </div>
            <div className='col-12 d-flex align-items-center my-3'>
                <label htmlFor="order-list-product" className='text-metallic-seaweed mb-0 mr-4 d-none d-sm-flex'>
                    Ordenar por
                </label>
                <select
                    name="order-list-product"
                    id="order-list-product"
                    className='bg-champagne text-metallic-seaweed text-center rounded py-1 px-3'
                    onChange={(e) => {setOrderlistproduct(e.target.value); setProducts([])}}
                >
                    {
                        productproperties.map( (property, i) => {
                            return (
                                <option
                                    key={i}
                                    value={property.value}
                                >
                                    {property.title}
                                </option>
                            )
                        })
                    }
                </select>
                <button
                    className='mx-2 border-0 bg-transparent rounded text-metallic-seaweed'
                    style={{border: '1px solid var(--metallic-seaweed)',fontSize: '1.5rem'}}
                    onClick={() => {setOrderbydirection('up'); setProducts([])}}
                >
                    <i class={`${orderbydirection === 'up' ? 'fas' : 'far'} fa-arrow-alt-circle-up`}></i>
                </button>
                <button
                    className='mx-2 border-0 bg-transparent rounded text-metallic-seaweed'
                    style={{border: '1px solid var(--metallic-seaweed)',fontSize: '1.5rem'}}
                    onClick={() => {setOrderbydirection('down'); setProducts([])}}
                >
                    <i class={`${orderbydirection === 'down' ? 'fas' : 'far'} fa-arrow-alt-circle-down`}></i>
                </button>
                <button
                    className={`delete-select-rows btn-admin ml-auto
                        ${producttodelete.length ? '' : 'd-none'}`
                    }
                    onClick={showModalOnDeleteMultiple}
                >
                    Eliminar filas seleccionadas
                </button>
            </div>
            <table className="items-list table table-hover table-striped rounded shadow">
                <thead>
                    <tr className='text-opal bg-metallic-seaweed'>
                        {
                            productproperties.map( (property, i) => {
                                return (
                                    <th scope="col" key={i}>{property.title}</th>
                                )
                            })
                        }
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length
                            ? products.map( (product, i) => {
                                return (
                                    <Row
                                        product={product}
                                        selectRow={selectRow}
                                        showModal={showModalOnDeleteOne}
                                        paramid={props.paramid}
                                        setParamid={props.setParamid}
                                    />
                                )
                            })
                            : ''
                    }
                </tbody>
            </table>
            {
                !products.length
                    ? <div className="d-flex py-4 text-metallic-seaweed">
                        <Loadingdata />
                    </div>
                    :''
            }
        </div>
    )
}
