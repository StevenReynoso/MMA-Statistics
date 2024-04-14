import { useTheme } from "@mui/material";
import React from "react"


type Props = {};

const Predictions = (props: Props) => {
    const { palette } = useTheme()

    return (
        <div style={{textAlign: 'center'}}>
            <iframe
                title="MMA-AI by DanHMcInerney"
                src="https://www.mma-ai.net/upcoming/"
                height="500"
                width= "700"
                
                />
        </div>
           
    );
};

export default Predictions;