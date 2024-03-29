import Navbar from "../components/Navbar";
import CompWrapper from "../components/CompWrapper";
import { Box, Typography } from "@mui/material";
import { useMediaQuery, CircularProgress } from "@mui/material";
import Stories from "../components/Stories";
import Following from "../components/Following";
import SidePanel from "../components/SidePanel";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import ProfilePicture from "../components/ProfilePicture";
import { useEffect } from "react";
const SearchResults = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL
  const { keyword, choice } = useParams();
  const navigate = useNavigate();
  const isWideScreen = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const [results, setResults] = useState(null);
  const getUserResults = async () => {
    const response = await fetch(
      `${SERVER_URL}/search/users/${keyword}`,
      {
        method: "GET",
      }
    );
    const users = await response.json();
    setResults(users);
  };
  useEffect( () => {
    if(choice === "users"){
      getUserResults();
    }
  }, []);
  useEffect( () => {
  }, [results])
  return (
    <>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 6%"
        display={isWideScreen ? "flex" : "block"}
        justifyContent="space-between"
        gap="2rem"
      >
        <SidePanel flexBasis={isWideScreen ? "30%" : undefined} />
        {choice === "stories" ? (
          <Stories isSearch={true} searchKeyword={keyword} />
        ) : (
          <Box flexBasis="50%" textAlign="center" mt={results ? "" : "2rem"}>
            {results ? Object.keys(results).length > 0 ? (
              results.map((result) => (
                
                <CompWrapper
                  margin="2rem 0"
                  flexDirection="column"
                  boxShadow={`0px 0px 15px ${palette.neutral.light}`}
                  padding="1.2rem"
                  borderRadius="0.4rem"
                >
                  <CompWrapper width="100%">
                    <CompWrapper gap="1rem">
                      <ProfilePicture
                        size="35px"
                        picturePath={result.userPicturePath}
                      />
                      <Box>
                        <Typography
                          color={palette.neutral.main}
                          variant="h5"
                          fontWeight="500"
                          sx={{
                            "&:hover": { color: palette.neutral.medium, cursor: "pointer" },
                          }}
                          onClick={() => navigate(`/user/${result._id}`)}
                        >
                          {result.username}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap="1.25rem">
                        <Typography>{Object.keys(result.followers).length} &nbsp; Followers</Typography>
                      </Box>
                    </CompWrapper>
                  </CompWrapper>
                </CompWrapper>
              ))
            ) : <Typography>No Results</Typography> : (
              <CircularProgress />
            )}
          </Box>
        )}
        <Following flexBasis={isWideScreen ? "30%" : undefined} />
      </Box>
    </>
  );
};

export default SearchResults;
