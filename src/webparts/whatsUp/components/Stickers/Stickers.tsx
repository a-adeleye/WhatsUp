import * as React from 'react';
import "./Stickers.scss";
import {Image} from "office-ui-fabric-react";

const Stickers: React.FC<any> = () => {

    const imageLinks = [
        "https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/Love-Jetex_796422f3767197c00f38dbbe43dcfda4.gif",
        "https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/giphy_8256febda1a0be66df604b009489a03e.gif",
        "https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/flying_4da162175d9ed310a2592ddb863b6afd.gif",
        "https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/Jetex_47796a32e16ff20f88a4adacaea0ec88.gif",
        "https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/giphy-1_267fe6b88a6de4c75539db6ae0c161b5.gif",
        "https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/fly-to-rome_8995953647af61c4ece52d88ebbede19.gif",
        "https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/like-jetex_3b45553d2e6bb105f3588cc1453101a8.gif",
        "https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/fly-to-dubai-1_7b02a2c64bb014b3c85af33ce0b06b10.gif"
    ]

    return (
        <div className={"stickers"}>
            <p className={"title"}>Don&apos;t forget to use our GIF stickers on Instagram stories by searching for
                &quot;Jetex&quot;
                while adding a sticker </p>
            <div className="sticker-wrapper">
                {imageLinks.map((item, index) => (
                    <div className="sticker" key={index}>
                        <Image src={item} alt={"sticker"}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stickers;