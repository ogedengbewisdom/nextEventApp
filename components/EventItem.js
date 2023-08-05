
import classes from "./EventItem.module.css"
import Button from "../ui/Button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon"
import Image from "next/image";

const EventItem = ({image, title, date, location, id}) => {

    const humanReadableTime = new Date(date).toLocaleString("en-US", {day: "numeric", month: "long", year: "numeric"})
    const formatLocation = location.replace(",", "\n")
    return (
        <li className={classes.item}>
            <Image src={`/${image}`} alt={title} width={250} height={160} />
            <div className={classes.content}>
                <div>
                    <div className={classes.summary}>
                        <h2>{title}</h2>
                    </div>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{humanReadableTime}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formatLocation}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={`/events/${id}`}>
                    <span>Explore Events</span>
                    <span className={classes.icon}>
                        <ArrowRightIcon />
                    </span>
                    </Button>
                    
                
            </div>
            </div>
        </li>
    )
}

export default EventItem