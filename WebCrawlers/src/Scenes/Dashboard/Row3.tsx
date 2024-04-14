import DashboardBox from '@/Components/DashboardBox';
import { useGetFightersQuery } from '@/State/api';
import Row1 from './Row1';
import React, {useState} from 'react';

type Props = {
  setActiveId: (id: number) => void;
}

const Row3 = (setID: Props) => {
  const { data } = useGetFightersQuery();
  const [id, setId] = useState<number>(0);


  return (
    <>
      <Row1 setActiveId={setId}/>
      <DashboardBox gridArea="g"></DashboardBox>
      <DashboardBox gridArea="h"></DashboardBox>
    </>
  );
}

export default Row3;
