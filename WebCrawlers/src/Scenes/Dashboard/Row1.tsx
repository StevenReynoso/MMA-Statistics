import DashboardBox from '@/Components/DashboardBox';
import { useGetEventsQuery } from '@/State/api';
import React, { useMemo, useState } from 'react';

type Props = {}

const Row1 = (props: Props) => {
    const { data } = useGetEventsQuery();

    //console.log('data:', data);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleBoxClick = (eventData: any) => {
        // Handle box click here, for example:
        console.log("Box clicked:", eventData);
    };

    return (
        <>
            <DashboardBox gridArea="a">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    overflow: 'auto', // Add this line for scrollbar
                    maxHeight: '98%', // Add this line to limit the height and enable scrolling
                }}>
                    {data && data.map((event: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => handleBoxClick(event)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                border: '1px solid black',
                                padding: '10px',
                                color: 'whitesmoke',
                                display: 'flex',
                                alignItems: 'center',
                                borderColor: hoveredIndex === index ? 'lightseagreen' : 'transparent', // Highlight when hovered
                                transition: 'background-color 0.3s ease-in-out' // Smooth transition
                            }}
                        >
                            <div>
                                <h3>{event.Event_Name}</h3>
                                <p>{event.Event_Date}</p>
                            </div>
                            <div style={{ marginLeft: '20px' }}>
                            </div>
                            <img src={event.Red_Fighter_images} alt="Red Fighter" style={{ width: '50%', height: 'auto', marginRight: '-25px', zIndex: 1 }} />
                            <img src={event.Blue_Fighter_images} alt="Blue Fighter" style={{ width: '50%', height: 'auto', marginLeft: '-45px', zIndex: 0 }} />
                        </div>
                    ))}
                </div>
            </DashboardBox>
            
        </>
    )
}

export default Row1;
