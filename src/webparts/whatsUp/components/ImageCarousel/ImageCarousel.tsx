import * as React from 'react';
import {useState} from 'react';
import {Image} from 'office-ui-fabric-react';

import './ImageCarousel.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';


interface CarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<CarouselProps> = ({images}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} onClickItem={openPopup}>
                {images.map(image => (<Image src={image} alt="Image"/>))}
            </Carousel>
            {isPopupOpen && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content">
                        <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} showArrows={false}>
                            {images.map(image => (<Image src={image} alt="Image"/>))}
                        </Carousel>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageCarousel;
