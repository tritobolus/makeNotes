import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [customeAvatars, setCustomeAvatars] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;

  const getProfileImage = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/profile/getProfile`, {
        params: {
          username: username,
        },
      });
      setImageUrl(res.data.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const getAvatars = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/avatar/get`);
      setAvatars(res.data.avatars);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomeAvatars = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/customeAvatar/get`, {
        params: {
          username: username,
        },
      });
      setCustomeAvatars(res.data.avatars);
    } catch (error) {
      consoel.log(error);
    }
  };

  const getNotes = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/note/get`, {
        params: {
          userId: userId,
        },
      });
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/authentication/verify`, {
        withCredentials: true,
      });
      if (res.data.message === "Success") {
        setAuth(true);
        setUserId(res.data.userId);
        setEmail(res.data.email);
        setUsername(res.data.username);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.log(error);
      setAuth(false);
      // setMessage(error.response?.data?.Error || "Authentication failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        userId,
        email,
        notes,
        username,
        imageUrl,
        checkAuth,
        getNotes,
        getAvatars,
        avatars,
        BACKEND_URL,
        searchQuery,
        setSearchQuery,
        getProfileImage,
        getCustomeAvatars,
        customeAvatars
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
export const useAuth = () => useContext(AuthContext);
