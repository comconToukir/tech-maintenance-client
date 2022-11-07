import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Main from './../../Layout/Main';
import SignUp from './../../Pages/SignUp/SignUp';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Route>
  )
)

export default router;