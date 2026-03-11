import * as React from 'react';
import {useEffect, useState} from 'react';

import './Awards.scss';
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import {getListItemsByTitle} from "../../Utils";

import {Spinner} from "office-ui-fabric-react";

import "../BirthDayBanner/BirthDayBanner.scss";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import {extractImageUrl} from "../../Utils";

const Awards: React.FC<any> = (props) => {

    const {news_letter} = props;
    const [awards, setAwards] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [awardsBanners, setAwardsBanners] = useState([]);
    const getData = () => {
        if (!news_letter) {
            return;
        }
        Promise.all([
        getListItemsByTitle("Awards Banners", "NewsletterId eq '" + news_letter.Id + "'"),
        getListItemsByTitle("Awards", "NewsletterId eq '" + news_letter.Id + "'")])
            .then(([banners,response]) => {
                setAwardsBanners(banners);
                setAwards(response);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const getImages = () => {
        if (!awardsBanners.length) {
            return;
        }
        const images = awardsBanners.map((image: any) => extractImageUrl(image.Image));
        //const images = awardsBanners.map((image: any) => extractURL(image.Image));
        setImages(images);
    }
    
    

    useEffect(() => {
        getData();
    }, [news_letter]);

    useEffect(() => {
        getImages();
    }, [awardsBanners])

    return (
        <>
            {loading && <div className={"text-center"}>
                <Spinner size={3}/>
            </div>}
            <div className={"birthday-banner"}>
                <ImageCarousel images={images}/>
            </div>
            <div className={"awards-grid"}>
                {awards.map((item: any) => (
                    <EmployeeCard employee={item} key={item.Id} type={'award'}/>
                ))}
            </div>
            
        </>
    )
}

export default Awards