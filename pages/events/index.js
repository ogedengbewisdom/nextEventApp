import { Fragment } from "react";
import EventList from "../../components/EventList";
import { getAllEvents } from "../../dummy_data";
import EventSearch from "../../components/EventSearch";
import { useRouter } from "next/router";

const AllEventsPage = () => {

    const router = useRouter()
    const allEvents = getAllEvents();
    const searchEventHandler = (month, year) => {
        router.push("/events/" + year + "/" + month)
    }
    return (
        <Fragment>
            <EventSearch onSearch={searchEventHandler} />
        <EventList items={allEvents} />
        </Fragment>
    )
}

export default AllEventsPage;