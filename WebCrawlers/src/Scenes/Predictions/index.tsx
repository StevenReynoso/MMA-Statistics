//@ts-expect //ignore warning
import { useTheme } from "@mui/material";

const Predictions = () => {
    const { palette } = useTheme()
    console.log(palette.primary)

    return (
        
        <div style={{textAlign: 'center'}}>
            <h1 style={{color: 'white'}}>MMA-AI by Dan McInerney</h1>
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