
import { useMemo } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from './theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "@/Scenes/NavBar";
import Dashboard from "@/Scenes/Dashboard";
import Predictions from './Scenes/Predictions';

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  return (
    <div className='app'>
      <BrowserRouter>
       <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width= "100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />}/> //homepage
            <Route path="/predictions" element={<Predictions/>} />
          </Routes>
        </Box>
       </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
