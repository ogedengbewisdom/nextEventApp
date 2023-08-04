import { Fragment } from "react";
import EventList from "../../components/EventList";
import { getAllEvents } from "../../dummy_data";
import EventSearch from "../../components/EventSearch";
import { useRouter } from "next/router";

const AllEventsPage = (props) => {

    const {events} = props
    const router = useRouter()
    // const allEvents = getAllEvents();
    const searchEventHandler = (month, year) => {
        router.push("/events/" + year + "/" + month)
    }
    return (
        <Fragment>
            <EventSearch onSearch={searchEventHandler} />
        <EventList items={events} />
        </Fragment>
    )
}

export const getStaticProps = async () => {

    const response = await fetch("https://nextjs-e65fb-default-rtdb.firebaseio.com/events.json");
    const resData = await response.json();
    const transformedEvents = [];
    for( const key in resData ) {
        transformedEvents.push({
            id: key,
            title: resData[key].title,
            date: resData[key].date,
            description: resData[key].description,
            location: resData[key].location,
            image: resData[key].image,
            isFeatured: resData[key].isFeatured
        })
    }

    
    return {
        props: {
            events: transformedEvents
        }
    }
}

export default AllEventsPage;