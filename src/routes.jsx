import React, { useEffect } from "react";

import { useNavigate, useRoutes } from "react-router-dom";

//pages List
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ClientDashboard from "./components/dashboard/ClientDashboard";
import FreelancerDashboard from "./components/dashboard/FreelancerDashboard";
import ChatPage from "./components/dashboard/ChatPage";
import MyApplications from "./components/dashboard/MyApplications";
import MyGigs from "./components/dashboard/MyGigs";
import ApplicantsPage from "./components/dashboard/ApplicantsPage";
import Navbar from "./components/Navbar";

import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdfromStorage = localStorage.getItem("userId");
    if (userIdfromStorage && !currentUser) {
      setCurrentUser(userIdfromStorage);
    }

    if (
      !userIdfromStorage &&
      !["/auth", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/auth");
    }

    if (userIdfromStorage && window.location.pathname == "/auth") {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser]);

  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/client-dashboard",
      element: <ClientDashboard />,
    },
    {
      path: "/freelancer-dashboard",
      element: <FreelancerDashboard />,
    },
    {
        path:"/chat/:roomId",
        element:<ChatPage/>
    },
    {
        path:"/navbar",
        element:<Navbar/>
    },
    {
        path:"/freelancer/applications",
        element:<MyApplications/>
    },
    {
        path:"/client/gigs",
        element:<MyGigs/>
    },
    {
        path:"/client/gigs/:gigId/applicants",
        element:<ApplicantsPage/>
    },
  ]);
  return element;
};

export default ProjectRoutes;
