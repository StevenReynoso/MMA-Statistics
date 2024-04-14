import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/Components/FlexBetween";
import logo from "./mma icons/48fx.png";

type Props = {};


const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");



  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <img src={logo} alt="Logo" style={{ width: "80px", height: "80px" }} />
        <Typography variant="h4" fontSize="18px">
          Octagon Fight Data
        </Typography>
        <Typography variant="h4" fontSize="20px" 
                    style={{ marginTop: '80px',
                             marginLeft: '22px',
                             display: selected === 'dashboard' ? "" : 'none',
                           }}>
            {/* Events */}
        </Typography>
      </FlexBetween>

       {/* RIGHT SIDE */}
       <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? 'lightseagreen' : 'inherit',
              textDecoration: "inherit",
              fontSize: '18px'
            }}
          >
            Events
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? 'lightseagreen' : 'inherit',
              textDecoration: "inherit",
              fontSize: '18px'
            }}
          >
            Predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;