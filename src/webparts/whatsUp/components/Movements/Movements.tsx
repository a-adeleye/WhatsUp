import * as React from 'react';
import {useEffect, useState} from 'react';

import '../NewJoiners/NewJoiners.scss';
import {getListItemsByTitle} from "../../Utils";
import EmployeeCard from "../EmployeeCard/EmployeeCard";

const Movements: React.FC<any> = (props) => {

    const {news_letter} = props;

    const [movements, setMovements] = useState<any>([]);

    const getMovements = () => {
        if (!news_letter) {
            return;
        }
        getListItemsByTitle("Movements", "NewsletterId eq '" + news_letter.Id + "'").then((response) => {
            setMovements(response);
        });
    }

    useEffect(() => {
        getMovements();
    }, [news_letter])


    return (
        <>
            <div className={"new-joiners"}>
                {movements.map((item: any) => (
                    <EmployeeCard employee={item} key={item.Id}/>
                ))}
            </div>
        </>
    )
}

export default Movements