import * as React from 'react';

import "./ScamAwareness.scss";
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Image} from "office-ui-fabric-react";

library.add(faTriangleExclamation);

const ScamAwareness: React.FC<any> = () => {
    return (
        <div className={"orange-section"} data-aos="fade-up">
            <div className="container">
                <div className="icon">
                    <FontAwesomeIcon icon={"triangle-exclamation"} size="xl"/>
                </div>
                <h1 className="title">Scam & Fraud Awareness</h1>
                <div className="description">Corporate fraud and misconduct remain a constant threat to public trust and
                    confidence in the capital markets.
                    To avoid the increasing of fraud and scam incidences in future, employees are requested to well
                    served in focusing their efforts on the following:
                </div>
                <div className="points">
                    <Image
                        src={"https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/IT-Security-Notes_882edb294c26c83de20173e20c4ce806.jpg"}
                        alt="Scam & Fraud Awareness"/>
                </div>
            </div>
        </div>
    )
}

export default ScamAwareness