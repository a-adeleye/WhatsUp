import * as React from 'react';
import {useEffect, useState} from 'react';

import '../NewJoiners/NewJoiners.scss';
import {getListItemsByTitle} from "../../Utils";
import EmployeeCard from "../EmployeeCard/EmployeeCard";

const Awards: React.FC<any> = (props) => {

    const {news_letter} = props;

    const [awards, setAwards] = useState<any>([]);

    const getAwards = () => {
        if (!news_letter) {
            return;
        }
        getListItemsByTitle("Awards", "NewsletterId eq '" + news_letter.Id + "'").then((response) => {
            setAwards(response);
        });
    }

    useEffect(() => {
        getAwards();
    }, [news_letter])


    return (
        <>
            <div className={"new-joiners"}>
                {awards.map((item: any) => (
                    <EmployeeCard employee={item} key={item.Id}/>
                ))}
            </div>
        </>
    )
}

export default Awards