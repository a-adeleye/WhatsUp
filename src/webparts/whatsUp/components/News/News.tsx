import * as React from 'react';
import './News.scss';
import Carousel from "../Carousel/Carousel";

const News: React.FC<any> = (props) => {
    const {title, images, text} = props;
    return (
        <div className={"news"} data-aos="fade-up">
            <div className={"news-title"} data-aos="fade-right">
                <h2>{title}</h2>
            </div>
            <Carousel images={images}/>
            {/*<div className={"text"}>{text}</div>*/}
            <div className={"text"} dangerouslySetInnerHTML={{__html: text}}/>
        </div>
    );
}

export default News