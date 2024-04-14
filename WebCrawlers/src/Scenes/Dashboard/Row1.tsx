import DashboardBox from '@/Components/DashboardBox';
import { useGetEventsQuery } from '@/State/api';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const Row1 = ({ setActiveId }) => {
    const { data, isLoading, isError } = useGetEventsQuery();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [fightFilter, setFightFilter] = useState('Upcoming');
    const [activeId] = useState(null); // State to hold active ID

    const monthMap = {
        "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
        "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11,
    };

    const normalizeString = (str) => {
        const pattern = /\b[A-Za-z]{3} \d{1,2}\b/;
        const match = str.match(pattern);
        return match ? match[0] : "Date not found in the specified format.";
    };

    const filterEvents = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        return data?.filter((event) => {
            const findDate = normalizeString(event.Event_Date);
            const [monthName, day] = findDate.split(" ");
            const eventMonth = monthMap[monthName];

            if (fightFilter === "Upcoming") {
                return (eventMonth > currentMonth || (eventMonth === currentMonth && parseInt(day) >= currentDay));
            } else if (fightFilter === "Past") {
                return (eventMonth < currentMonth || (eventMonth === currentMonth && parseInt(day) < currentDay));
            }
            return false;
        }) || [];
    };

    const handleBoxClick = (eventData) => {
        setActiveId(eventData.ID);
    };

    useEffect(() => {
        // Check if activeId exists in filteredEvents, if not, update activeId
        const filteredEvents = filterEvents();
        if (setActiveId && !filteredEvents.find(event => event.ID === activeId)) {
            setActiveId(filteredEvents.length > 0 ? filteredEvents[0].ID : null);
        }
    }, [data, fightFilter]); // Update when data or filter changes

    const filteredEvents = filterEvents();

    const getButtonStyle = (filterType) => ({
        fontSize: '20px',
        backgroundColor: fightFilter === filterType ? 'rgba(32, 178, 170, 0.6)' : '#2d2d34',
        color: fightFilter === filterType ? 'white' : '#12efc8',
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data...</div>;
    }

    return (
        <DashboardBox gridArea="a">
            <div style={{ display: 'table', marginLeft: 'auto', marginRight: 'auto' }}>
                <Button style={{ ...getButtonStyle('Upcoming'), marginRight: '30px' }} onClick={() => setFightFilter("Upcoming")}> Upcoming </Button>
                <Button style={getButtonStyle('Past')} onClick={() => setFightFilter("Past")}> Past </Button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                overflow: 'auto',
                maxHeight: '92%',
                maxWidth: '100%',
            }}>
                {filteredEvents.map((event) => (
                    <div
                        key={event.ID}
                        onClick={() => handleBoxClick(event)}
                        onMouseEnter={() => setHoveredIndex(event.ID)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                            border: '1px solid black',
                            padding: '10px',
                            color: 'whitesmoke',
                            display: 'flex',
                            alignItems: 'center',
                            borderColor: hoveredIndex === event.ID ? 'lightseagreen' : 'transparent',
                            transition: 'all 0.3s ease-in-out'
                        }}
                    >
                        <div>
                            <h3>{event.Event_Name}</h3>
                            <p>{event.Event_Date}</p>
                        </div>
                        <div style={{ marginLeft: '20px' }}></div>
                        <img src={event.Red_Fighter_images} alt="Red Fighter" style={{ width: '50%', height: 'auto', marginRight: '-25px' }} />
                        <img src={event.Blue_Fighter_images} alt="Blue Fighter" style={{ width: '50%', height: 'auto', marginLeft: '-45px' }} />
                    </div>
                ))}
            </div>
        </DashboardBox>
    );
}

export default Row1;
