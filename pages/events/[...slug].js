import { useRouter } from "next/router"
import { Fragment } from "react"
import EventList from "../../components/EventList";
// import { getFilteredEvents } from "../../dummy_data";
import ResultsTitle from "../../components/results-title";
import ErrorAlert from "../../ui/error-alert";
import Button from "../../ui/Button";
import Head from "next/head";

const FilteredEventPage = (props) => {
    const {events} = props;
    
    const router = useRouter();
    const filteredData = router.query.slug;
    
    if(!filteredData) {
        return <p className="center">Loading...</p>
    }

    let pageHeaderData = (
        <Head>
        <title>No Filtered Events</title>
        <meta name="description" content={`List of filtered events`} />
        </Head>
    )

    const filteredMonth = filteredData[1];
    const filteredYear = filteredData[0];
    const numMonth = +filteredMonth;
    const numYear = +filteredYear;

    
    if(isNaN(numMonth) || isNaN(numYear) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return (
            <Fragment>
                {pageHeaderData}
                <ErrorAlert><p>Invalid filter. Please adjust your values!</p></ErrorAlert>;
                <div className="center">
                   <Button link={`/`}>Back Home</Button>
                </div>
            </Fragment>
        )
    }
    // const filteredEvents = getFilteredEvents({year: numYear, month: numMonth});
    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth -1
    })
    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeaderData}
                <ErrorAlert><p>No Event found for the chosen filter!</p></ErrorAlert>
                <div className="center">
                <Button link={`/events`}>Show all events</Button>
                </div>
            </Fragment>
        )
        
    }

    pageHeaderData = (
        <Head>
        <title>Filtered Events</title>
        <meta name="description" content={`Event form ${numMonth}/${numYear}`} />
        </Head>
    )

    const date = new Date(numYear, numMonth - 1)
 
    return (
        <Fragment>
            {pageHeaderData}
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
}

export const getServerSideProps = async() => {
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

export default FilteredEventPage;