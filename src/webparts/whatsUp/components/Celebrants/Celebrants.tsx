import * as React from 'react';
import "./Celebrants.scss";
import Celebrant from "../Celebrant/Celebrant";


const Celebrants: React.FC<any> = (props) => {
    const {celebrants, news_letter} = props;
    const month = () => {
        return news_letter?.Title?.split(" ")[0];
    }
    return (
        <div className={"celebrants"}>
            <div className={"subtitle"}>
                <h2>{month()} Celebrants</h2>
            </div>
            <div className={"celebrants-animated"}>
                <img alt="" src={require("../../assets/images/HBD-Jetex-1.gif")}/>
            </div>
            <div className={"celebrants-wrapper"}>
                {celebrants.map((item: any) => (
                    <Celebrant celebrant={item} key={item.Id}/>
                ))}
            </div>

        </div>
    );
}

export default Celebrants