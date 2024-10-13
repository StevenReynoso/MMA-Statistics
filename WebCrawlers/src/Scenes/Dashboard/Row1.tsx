// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import DashboardBox from '@/Components/DashboardBox';
import { useGetEventsQuery } from '@/State/api';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, useMediaQuery } from '@mui/material';

interface Event {
  ID: string;
  Event_Name: string;
  Event_Date: string;
  Red_Fighter_images: string;
  Blue_Fighter_images: string;
}

const monthMap = {
  "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
  "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11,
};

const Row1 = ({ setActiveId = () => {} }: { setActiveId?: (id: string) => void }) => {
  const { data, isLoading, isError } = useGetEventsQuery();
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [fightFilter, setFightFilter] = useState('Upcoming');
  const [activeId, setActiveIdState] = useState<string | null>(null); 
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const normalizeString = useCallback((str: string) => {
    const pattern = /\b[A-Za-z]{3} \d{1,2}\b/;
    const match = str.match(pattern);
    return match ? match[0] : "Date not found in the specified format.";
  }, []);

  const filteredEvents = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    return data?.filter((event: Event) => {
      const findDate = normalizeString(event.Event_Date);
      const [monthName, day] = findDate.split(" ");
      const eventMonth = monthMap[monthName];

      if (fightFilter === "Upcoming") {
        return eventMonth > currentMonth || (eventMonth === currentMonth && parseInt(day) >= currentDay);
      } else if (fightFilter === "Past") {
        return eventMonth < currentMonth || (eventMonth === currentMonth && parseInt(day) < currentDay);
      }
      return false;
    }) || [];
  }, [data, fightFilter, normalizeString]);

  const handleBoxClick = useCallback((eventData: Event) => {
    setActiveId(eventData.ID);
    setActiveIdState(eventData.ID);
  }, [setActiveId]);

  useEffect(() => {
    const eventExists = filteredEvents.some(event => event.ID === activeId);
    if (!eventExists && filteredEvents.length > 0) {
      setActiveId(filteredEvents[0].ID);
      setActiveIdState(filteredEvents[0].ID);
    }
  }, [filteredEvents, activeId, setActiveId]);

  const getButtonStyle = useCallback((filterType: string) => ({
    fontSize: '20px',
    backgroundColor: fightFilter === filterType ? 'rgba(32, 178, 170, 0.6)' : '#2d2d34',
    color: fightFilter === filterType ? 'white' : '#12efc8',
  }), [fightFilter]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data...</div>;
  }

  return (
    <DashboardBox gridArea="a">
      <div style={{ display: 'table', marginLeft: 'auto', marginRight: 'auto' }}>
        <Button style={{ ...getButtonStyle('Upcoming'), marginRight: '30px' }} onClick={() => setFightFilter("Upcoming")}>
          Upcoming
        </Button>
        <Button style={getButtonStyle('Past')} onClick={() => setFightFilter("Past")}>
          Past
        </Button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        overflow: 'auto',
        maxHeight: isSmallScreen ? '82%' : '92%',
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
              borderColor: activeId === event.ID ? 'lightseagreen' : (hoveredIndex === event.ID ? 'lightseagreen' : 'transparent'),
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <div>
              <h3>{event.Event_Name}</h3>
              <p>{event.Event_Date}</p>
            </div>
            <div style={{ marginLeft: '20px' }}></div>
            <img src={event.Red_Fighter_images} alt="Red Fighter" style={{ width: '50%', height: 'auto', marginRight: '-25px' }} loading="lazy" />
            <img src={event.Blue_Fighter_images} alt="Blue Fighter" style={{ width: '50%', height: 'auto', marginLeft: '-45px' }} loading="lazy" />
          </div>
        ))}
      </div>
    </DashboardBox>
  );
};

export default Row1;
