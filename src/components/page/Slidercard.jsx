import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

//Components.
import Loading from "../Loadinginfo";
import Card from './Card';

export default function Slidercard(props) {

    const datacard = props.datacard;

    return (
        <div className={datacard.containercarousel.classname} style={datacard.containercarousel.style}>
                <h2 className={datacard.title.classname}>
                    {datacard.title.content}
                </h2>
                    <CarouselProvider
                        className={datacard.carouselprovider.classname}
                        hasMasterSpinner={datacard.carouselprovider.hasmasterspinner}
                        totalSlides={datacard.carouselprovider.totalslides}
                        visibleSlides={datacard.carouselprovider.visibleslides}
                    >
                        <Slider>
                            {
                                datacard.products
                                    ? datacard.products.map( (product, i) => {
                                        return (
                                            <Slide index={i} className={datacard.slide.classname}>
                                                <Card
                                                    user={props.user}
                                                    datacard={datacard}
                                                    product={product}
                                                    items={props.items}
                                                    setItems={props.setItems}
                                                    favourites={props.favourites}
                                                    setFavourites={props.setFavourites}
                                                />
                                        </Slide>
                                        )
                                    })
                                    : <Loading className='text-center'/>
                            }
                        </Slider>
                        <div className={datacard.buttons.container.classname} style={datacard.buttons.container.style}>
                            <ButtonBack className={datacard.buttons.back.classname}>
                                {datacard.buttons.back.content}
                            </ButtonBack>
                            <ButtonNext className={datacard.buttons.next.classname}>
                                {datacard.buttons.next.content}
                            </ButtonNext>
                        </div>
                    </CarouselProvider>
            </div>
    )
}
