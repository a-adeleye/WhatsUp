import * as React from 'react';
import './EmployeeCard.scss';
import {Image} from "office-ui-fabric-react";
import {extractImageUrl} from "../../Utils";

const EmployeeCard: React.FC<any> = (props) => {

    const {employee, type} = props;

    return (
        <div className={"employee-card"}>
            <div className="image">
                <Image
                    src={extractImageUrl(employee?.Image)}
                    alt={employee?.EmployeeName}/>
            </div>
            <div className="details">
                <b>{employee?.EmployeeName}</b>
                <span>{employee?.Location}</span>
                {type === 'title' && <span>{employee?.Title}</span>}
                <span>{employee?.Department}</span>
                {type === 'description' && <span>{employee?.Description}</span>}
            </div>
        </div>
    )
}

export default EmployeeCard