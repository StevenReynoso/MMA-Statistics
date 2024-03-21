import DashboardBox from '@/Components/DashboardBox';
import { useGetEventsQuery } from '@/State/api';
import React, { useState } from 'react';

type Props = {
  setActiveId: (id: number) => void; // Define setActiveId prop
}

const Row1 = ({ setActiveId }: Props) => {
    const { data } = useGetEventsQuery();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleBoxClick = (eventData: any) => {
        setActiveId(eventData.ID); // Set active ID when box clicked
    };

    return (
        <>
            <DashboardBox gridArea="a">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    overflow: 'auto',
                    maxHeight: '98%',
                }}>
                    {data && data.map((event: any) => (
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
                            <div style={{ marginLeft: '20px' }}>
                            </div>
                            <img src={event.Red_Fighter_images} alt="Red Fighter" style={{ width: '50%', height: 'auto', marginRight: '-25px'}} />
                            <img src={event.Blue_Fighter_images} alt="Blue Fighter" style={{ width: '50%', height: 'auto', marginLeft: '-45px'}} />
                        </div>
                    ))}
                </div>
            </DashboardBox>
        </>
    )
}

export default Row1;
