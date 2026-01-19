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

  const getProfileImage = async () => {
    try {
      const res = await axios.get("http://localhost:8000/profile/getProfile", {
        params: {
          userId: userId,
        },
      });
      // console.log(res);
      setImageUrl(res.data.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const getNotes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/note/get", {
        params: {
          userId: userId,
        },
      });
      // console.log(res);
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/authentication/verify",
        {
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.message === "Success") {
        setAuth(true);
        setUserId(res.data.userId);
        setEmail(res.data.email);
        setUsername(res.data.username);
      } else {
        setAuth(false);
      }
      // console.log(res)
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
        searchQuery,
        setSearchQuery,
        getProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
export const useAuth = () => useContext(AuthContext);
