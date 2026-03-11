import * as React from 'react';
import "./Celebrants.scss";
import Celebrant from "../Celebrant/Celebrant";


const Celebrants: React.FC<any> = (props) => {
    const {celebrants} = props;

    return (
        <div className={"celebrants"}>
            <div className={"celebrants-wrapper"}>
                {celebrants.map((item: any) => (
                    <Celebrant celebrant={item} key={item.Id}/>
                ))}
            </div>
        </div>
    );
}

export default Celebrants