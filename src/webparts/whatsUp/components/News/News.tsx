import * as React from 'react';
import './News.scss';
import Carousel from "../Carousel/Carousel";

const News: React.FC<any> = (props) => {
    const {title, images, text} = props;
    return (
        <div className={"news"}>
            <div className={"news-title"}>
                <h2>{title}</h2>
            </div>
            <Carousel images={images}/>
            <div className={"text"} dangerouslySetInnerHTML={{__html: text}}/>
        </div>
    );
}

export default News