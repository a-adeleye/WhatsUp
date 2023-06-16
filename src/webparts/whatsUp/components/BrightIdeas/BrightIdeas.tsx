import * as React from 'react';

import "../ScamAwareness/ScamAwareness.scss";


const BrightIdeas: React.FC<any> = () => {
    return (
        <div className={"orange-section with-form"}>
            <div className="container">
                <div className="icon">
                    <img alt="" src={require('../../assets/ideas.png')}/>
                </div>
                <h1 className="title">BRIGHT IDEAS!</h1>
                <div className="description">We rely on our excellent team to share their innovative ideas to propel us
                    higher than we have ever imagined.
                </div>
                <form action="">
                    <input type={"text"} placeholder={"Name"}/>
                    <input type={"email"} placeholder={"Email"}/>
                    <textarea placeholder={"Idea"}></textarea>
                    <button>Submit</button>
                </form>

            </div>
        </div>
    )
}

export default BrightIdeas