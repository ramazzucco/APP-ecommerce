import React from 'react'
import { urlbase } from "../../services/getInfoPage";

export default function Metrics(props) {

    const totalspent = props.purchases.map( purchase => Number(purchase.price) ).reduce((acum,numb) => acum + numb);

    return (
        <div className='col-12 d-flex'>
            <div className="spent position-relative rounded-lg shadow-sm bg-white p-3 pt-4">
                <img
                    src={urlbase + '/images/Payments.svg'}
                    alt="spent.svg"
                    width='200px'
                />
                <p
                    className='position-absolute font-weight-bold'
                    style={{top: '0',left: '50%',transform: 'translate(-50%)'}}
                >
                    Total Gastado
                </p>
                <p
                    className='position-absolute text-danger'
                    style={{bottom: '-10px',fontSize: '2.3rem',fontFamily: 'roboto'}}
                >
                    $ {totalspent}
                </p>
            </div>
        </div>
    )
}
