import { Fragment, useEffect, useState } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { useRouter } from "next/router";
// import { getEventById } from "../../dummy_data";
import ErrorAlert from "../../ui/error-alert";
import Button from "../../ui/Button";
import Head from "next/head"
import { getAllEvents, getEventById } from "../../helpers/apiUtil";
import Comments from "../../components/input/comments";

const EventDetailPage =  (props) => {

    // const [event, setEvent] = useState()
    
    // const router = useRouter();
    // const eventId = router.query.eventId;
    // const event = await getEventById(eventId);

    const {event} = props
    // useEffect( () => {
    //     const sendHttp = async () => {
           
    //             const response = await fetch(`https://nextjs-e65fb-default-rtdb.firebaseio.com/events/${eventId}.json`);
    //             if(!response.ok) {
    //                 throw new Error("error")
    //             }
    //             const data = await response.json();
    //             if (!data) {
    //                 return <p>Loading</p>
    //             }
                
    //             setEvent(data)
            
    //     }
    //     sendHttp()
    // }, [eventId])


 
   
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
            <Comments eventId={event.id} /> 
        </Fragment>
    )
}

export const getStaticProps = async (context) => {
    const {params} = context;
    const eventids = params.eventId;
    // const event = await getEvent();
    const eventDetails =await getEventById(eventids);

    if (!eventDetails) {
        return {
          notFound: true,
        };
      }

    return {
        props: {
            event: eventDetails
        }
    }
}

export const getStaticPaths =async (context) => {


    const event = await getAllEvents();
    const pathsWithParams = event.map(item => ({ params: { eventId: `${item.id}` } }));


    return {
        paths: pathsWithParams,
        fallback: false
    }
}


export default EventDetailPage;