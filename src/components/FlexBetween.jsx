import { Box } from "@mui/material";  
import { styled } from "@mui/system";

//resuing css as a components and add the css 
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;