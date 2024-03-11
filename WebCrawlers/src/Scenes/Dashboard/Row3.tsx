import DashboardBox from '@/Components/DashboardBox';
import { useGetKpisQuery } from '@/State/api';
import React from 'react';

type Props = {}

const Row3 = (props: Props) => {
  const { data } = useGetKpisQuery();
  //console.log('Edata:', data)
  return (
    <>
        <DashboardBox gridArea="g"></DashboardBox>
        <DashboardBox gridArea="h"></DashboardBox>
        <DashboardBox gridArea="i"></DashboardBox>
        <DashboardBox gridArea="j"></DashboardBox>
    </>
  )
}

export default Row3