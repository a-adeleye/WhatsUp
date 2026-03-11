import * as React from 'react';
import "./Celebrant.scss";
import { extractImageUrl } from "../../Utils";

const Celebrant: React.FC<any> = (props) => {

    const birthday = (employee: any) => {
        const birthDate = new Date(0, employee.BirthMonthId - 1, employee.BirthDayId);
        return birthDate.toLocaleString('en-US', { month: 'long', day: 'numeric' });
    }

    const { celebrant } = props;
    return (
        <div className={"celebrant"}>
            <div className={"celebrant-image"}>
                <img alt="" src={extractImageUrl(celebrant.Image)} />
            </div>
            <div className={"celebrant-name"}>
                {celebrant.EmployeeName}
            </div>
            <div className={"celebrant-location"}>
                {celebrant.Location}
            </div>
            <div className={"celebrant-department"}>
                {celebrant.Department}
            </div>
            <div className="birth-date">
                {birthday(celebrant)}
            </div>
        </div>
    );
}

export default Celebrant
