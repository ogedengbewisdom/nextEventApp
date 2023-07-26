import EventList from "../components/EventList";
import {getFeaturedEvents} from "../dummy_data"


const HomePage = () => {
    const featuredEvents = getFeaturedEvents()
    return (
        <EventList items={featuredEvents} />
    )
}

export default HomePage;