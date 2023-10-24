import * as React from 'react';
import {useEffect, useState} from 'react';

import '../NewJoiners/NewJoiners.scss';
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import {Spinner} from "office-ui-fabric-react";
import {getListItemsByTitle} from "../../Utils";

const Anniversaries: React.FC<any> = (props) => {

    const {news_letter} = props;

    const [Anniversaries, setAnniversaries] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        if (!news_letter) {
            return;
        }
        getListItemsByTitle("Anniversaries", "NewsletterId eq '" + news_letter.Id + "'")
            .then((response) => {
                setAnniversaries(response);
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
            <div className={"new-joiners"}>
                {Anniversaries.map((item: any) => (
                    <EmployeeCard employee={item} key={item.Id} type={'anniversary'}/>
                ))}
            </div>
        </>
    )
}

export default Anniversaries