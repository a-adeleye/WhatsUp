import * as React from 'react';
import {useEffect, useState} from 'react';
import './Header.scss';
import insiderWordmark from "../../assets/images/insider.png";
import {getListItemsByTitle} from "../../Utils";

const getHeaderImageUrl = (item: any): string => {
    if (!item?.HeaderImage || !item?.Id) {
        return "";
    }

    try {
        const imageData = JSON.parse(item.HeaderImage);

        if (!imageData?.fileName) {
            return "";
        }

        return `/sites/WhatsUp/Lists/Header/Attachments/${item.Id}/${imageData.fileName}`;
    } catch {
        return "";
    }
};

const Header: React.FC<any> = (props) => {
    const {news_letter} = props;
    const [headerItem, setHeaderItem] = useState<any>(null);
    const headerImageUrl = getHeaderImageUrl(headerItem);

    useEffect(() => {
        if (!news_letter?.Id) {
            setHeaderItem(null);
            return;
        }

        getListItemsByTitle("Header", "NewsLetterId eq " + news_letter.Id)
            .then((response) => {
                setHeaderItem(response[0] || null);
            })
            .catch(() => {
                setHeaderItem(null);
            });
    }, [news_letter?.Id]);

    if (!headerImageUrl) {
        return null;
    }

    return (
        <div className="header">
            <header className={"insider-cover"}>
                <div className={"insider-cover__frame"}>
                    <img
                        className={"insider-cover__background"}
                        src={headerImageUrl}
                        alt="Header"
                    />
                    <div className={"insider-cover__top-shade"} />
                    {/* <div className={"insider-cover__bottom-shade"} /> */}
                    <img
                        className={"insider-cover__wordmark"}
                        src={insiderWordmark}
                        alt="Insider"
                    />
                    {news_letter?.Title && <div className={"insider-cover__date"}>
                        {String(news_letter.Title).trim().toUpperCase()}
                    </div>}
                </div>
            </header>
        </div>
    );
}

export default Header
