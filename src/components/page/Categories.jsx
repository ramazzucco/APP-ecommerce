import React,{ useState, useEffect, useCallback } from "react";
import { closeSubMenues } from '../../services'
import { getOptionsOrderBy } from '../../style/categories';

//Components.
import Card from "./Card";
import Input from "../form/Input";
import { urlbase } from "../../services/getInfoPage";
import Loadingdata from "../Loadingdata";

export default function Categories(props) {

    const [ products, setProducts ] = useState(props.products)
    const [ productperpage, setProductperpage ] = useState(2)
    const [ page, setPage ] = useState(1)
    const [ previouspage, setPreviouspage ] = useState(0)
    const [ nextpage, setNextpage ] = useState(page + 1)
    const [ pagination, setPagination ] = useState(Math.ceil(products.length / productperpage))
    const [ orderby, setOrderby ] = useState('')
    const [ category, setCategory ] = useState(props.products[0].category_title)
    const [ error, setError ] = useState('')

    const datacard = {
        cardID: props.products[0].category_title,
        card:{
            classname:{
                card: `card-category col-10 py-3 d-none mb-2 bg-white border rounded`,
                image: `image col-3 p-0 d-flex justify-content-center align-items-center h-100`,
                imagewidth: `${props.width < 768 ? '70%' : '70%'}`,
                imageheight: `${props.width < 768 ? '70%' : '70%'}`,
                info: `info d-flex flex-wrap align-items-center col-8 px-2`,
                infoName: `w-100 name text-left mb-0 ${props.width < 768 ? 'text-truncate' : ''}`,
                infoPrice: "h5 price inline-block mb-0",
                infoDiscount: "inline-block discount mb-0 ml-3",
                divButtons: "buy d-flex flex-column align-items-end justify-content-end col-2 text-center p-0",
                linkbutton: "d-flex col-10 px-0",
                button: "rm-btn rm-orange ml-2",
            },
            style: {
                minHeight: `${props.width < 768 ? '120px' : '150px'}`,
                maxHeight: `${props.width < 768 ? '120px' : '150px'}`
            },
            stylediviconfavourite: {
                position: 'absolute',
                top: '0',
                right: '0'
            }
        },
    } ;

    const showProducts = useCallback(() => {
        const cards = document.querySelectorAll('.card-category');

        cards.forEach( (card, i) => {

            if(previouspage === 0){
                i < page * productperpage
                    ? card.classList.replace('d-none','d-flex')
                    : card.classList.replace('d-flex','d-none')
            }

            if(previouspage < page < nextpage && previouspage !== 0 && page !== pagination){
                if(previouspage + 1 <= i && i < nextpage + 1){
                    card.classList.replace('d-none','d-flex')
                } else {
                    if(card.className.includes('d-flex')){
                        card.classList.replace('d-flex','d-none')
                    }
                }
            }

            if(nextpage > pagination){
                i < previouspage * productperpage
                    ? card.classList.replace('d-flex','d-none')
                    : card.classList.replace('d-none','d-flex')
            }
        })
    },[previouspage, page, nextpage, pagination, productperpage])

    const numberPage = (e) => {
        setPage(Number(e.target.attributes.dataid.value));
        setPreviouspage(Number(e.target.attributes.dataid.value) - 1);
        setNextpage(Number(e.target.attributes.dataid.value) + 1);
        window.scrollTo(0,0);
    }

    const nextPage = () => {
        setPage(page + 1);
        setPreviouspage(previouspage + 1);
        setNextpage(nextpage + 1);
        window.scrollTo(0,0);
    }

    const previousPage = () => {
        setPage(page - 1);
        setPreviouspage(previouspage - 1);
        setNextpage(nextpage - 1);
        window.scrollTo(0,0);
    }

    const handlerChange = (e) => {

        e.target.checked
            ? setOrderby(e.target.name)
            : setOrderby('');

        const inputs = document.querySelectorAll('.orderby input');

        inputs.forEach( input => {
            console.log('INPUT: ',input.getAttribute('name'), 'TARGET: ', e.target.name)
            if(input.getAttribute('name') !== e.target.name){
                input.checked = false;
            }
        })

    }

    const orderbyoptions = getOptionsOrderBy(handlerChange);

    const orderBy = useCallback( async () => {

        const url = urlbase + `/api/product/orderby?category=${props.products[0].category_id}&orderby=${orderby}`;

        const request = await fetch(url);
        const response = await request.json();

        if(response.error){
            setError(response.data.message);
        } else {
            setPagination(Math.ceil(response.data.length / productperpage))
            setProducts(response.data);
            setError('')
        }

        console.log(response)

    },[productperpage, orderby, props])

    const showOrderBy = (e) => {
        const itemsorderby = document.querySelectorAll('.orderby .item');
        const arrow = document.querySelector('.orderby .headertitle i');
        const array = ['headertitle','title','fa-chevron-up','fa-chevron-down',]

        if(array.includes(...e.target.classList)){
            itemsorderby.forEach( item => {
                item.className.includes('d-none')
                    ? item.classList.replace('d-none','d-flex')
                    : item.classList.replace('d-flex','d-none');
            })

            arrow.className.includes('fa-chevron-up')
                ? arrow.classList.replace('fa-chevron-up','fa-chevron-down')
                : arrow.classList.replace('fa-chevron-down','fa-chevron-up');
        }

    }

    useEffect(() => {
        props.setPath(window.location.pathname)
    },[props])

    useEffect(() => {
        if(error !== '') setProducts([]);
    },[error])

    useEffect(() => {
        showProducts();
    },[products, showProducts])

    useEffect(() => {
        showProducts();
    },[page, showProducts])

    useEffect(() => {
        if(orderby !== '') orderBy();
    },[orderby, orderBy])

    return (
        <section className={`container-fluid d-flex flex-column flex-md-row flex-wrap ${category} bg-color-main py-4`}
            onClick={closeSubMenues}
        >
            <h2 className="col-12 text-left bg-main-contrast-3 text-capitalize my-4 pl-4 mb-5 border-bottom">
                {category}
            </h2>
            <div className="orderby col-11 pl-4 pr-0 col-md-3 mx-auto" onClick={showOrderBy}>
                <div className="headertitle d-flex align-items-center mb-1 border-bottom">
                    <p className='title mb-1'>Ordenar por :</p>
                    <i className="fa fa-chevron-up d-flex d-md-none ml-4"></i>
                </div>
                <div className='col-12 col-sm-8 col-md-12 d-flex flex-column align-items-center p-0 mx-auto pt-3'>
                    {
                        orderbyoptions.map( (by, i) => {
                            return (
                                <Input {...by.input} key={i} />
                            )
                        })
                    }
                </div>
            </div>
            <div className={`containercards ${props.products[0].category_title}
                col-12 col-md-9 p-0 mt-3 mt-md-0 d-flex flex-column align-items-center`}
            >
                {
                    products
                        ? products.map((product, i) => {
                            return (
                                <Card
                                    key={i}
                                    user={props.user}
                                    datacard={datacard}
                                    product={product}
                                    items={props.items}
                                    setItems={props.setItems}
                                    favourites={props.favourites}
                                    setFavourites={props.setFavourites}
                                />
                            );
                        })
                    : <Loadingdata />
                }
                <h5 className={`products-error text-center bg-main-contrast-4 mt-5 ${error !== '' ? '' : 'd-none'}`}>
                    {error}
                </h5>
            </div>
            <nav className='col-12 mt-5 d-flex justify-content-center border-top pt-5' arialabel="navigation category">
                <ul className="pagination col-12 justify-content-center align-items-center"
                    style={{minHeight: '46px', maxHeight: '46px'}}
                >
                    <li
                        className={`page-item previous rm-btn ${page === 1 ? 'rm-disabled' : 'rm-orange'} mx-2`}
                        onClick={previousPage}
                    >
                        {props.width < 420 ? <i className='fa fa-chevron-left'></i> : 'Anterior'}
                    </li>
                    {
                        products
                            ? products.map( (product, i) => {
                                return (
                                    i + 1 <= pagination
                                        ? <li
                                            key={i}
                                            className={`page-item rm-btn${i + 1 === page ? '-outline' : ''} rm-orange mx-2`}
                                            dataid={i + 1}
                                            onClick={numberPage}
                                        >
                                            {i + 1}
                                        </li>
                                        :''
                                )
                            })
                            : ''
                    }
                    <li
                        className={`page-item next rm-btn ${page === pagination ? 'rm-disabled' : 'rm-orange'} mx-2`}
                        onClick={nextPage}
                    >
                        {props.width < 420 ? <i className='fa fa-chevron-right'></i> : 'Siguiente'}
                    </li>
                </ul>
            </nav>
        </section>
    );
}
