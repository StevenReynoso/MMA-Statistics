// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import DashboardBox from '@/Components/DashboardBox';
import Row1 from './Row1';


type Props = {
  setActiveId: (id: number) => void;
}

const Row3 = ({ setActiveId }: Props) => {
  return (
    <>
      <Row1 setActiveId={setActiveId}/>
      <DashboardBox gridArea="g"></DashboardBox>
      <DashboardBox gridArea="h"></DashboardBox>
    </>
  );
}

export default Row3;
