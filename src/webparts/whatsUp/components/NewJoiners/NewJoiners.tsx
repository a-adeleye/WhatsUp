import * as React from 'react';
import {Image} from "office-ui-fabric-react";

import './NewJoiners.scss';
import EmployeeCard from "../EmployeeCard/EmployeeCard";

const NewJoiners: React.FC<any> = (props) => {

    const {new_joiners} = props;

    const welcomeImage = "https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/Welcome-Aboard_b747361877670f33dd1346e07fabfe69.gif";

    return (
        <>
            <div className={"new-joiners"}>
                {new_joiners.map((item: any) => (
                    <EmployeeCard employee={item} key={item.Id}/>
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