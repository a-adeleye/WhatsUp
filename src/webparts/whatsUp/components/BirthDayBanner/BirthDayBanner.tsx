import * as React from 'react';
import {useEffect, useState} from 'react';
import "./BirthDayBanner.scss";
import Carousel from "../Carousel/Carousel";
import {extractImageUrl} from "../../Utils";
import Celebrants from "../Celebrants/Celebrants";

const BirthDayBanner: React.FC<any> = (props) => {

    const {data, birthday_text, celebrants, news_letter} = props;

    const [images, setImages] = useState([])

    const getImages = () => {
        if (!data.length) {
            return;
        }
        const images = data.map((image: any) => extractImageUrl(image.Image));
        setImages(images);
    }

    useEffect(() => {
        getImages();
    }, [data])

    return (
        <div className={"birthday-banner"}>
            <p className={"birthday-text"}>{birthday_text?.Title}</p>
            <Carousel images={images}/>
            <Celebrants celebrants={celebrants} news_letter={news_letter}/>
        </div>
    );
}

export default BirthDayBanner