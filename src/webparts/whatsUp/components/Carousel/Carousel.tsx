import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image} from 'office-ui-fabric-react';

import './Carousel.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'

library.add(faChevronRight, faChevronLeft);


interface CarouselProps {
    images: string[];
}

const Carousel: React.FC<CarouselProps> = ({images}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const nextImage = (event: any) => {
        event.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const previousImage = (event: any) => {
        event.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closePopup();
        } else if (event.key === 'ArrowLeft') {
            previousImage(event);
        } else if (event.key === 'ArrowRight') {
            nextImage(event);
        }
    };

    useEffect(() => {
        if (isPopupOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPopupOpen]);

    return (
        <>
            {images.length && <div className="carousel">
                {(!isPopupOpen && images.length > 1) &&
                    <button onClick={(event) => previousImage(event)} className={"carousel-button previous"}>
                        <FontAwesomeIcon icon={"chevron-left"} size="xl"/>
                    </button>}
                {(!isPopupOpen && images.length > 1) &&
                    <button onClick={(event) => nextImage(event)} className={"carousel-button next"}>
                        <FontAwesomeIcon icon={"chevron-right"} size="xl"/>
                    </button>}
                <Image src={images[currentImageIndex]} alt="Image" className="carousel-image" onClick={openPopup}/>

                {isPopupOpen && (
                    <div className="popup-overlay" onClick={closePopup}>
                        <div className="popup-content">
                            <Image src={images[currentImageIndex]} alt="Image"/>
                        </div>
                    </div>
                )}
            </div>
            }
        </>
    );
};

export default Carousel;
