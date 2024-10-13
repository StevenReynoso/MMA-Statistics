import { Box, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import Row2 from './Row2';

const gridTemplateStyles = (isMediumScreen: boolean, isLargeScreen: boolean) => {
  if (isLargeScreen) {
    return {
      gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
      gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
      gridTemplateAreas: `
        "a b b"
        "a b b"
        "a b b"
        "a b b"
        "a b b"
        "a b b"
        "a b b"
        "a b b"
        "c c c"
      `,
    };
  } else if (isMediumScreen) {
    return {
      gridTemplateColumns: "repeat(3, minmax(100vw, 1fr))",
      gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
      gridTemplateAreas: `
        "a"
        "a"
        "a"
        "a"
        "b"
        "b"
        "b"
        "b"
        "c"
      `,
    };
  } else {
    return {
      gridTemplateColumns: "repeat(1, minmax(100vw, 1fr))",
      gridTemplateRows: "repeat(1, minmax(230px, 1fr))",
      gridTemplateAreas: `
        "a"
        "a"
        "a"
        "a"
        "b"
        "b"
        "b"
        "b"
        "c"
      `,
    };
  }
};

const baseStyles = {
  display: 'grid',
  gap: '1.5rem',
  width: '100%',
  height: '100%',
};

type Props = {
  setActiveId: (id: number) => void;
  setId: (id: number) => void;
};

const Dashboard = ({ setActiveId, setId }: Props) => {
  const isMediumScreen = useMediaQuery("(min-width: 600px) and (max-width: 1199px)");
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");

  // Memoize styles to optimize re-rendering
  const styles = useMemo(
    () => ({ ...baseStyles, ...gridTemplateStyles(isMediumScreen, isLargeScreen) }),
    [isMediumScreen, isLargeScreen]
  );

  return (
    <Box sx={styles}>
      {/* Rows can be lazy-loaded if needed */}
      <Row2 setActiveId={setActiveId} setId={setId} />
    </Box>
  );
};

export default Dashboard;
