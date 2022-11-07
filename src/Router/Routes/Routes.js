import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Home from "../../Pages/Home/Home/Home";
import Main from './../../Layout/Main';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route path="/" element={<Home />} />
    </Route>
  )
)

export default router;