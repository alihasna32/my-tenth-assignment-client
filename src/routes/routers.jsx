import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import AddAJobs from "../pages/AddAJobs";
import AllJobs from "../pages/AllJobs";
import JobDetails from "./../components/jobDetails";
import Update from "../components/Update";
import MyAcceptedTasks from "../pages/MyAcceptedTasks";
import HomePage from "../pages/HomePage";
import error404 from "../assets/error-404.png";
import MyAddedJobs from "../pages/MyAddedJobs";
import PrivateRoutes from "../context/PrivateRoutes";
import AboutSection from "../components/AboutSection";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/",
        element: <HomePage></HomePage>
      },
      {
        path: "/addJob",
        element: <PrivateRoutes>
          <AddAJobs></AddAJobs>
        </PrivateRoutes>,
      },
      {
        path: "/allJobs",
        element: <AllJobs></AllJobs>
      },
      {
        path: "/jobDetails/:id",
        element: <PrivateRoutes>
          <JobDetails></JobDetails>
        </PrivateRoutes>,
      },
      {
        path: "/updateJob/:id",
        element: <PrivateRoutes>
          <Update></Update>
        </PrivateRoutes>,
      },
      {
        path: "/myAcceptedTasks",
        element: <PrivateRoutes>
          <MyAcceptedTasks></MyAcceptedTasks>
        </PrivateRoutes>,
      },
      {
        path: "/myAddedJobs",
        element: <PrivateRoutes>
          <MyAddedJobs></MyAddedJobs>
        </PrivateRoutes>,
      },
      {
        path: "/about",
        element: <AboutSection></AboutSection>
      },
      {
        path: "/*",
        element: (
          <div className="flex flex-col justify-center items-center min-h-screen gap-5">
            <img className="w-[400px]" src={error404} alt="404 Not Found" />
            <h1 className="text-6xl font-black">Page not found</h1>
          </div>
        ),
      }
    ],
  },
]);

export default router;
