import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image} from "office-ui-fabric-react";

import './NewJoiners.scss';
import {getListItemsByTitle} from "../../Utils";
import EmployeeCard from "../EmployeeCard/EmployeeCard";

const NewJoiners: React.FC<any> = (props) => {

    const {news_letter} = props;

    const [newJoiners, setNewJoiners] = useState<any>([]);

    const getNewsJoiners = () => {
        if (!news_letter) {
            return;
        }
        getListItemsByTitle("New Joiners", "NewsletterId eq '" + news_letter.Id + "'").then((response) => {
            setNewJoiners(response);
        });
    }

    useEffect(() => {
        getNewsJoiners();
    }, [news_letter])


    return (
        <>
            <div className={"new-joiners"}>
                {newJoiners.map((item: any) => (
                    <EmployeeCard employee={item} key={item.Id}/>
                ))}
            </div>
            <div className={"welcome"}>
                <Image
                    src={"https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/Welcome-Aboard_b747361877670f33dd1346e07fabfe69.gif"}
                    alt={"Welcome"}/>
            </div>
        </>
    )
}

export default NewJoiners