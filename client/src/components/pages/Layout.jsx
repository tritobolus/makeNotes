// import React from 'react'
import axios from "axios";
import "../../index.css";
import { NavBar } from "../UI/NavBar";
import { Notes } from "../UI/Notes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { Footer } from "../UI/Footer";

export const Layout = () => {
  const { checkAuth, auth, getAvatars } = useAuth();
  const navigate = useNavigate();

  const [isProfile, setIsProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth === false) {
      navigate("/signin");
    }
  }, [auth]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await checkAuth();
      setLoading(false);
    };

    init()
    getAvatars();
  }, []);
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-black font-mono">
        {auth && (
          <div className=" h-screen  w-3xl    bg-black/20 sm:border border-green-400 border-dashed relative rounded-lg  ">
            <NavBar setIsProfile={setIsProfile} isProfile={isProfile} />
            <Notes isProfile={isProfile} setIsProfile={setIsProfile} />
            <Footer />
          </div>
        )}

        {loading && (
          <div>
            <p>Wait Server is waking up...</p>
          </div>
        )}
      </div>
    </>
  );
};
