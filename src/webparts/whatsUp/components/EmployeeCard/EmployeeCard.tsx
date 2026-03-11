import * as React from 'react';
import './EmployeeCard.scss';
import {Image} from "office-ui-fabric-react";
import {extractImageUrl} from "../../Utils";

const EmployeeCard: React.FC<any> = (props) => {

    const {employee, type} = props;
    const isAnniversary = type === 'anniversary';
    const isNewJoiner = type === 'newJoiner';
    const isMovement = type === 'movement';
    const isAward = type === 'award';
    const anniversarySubtext = employee?.Department || employee?.Location || employee?.NewTitle;
    const anniversaryCaption = employee?.Caption || employee?.Description;
    const newJoinerRole = employee?.Title || employee?.NewTitle;
    const movementTitle = employee?.Title;
    const movementPromotion = employee?.NewTitle || employee?.Department;
    const awardTitle = employee?.Title || employee?.NewTitle;
    const awardMeta = employee?.Department || employee?.Caption || employee?.Location;
    const awardCaption = employee?.Description || employee?.Location || employee?.Caption;
    const cardClassName = isAnniversary
        ? "employee-card employee-card--anniversary"
        : isNewJoiner
            ? "employee-card employee-card--new-joiner"
            : isMovement
                ? "employee-card employee-card--movement"
                : isAward
                    ? "employee-card employee-card--award"
            : "employee-card";

    return (
        <div className={cardClassName}>
            <div className="image">
                <Image
                    src={extractImageUrl(employee?.Image)}
                    alt={employee?.EmployeeName}/>
            </div>
            <div className="details">
                <b className="employee-card__name">{employee?.EmployeeName}</b>

                {isAnniversary ? (
                    <>
                        {employee?.Title && <span className="employee-card__role">{employee?.Title}</span>}
                        {anniversarySubtext && <span className="employee-card__meta">{anniversarySubtext}</span>}
                        {anniversaryCaption && <span className="employee-card__caption">{anniversaryCaption}</span>}
                    </>
                ) : isNewJoiner ? (
                    <>
                        {newJoinerRole && <span className="employee-card__role">{newJoinerRole}</span>}
                        {employee?.Department && <span className="employee-card__meta">{employee?.Department}</span>}
                        {employee?.Location && <span className="employee-card__caption">{employee?.Location}</span>}
                    </>
                ) : isMovement ? (
                    <>
                        {movementTitle && <span className="employee-card__role">{movementTitle}</span>}
                        {movementPromotion && <span className="employee-card__meta">{movementPromotion}</span>}
                        {employee?.Location && <span className="employee-card__caption">{employee?.Location}</span>}
                    </>
                ) : isAward ? (
                    <>
                        {awardTitle && <span className="employee-card__role">{awardTitle}</span>}
                        {awardMeta && <span className="employee-card__meta">{awardMeta}</span>}
                        {awardCaption && <span className="employee-card__caption">{awardCaption}</span>}
                    </>
                ) : (
                    <>
                        {employee?.Location && <span>{employee?.Location}</span>}
                        {type === 'title' && employee?.Title && <span>{employee?.Title}</span>}
                        {employee?.NewTitle && <span>{employee?.NewTitle}</span>}
                        {employee?.Department && <span>{employee?.Department}</span>}
                        {employee?.Caption && <span>{employee?.Caption}</span>}
                        {type === 'description' && employee?.Description && <span>{employee?.Description}</span>}
                    </>
                )}
            </div>
        </div>
    )
}

export default EmployeeCard