
export const getAllEvents = async() => {
    const response = await fetch("https://nextjs-e65fb-default-rtdb.firebaseio.com/events.json");
    const data = await response.json();
    let transformedEvents = [];
    for (const key in data) {
        transformedEvents.push({
            id: key,
            date: data[key].date,
            description: data[key].description,
            image: data[key].image,
            isFeatured: data[key].isFeatured,
            location: data[key].location,
            title: data[key].title
        });
    };
    return transformedEvents;
};

export const getFeaturedEvents = async () => {
    const allEvents = await getAllEvents();
    const featuredEvents = allEvents.filter(item => item.isFeatured);
    return featuredEvents
};

export const getEventById  = async (id) => {
    const allEvents = await getAllEvents();
    return allEvents.find(item => item.id === id);
    
};

export const getFilteredEvents = async (dateFilter) => {
    const {year, month} = dateFilter;
    const allEvents = await getAllEvents();
    const filteredEvents = allEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
    return filteredEvents;
};