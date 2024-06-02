import { Box, useMediaQuery } from '@mui/material';
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

const gridTemplateMediumScreens = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "c"
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
    "c"
`;

const largeScreenStyles = {
  gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
  gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
  gridTemplateAreas: gridTemplateLargeScreens,
};

const mediumScreenStyles = {
  gridTemplateColumns: "repeat(3, minmax(100vw, 1fr))",
  gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
  gridTemplateAreas: gridTemplateMediumScreens,
};

const smallScreenStyles = {
  gridTemplateColumns: "repeat(1, minmax(100vw, 1fr))",
  gridTemplateRows: "repeat(1, minmax(230px, 1fr))",
  gridTemplateAreas: gridTemplateSmallScreens,
};

type Props = {
  setActiveId: (id: number) => void;
  setId: (id: number) => void;
};

const Dashboard = ({ setActiveId, setId }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const isAboveSmallScreens = useMediaQuery("(min-width: 600px)");

  const styles = isAboveMediumScreens
    ? largeScreenStyles
    : isAboveSmallScreens
    ? mediumScreenStyles
    : smallScreenStyles;

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={styles}
    >
      {/* <Row1 /> */}
      <Row2 setActiveId={setActiveId} setId={setId} />
      {/* <Row3 /> */}
    </Box>
  );
};

export default Dashboard;
