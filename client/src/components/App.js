import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchUser } from "../actions";
import Main from "./Main";
import Nav from "./Nav";
import Bar from "./Bar";
import Personal from "./Personal";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import SleepyForm from "./SleepyForm";
import TipsSleep from "./TipsSleep";
import SleepyResults from "./SleepyResults";
import AllDocsDisplay from "./AllDocsDisplay";
import EditProfile from "./EditProfile";
import FindRestaurant from "./FindRestaurant";
import OneDocDisplay from "./OneDocDisplay";
import Map from "./Map/Map";
import Norms from "./Norms";
import { createTheme, ThemeProvider } from "@mui/material/";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3C7D80",
      light: "#4C7D80",
      dark: "#073a67",
    },
    button: {
      main: "#bf1650",
      light: "#7D803C",
      dark: "#d7a8b6",
    },
    text: {
      main: "#3C7D80",
      light: "whitesmoke",
      dark: "#cb4587",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        "&:hover": {
          color: "#bf1650",
          backgroundColor: "transparent",
        },
        "&:active": {
          transition: "0.3s all ",
          transform: "translateY(3px) ",
          border: "1px solid transparent",
          opacity: "0.8 ",
        },
      },
    },
  },
});

const companyData = {
  name: "SleepyApp",
  url: "https://protected-beach-44415.herokuapp.com/",
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const auth = user.authenticated;
  useEffect(() => {
    if (auth) {
      dispatch(fetchUser());
    }
  }, [auth, dispatch]);

  const navElement = useMemo(
    () => <Nav user={user} companyData={companyData} />,
    [user]
  );
  const mainElement = useMemo(
    () => <Main user={user} companyData={companyData} />,
    [user]
  );
  const personalElement = useMemo(() => <Personal user={user} />, [user]);
  const editProfileElement = useMemo(() => <EditProfile user={user} />, [user]);
  const NormsElement = useMemo(() => <Norms />, []);
  const TipsElement = useMemo(() => <TipsSleep />, []);
  const barElement = useMemo(() => <Bar />, []);

  return (
    <ThemeProvider theme={theme}>
      {navElement}
      {/* {barElement} */}
      <Routes>
        <Route exact path="/" element={mainElement} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route exact path="/personal" element={personalElement} />
        <Route path="/sleepy-form-post" element={<SleepyForm user={user} />} />
        <Route path="/personal/sleepy-form-get" element={<SleepyResults />} />
        <Route path="/personal/all-docs-display" element={<AllDocsDisplay />} />
        <Route path="/personal/edit" element={editProfileElement} />
        <Route path="/tips-sleep" element={TipsElement} />
        <Route path="/norms" element={NormsElement} />
        <Route path="/find-restaurant" element={<FindRestaurant />} />
        <Route path="/personal/:docId" element={<OneDocDisplay />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
