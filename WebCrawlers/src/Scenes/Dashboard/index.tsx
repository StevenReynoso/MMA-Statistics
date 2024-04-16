import { Box, useMediaQuery} from '@mui/material'
import Row2 from './Row2';


const gridTemplateLargeScreens = `
    "a b b"
    "a b b"
    "a b b"
    "a b b"
    "a b b"
    "a b b"
    "a b b"
    "a b b"
    "c c c"
`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "b"
  "b"
  "b"
  "c"
`;

type Props = {
  setActiveId: (id: number) => void;
  setId: (id: number) => void;
}

const Dashboard = ({ setActiveId, setId }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")

  return (
    <Box 
        width="100%" 
        height="115%" 
        display="grid" 
        gap="1.5rem"
        sx={
          isAboveMediumScreens ? { 
            gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
            gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
            gridTemplateAreas: gridTemplateLargeScreens,
          } : {
            gridAutoColumns: "1fr",
            gridAutoRows: "90px",
            gridTemplateAreas: gridTemplateSmallScreens,
          }
        }
    >
        {/* <Row1 /> */}
        <Row2 setActiveId={setActiveId} setId={setId} />
        {/* <Row3 /> */}
    </Box>
  );
};

export default Dashboard;