import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image, Spinner} from "office-ui-fabric-react";

import './NewJoiners.scss';
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import {getListItemsByTitle} from "../../Utils";

const welcomeImage = "https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/Welcome-Aboard_b747361877670f33dd1346e07fabfe69.gif";

const NewJoiners: React.FC<any> = (props) => {

    const {news_letter} = props;
    const [newJoiners, setNewJoiners] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        if (!news_letter) {
            return;
        }
        getListItemsByTitle("New Joiners", "NewsletterId eq '" + news_letter.Id + "'")
            .then((response) => {
                setNewJoiners(response);
                setLoading(false);
            })
    }

    useEffect(() => {
        getData();
    }, [news_letter])

    return (
        <>
            {loading && <div className={"text-center"}>
                <Spinner size={3}/>
            </div>}
            <div className={"new-joiners-grid"}>
                {newJoiners.map((item: any) => (
                    <EmployeeCard employee={item} key={item.Id} type='newJoiner'/>
                ))}
            </div>
            <div className={"welcome"}>
                <Image
                    src={welcomeImage}
                    alt={"Welcome"}/>
            </div>
        </>
    )
}

export default NewJoiners
