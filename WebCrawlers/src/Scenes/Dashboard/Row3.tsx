import DashboardBox from '@/Components/DashboardBox';
import { useGetFightersQuery } from '@/State/api';
import React from 'react';

type Props = {
  setActiveId: (id: number) => void;
}

const Row3 = (props: Props) => {
  const { data } = useGetFightersQuery();

  const handleClick = (id: number) => {
    // Pass the ID back to Row2
    props.setActiveId(id); // Assuming id is defined somewhere
  };

  return (
    <>
      <DashboardBox gridArea="g"></DashboardBox>
      <DashboardBox gridArea="h"></DashboardBox>
    </>
  );
}

export default Row3;
