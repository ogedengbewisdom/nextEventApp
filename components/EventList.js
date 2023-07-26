import EventItem from "./EventItem"
import classes from "./EventList.module.css"


const EventList = ({items}) => {

    return (
        <ul className={classes.list}>
            {items.map(item => <EventItem key={item.id} id={item.id}  title={item.title} date={item.date} location={item.location} image={item.image} />)}
        </ul>
    )
}

export default EventList