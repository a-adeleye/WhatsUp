import * as React from 'react';
import {useEffect, useState} from 'react';
import "./BirthDayBanner.scss";
import Carousel from "../Carousel/Carousel";
import {extractImageUrl, getListItemsByTitle} from "../../Utils";
import Celebrants from "../Celebrants/Celebrants";
import {Spinner} from "office-ui-fabric-react";

const BirthDayBanner: React.FC<any> = (props) => {

    const {news_letter} = props;
    const [birthdayBanners, setBirthdayBanners] = useState([]);
    const [celebrants, setCelebrants] = useState([]);
    const [birthdayText, setBirthdayText] = useState<any>([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        if (!news_letter) {
            return;
        }
        Promise.all([
            getListItemsByTitle("Birthday Banners", "NewsletterId eq '" + news_letter.Id + "'"),
            getListItemsByTitle("Birthday Text", "NewsletterId eq '" + news_letter.Id + "'"),
            getListItemsByTitle("Birthday List", "NewsletterId eq '" + news_letter.Id + "'")])
            .then(([banners, birthday_text, celebrants]) => {
                setBirthdayBanners(banners);
                setBirthdayText(birthday_text[0]);
                setCelebrants(celebrants);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getImages = () => {
        if (!birthdayBanners.length) {
            return;
        }
        const images = birthdayBanners.map((image: any) => extractImageUrl(image.Image));
        setImages(images);
    }

    useEffect(() => {
        getImages();
    }, [birthdayBanners])

    useEffect(() => {
        getData();
    }, [news_letter])

    return (
        <>
            {loading && <div className={"text-center"}>
                <Spinner size={3}/>
            </div>}
            <div className={"birthday-banner"}>
                <p className={"birthday-text"}>{birthdayText?.Title}</p>
                <Carousel images={images}/>
                <Celebrants celebrants={celebrants} news_letter={news_letter}/>
            </div>
        </>
    );
}

export default BirthDayBanner