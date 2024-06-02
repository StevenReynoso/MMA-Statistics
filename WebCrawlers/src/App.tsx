import { useMemo } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from './theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "@/Scenes/NavBar";
import Dashboard from "@/Scenes/Dashboard";
import Predictions from './Scenes/Predictions';

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              width: '100vw',
              height: '100vh',
              padding: {
                xs: '', // small screens
                sm: '1rem 2rem', // medium screens
                md: '1rem 2rem 4rem 2rem', // large screens and up
              }
            }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard setActiveId={Number} setId={Number} />} />
              <Route path="/predictions" element={<Predictions />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
