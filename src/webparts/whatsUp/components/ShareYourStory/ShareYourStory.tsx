import * as React from 'react';

import "../ScamAwareness/ScamAwareness.scss";
import {faCertificate} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(faCertificate);

const ShareYourStory: React.FC<any> = () => {
    return (
        <div className={"orange-section with-form"}>
            <div className="container">
                <div className="icon">
                    <FontAwesomeIcon icon={"certificate"} size="xl"/>
                </div>
                <h1 className="title">SHARE YOUR SUCCESS STORY WITH JETEX!</h1>
                <div className="description">Do you have a success story in Jetex you'd like to share with the others?
                    You can submit your story (not more than 35 words) and get a chance to be featured in the next
                    edition.
                </div>
                <form action="">
                    <input type={"text"} placeholder={"Name"}/>
                    <input type={"email"} placeholder={"Email"}/>
                    <textarea placeholder={"Success Story"}></textarea>
                    <button>Submit</button>
                </form>

            </div>
        </div>
    )
}

export default ShareYourStory