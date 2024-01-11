import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeSettings } from './theme';
import Login from "./pages/Login"
import ProfilePage from './pages/ProfilePage';
import NewStory from './pages/NewStory';
import Topic from "./pages/Topic";
import StoriesFilter from './pages/StoriesFilter';
import SearchResults from './pages/SearchResults';
import Settings from "./pages/Settings";
import ImagesStories from "./pages/ImagesStories";
function App() {

  const theme = useSelector( (state) => state.theme );
  const finalTheme = useMemo( () => createTheme(themeSettings(theme)), [theme]);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={finalTheme}>
          <CssBaseline>
            <Routes>
              <Route path="/" element={ <Home/> } />
              <Route path="/login" element={ <Login /> } />
              <Route path="/user/:thisUserId" element={ <ProfilePage />} />
              <Route path="/newstory" element={ <NewStory/> } />
              <Route path="/newstory/response/:response" element={ <NewStory/>} />
              <Route path="/search/:choice/:keyword" element={ <SearchResults/> } />
              <Route path="/topic/:topic" element={ <Topic/> } />
              <Route path="/agree" element={<StoriesFilter isAgree={true} isDisagree={false}/>} />
              <Route path="/disagree" element={<StoriesFilter isAgree={false} isDisagree={true} />}/>
              <Route path="/settings" element={<Settings/>} />
              <Route path="/images" element={<ImagesStories/>} />
            </Routes>
          </CssBaseline>
        </ThemeProvider>
     </BrowserRouter>
        
    </div>
  )
}

export default App;
