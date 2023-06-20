import * as React from "react";
import {useEffect, useState} from "react";
import './UpcomingEvents.scss';
import {getListItemsByTitle} from "../../Utils";
import {Spinner} from "office-ui-fabric-react";

const UpcomingEvents: React.FC<any> = (props) => {
    const {news_letter} = props;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        if (!news_letter) {
            return;
        }
        getListItemsByTitle("Events", "NewsletterId eq '" + news_letter.Id + "'")
            .then((response) => {
                setEvents(response);
                setLoading(false);
            })
    }

    useEffect(() => {
        getData();
    }, [news_letter])


    return (
        <>
            {loading && <div className={"text-center"}>
                <Spinner size={3}/>
            </div>}
            <div className={"upcoming-events"}>
                {events.map((item: any) => (
                    <div className="event" key={item.Id}>
                        <h4>{item.Title}</h4>
                        <p>{item.WhatsUpDate}</p>
                        <p>{item.Location}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UpcomingEvents