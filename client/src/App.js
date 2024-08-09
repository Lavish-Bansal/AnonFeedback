import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { useAppDispatch, useAppSelector } from "./store/store";
import { setLoading } from "./store/slices/loading.slice";
import { setUser } from "./store/slices/user.slice";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import { getUserApi } from "./api/authApi";
import Dashboard from "./components/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import SendMessage from "./components/Message";

function App() {
  const dispatch = useAppDispatch();
  const [userFetched, setUserFetched] = useState(false); // eslint-disable-line
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      dispatch(setLoading(true));
      try {
        const res = await getUserApi();
        if (res.success) {
          dispatch(setUser(res.data));
        }
      } finally {
        dispatch(setLoading(false));
        setUserFetched(true);
      }
    };

    if (!userFetched) {
      getUser();
    }
  }, [dispatch, userFetched]); // eslint-disable-line

  useEffect(() => {}, [user]); // eslint-disable-line

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route
            path="/dashboard"
            // element={user ? <Dashboard /> : <Navigate to="/" />}
            element={<Dashboard />}
          />
          <Route path="/user-client/:userId" element={<SendMessage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
