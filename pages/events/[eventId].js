import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
// import { useRouter } from "next/router";
// import { getEventById } from "../../dummy_data";
import ErrorAlert from "../../ui/error-alert";
import Button from "../../ui/Button";
import Head from "next/head"

const EventDetailPage = (props) => {

    // const router = useRouter();
    // const eventId = router.query.eventId;
    // const event = getEventById(eventId);

    const {event} = props
    if (!event) {
        return(
            <Fragment>
               <ErrorAlert><p>Page Not Found</p></ErrorAlert>
               <div className="center">
                <Button link={`/events`}>Back</Button>
               </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

const getEvent = async () => {
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

    return transformedEvents
}

export const getStaticProps = async (context) => {
    const {params} = context;
    const eventId = params.eventId;
    const event = await getEvent();
    const eventDetails = event.find(item => item.id === eventId);

    return {
        props: {
            event: eventDetails
        }
    }
}

export const getStaticPaths =async (context) => {


    const event = await getEvent();
    const pathsWithParams = event.map(item => ({params: {eventId: item.id}}))
    return {
        paths: pathsWithParams,
        fallback: false
    }
}

export default EventDetailPage;