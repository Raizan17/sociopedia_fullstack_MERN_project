import {Box} from "@mui/material";
import Navbar  from "scenes/navbar";

// difference between index.jsx and index.js is jsx files have react components in them so its just a syntactic sugar way to know which file has what content

const HomePage = () => {
  return (
  <Box>
    <Navbar />
  </Box>
  );
};

export default HomePage;