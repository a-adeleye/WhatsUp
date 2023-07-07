import * as React from 'react';
import {useEffect, useState} from 'react';

import '../NewJoiners/NewJoiners.scss';
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import {Spinner} from "office-ui-fabric-react";
import {getListItemsByTitle} from "../../Utils";

const Movements: React.FC<any> = (props) => {

    const {news_letter} = props;

    const [movements, setMovements] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        if (!news_letter) {
            return;
        }
        getListItemsByTitle("Movements", "NewsletterId eq '" + news_letter.Id + "'")
            .then((response) => {
                setMovements(response);
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
                {movements.map((item: any) => (
                    <EmployeeCard employee={item} key={item.Id} type={'title'}/>
                ))}
            </div>
        </>
    )
}

export default Movements