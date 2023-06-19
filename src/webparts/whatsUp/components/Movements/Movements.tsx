import * as React from 'react';

import '../NewJoiners/NewJoiners.scss';
import EmployeeCard from "../EmployeeCard/EmployeeCard";

const Movements: React.FC<any> = (props) => {

    const {movements} = props;

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