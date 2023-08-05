// import { useEffect, useState } from "react";
import { Fragment } from "react";
import EventList from "../components/EventList";
import Head from "next/head";


const HomePage = (props) => {
    const {events} = props;

    const filteredEvents = events.filter(item => item.isFeatured)
    // const [event, setEvent] = useState()

    // const transformedEventsHandler = async () => {
    //     const response = await fetch("https://nextjs-e65fb-default-rtdb.firebaseio.com/events.json");
    //     const data = await response.json();
       
    //     if (!data) {
    //         return <p>No data yet</p>
    //     }
    //     const transformedEvents = []
    //     for( const key in data ) {
    //         transformedEvents.push({
    //             id: key, 
    //             title: data[key].title, 
    //             location: data[key].location, 
    //             isFeatured: data[key].isFeatured, 
    //             image: data[key].image,
    //             description: data[key].description
    //         })
           
    //     }
    //     setEvent(transformedEvents)
    // }


    // useEffect( () => {
    //     transformedEventsHandler()
    // }, [])

    // if (!event ) {
    //     return <p>no event yet</p>
    // }

    // console.log(event)

    return (
        <Fragment>
            <Head>
                <title>Nextjs Events</title>
                <meta name="description" content="Find events that can make your life fufilled" />
            </Head>
            <EventList items={filteredEvents} />
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

export default HomePage;