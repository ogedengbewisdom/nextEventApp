import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import EventList from "../../components/EventList";
import useSWR from "swr";
// import { getFilteredEvents } from "../../dummy_data";
import ResultsTitle from "../../components/results-title";
import ErrorAlert from "../../ui/error-alert";
import Button from "../../ui/Button";
import Head from "next/head";
import { getFilteredEvents } from "../../helpers/apiUtil";

const FilteredEventPage = (props) => {
    // const {events, dates} = props;
    const [loadedEvents, setLoadedEvents] = useState([])
    const router = useRouter();
    const filteredData = router.query.slug;

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {data, error} = useSWR("https://nextjs-e65fb-default-rtdb.firebaseio.com/events.json", fetcher);

    useEffect( () => {
        const events = [];
        if (data) {
            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                })
            }
            setLoadedEvents(events)
        }
    }, [data])

    if(!filteredData) {
        return <p className="center">Loading...</p>
    };


    const year = filteredData[0];
    const month = filteredData[1];
    const numYear = +year;
    const numMonth = +month
    
// return (<h1>I Love Next</h1>)
    let pageHeaderData = (
        <Head>
        <title>No Filtered Events</title>
        <meta name="description" content={`List of filtered events`} />
        </Head>
    )

    
    if(isNaN(numMonth) || isNaN(numYear) || numMonth > 12 || numMonth < 1 || numYear > 2030 || numYear < 2021 || error) {
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
     const filteredEvents =  loadedEvents.filter(item => {
        const eventDate = new Date(item.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
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


// export const getServerSideProps = async (context) => {

//     const {params} = context;
//     const filteredData = params.slug;

//     // if(!filteredData) {
//     //     return <p style={{textAlign: "center"}}>Loading...</p>
//     // }
//     const filteredMonth = filteredData[1];
//     const filteredYear = filteredData[0];
//     const numMonth = +filteredMonth;
//     const numYear = +filteredYear

  

//     if (
//         isNaN(numMonth) || isNaN(numYear) || numMonth > 12 || numMonth < 1 || numYear > 2030 || numYear < 2021
//     ) {
//         return {
//             props: {
//                 hasError: true
//             },
//             // notFound: true,
//             // redirect: {
//             //     destination: "/error"
//             // }
//         }
//     }
//     const filteredEvents = await getFilteredEvents({year: numYear, month: numMonth})

//     return {
//         props: {
//             events: filteredEvents,
//             dates: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }
// }

export default FilteredEventPage;