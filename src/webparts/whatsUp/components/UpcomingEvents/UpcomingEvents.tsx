import * as React from "react";
import './UpcomingEvents.scss';

const UpcomingEvents: React.FC<any> = (props) => {
    const {events} = props;

    return (
        <div className={"upcoming-events"}>
            {events.map((item: any) => (
                <div className="event" key={item.Id}>
                    <h4>{item.Title}</h4>
                    <p>{item.WhatsUpDate}</p>
                    <p>{item.Location}</p>
                </div>
            ))}
        </div>
    )
}

export default UpcomingEvents