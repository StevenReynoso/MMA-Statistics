import DashboardBox from '@/Components/DashboardBox';
import { useGetFightsQuery } from '@/State/api';
import React, { useMemo, useState } from 'react';

type Props = {}

const Row2 = (props: Props) => {
  const { data } = useGetFightsQuery();
  console.log('Fightsdata:', data)

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleBoxClick = (eventData: any) => {
    // Handle box click here, for example:
    console.log("Box clicked:", eventData);
  };

  return (
    <>
      <DashboardBox gridArea="b">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          overflow: 'auto',
          maxHeight: '98%',
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
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr', // Three columns: 1 for red fighter, 1 for VS, and 1 for blue fighter
                gridTemplateRows: 'auto auto auto', // Three rows: Red fighter image, name, and weight class
                gap: '10px',
                alignItems: 'start',
                justifyContent: 'center',
                borderColor: hoveredIndex === index ? 'lightseagreen' : 'transparent',
                transition: 'background-color 0.3s ease-in-out'
              }}
            >
              {/* Red Fighter */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={event.Red_Event_fighter_image} alt="Red Fighter" style={{
                  width: '185px',
                  height: '150px',
                  objectFit: 'cover',
                  objectPosition: 'top'
                }} />
                <h2 style={{ margin: '5px 0' }}>{event.Red_Fighter_Name}</h2>
              </div>

              {/* VS */}
              <div style={{ display: 'flex', flexDirection: 'column',  }}>
                <h4 style={{ alignItems: 'start', fontSize: '18px' }}>{event.Event_Weight}</h4>
                <h3 style={{ marginTop: '-12px', textAlign: 'center' }}>VS</h3>
              </div>

              {/* Blue Fighter */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <h2 style={{ margin: '5px 0' }}>{event.Blue_Fighter_Name}</h2>
                <img src={event.Blue_Event_fighter_image} alt="Blue Fighter" style={{
                  width: '185px',
                  height: '150px',
                  objectFit: 'cover',
                  objectPosition: 'top'
                }} />
              </div>
            </div>
          ))}
        </div>
      </DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  )
}

export default Row2;
