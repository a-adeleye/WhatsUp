import * as React from 'react';
import {useEffect, useState} from 'react';
import "./BirthDayBanner.scss";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import {extractImageUrl, getListItemsByTitle, getOrderedListItemsByTitle} from "../../Utils";
import Celebrants from "../Celebrants/Celebrants";
import {Spinner} from "office-ui-fabric-react";
import SectionHeader from "../SectionHeader/SectionHeader";

const BirthDayBanner: React.FC<any> = (props) => {

    const {news_letter} = props;
    const celebrantsMonth = news_letter?.Title?.split(" ")[0] || "";
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
            getOrderedListItemsByTitle("Birthday List", 'BirthDayId', "NewsletterId eq '" + news_letter.Id + "'")])
            .then(([banners, birthday_text, celebrants]) => {
                setBirthdayBanners(banners);
                setBirthdayText(birthday_text[0]);
                setCelebrants(celebrants.sort((a: { BirthDayId: number; },b: { BirthDayId: number; }) => a.BirthDayId-b.BirthDayId));
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
        <div className={"birthday-banner"}>
            <SectionHeader
                topText={celebrantsMonth}
                bottomText="Celebrants"
                subtitle={birthdayText?.Title}
            />
            {loading && <div className={"text-center"}>
                <Spinner size={3}/>
            </div>}
            {!loading && (
                <>
                    <ImageCarousel images={images}/>
                    <Celebrants celebrants={celebrants}/>
                </>
            )}
        </div>
    );
}

export default BirthDayBanner