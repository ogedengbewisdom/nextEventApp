import { Fragment } from "react";
import EventList from "../../components/EventList";
// import { getAllEvents } from "../../dummy_data";
import EventSearch from "../../components/EventSearch";
import { useRouter } from "next/router";
import Head from "next/head"
import { getAllEvents } from "../../helpers/apiUtil";

const AllEventsPage = (props) => {

    const {events} = props
    const router = useRouter()
    // const allEvents = getAllEvents();
    const searchEventHandler = (month, year) => {
        router.push("/events/" + year + "/" + month)
    }
    return (
        <Fragment>
            <Head>
                <title>All Events</title>
                <meta name="description" content="Find events that can make your life fufilled" />
            </Head>
            <EventSearch onSearch={searchEventHandler} />
            <EventList items={events} />
        </Fragment>
    )
}

export const getStaticProps = async () => {

    const transformedEvents = await getAllEvents();

    
    return {
        props: {
            events: transformedEvents
        }
    }
}

export default AllEventsPage;