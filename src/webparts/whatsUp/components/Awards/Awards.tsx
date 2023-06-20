import * as React from 'react';
import {useEffect, useState} from 'react';

import '../NewJoiners/NewJoiners.scss';
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import {getListItemsByTitle} from "../../Utils";
import {Spinner} from "office-ui-fabric-react";

const Awards: React.FC<any> = (props) => {

    const {news_letter} = props;
    const [awards, setAwards] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        if (!news_letter) {
            return;
        }
        getListItemsByTitle("Awards", "NewsletterId eq '" + news_letter.Id + "'")
            .then((response) => {
                setAwards(response);
                setLoading(false);
            })
    }

    useEffect(() => {
        getData();
    }, [news_letter]);

    return (
        <>
            {loading && <div className={"text-center"}>
                <Spinner size={3}/>
            </div>}
            <div className={"new-joiners"}>
                {awards.map((item: any) => (
                    <EmployeeCard employee={item} key={item.Id}/>
                ))}
            </div>
        </>
    )
}

export default Awards