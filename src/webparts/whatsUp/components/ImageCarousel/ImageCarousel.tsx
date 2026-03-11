import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image} from 'office-ui-fabric-react';

import './ImageCarousel.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';


interface CarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<CarouselProps> = ({images}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<any>();
    const openPopup = (index: number) => {
        setIsPopupOpen(true);
        setCurrentIndex(index)
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const escFunction = (event: { keyCode: number; }) => {
        if(event.keyCode === 27) {
            closePopup();
        }
    }

    useEffect(() => {
        if (isPopupOpen) {
            document.addEventListener("keydown", escFunction, false);
        }

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [isPopupOpen]);

    return (
        <>
            <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} onClickItem={openPopup}>
                {images.map((image, index) => (
                    <Image key={`${image}-${index}`} src={image} alt="Image"/>
                ))}
            </Carousel>
            {isPopupOpen && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content">
                        <Image src={images[currentIndex]} alt="Image"/>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageCarousel;
