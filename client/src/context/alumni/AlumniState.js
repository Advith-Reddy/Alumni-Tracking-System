import React, { useReducer } from "react";
import axios from "axios";
import AlumniContext from "./alumniContext";
import alumniReducer from "./alumniReducer";
import {
  UPDATE_PROFILE,
  GET_ALUMNI,
  GET_USERS,
  ALUMNI_ERROR,
  GET_PROFILE,
  GET_COLLEGES,
  COLLEGE_ERROR,
  AUTHENTICATE,
  GET_MY_PROFILE,
  FILTER_COLLEGES,
  FILTER_ALUMNI,
  CLEAR_COL_FILTER,
  CLEAR_AL_FILTER,
  SET_CURRENT_COLLEGE,
  SET_CURRENT_ALUMNUS,
  LOAD_NOTIFICATIONS,
} from "../types";

const AlumniState = (props) => {
  const initialState = {
    user: null,
    users: [],
    alumni: [],
    colleges: [],
    currentCollegeId: null,
    currentAlumnusId: null,
    filteredColleges: null,
    filteredAlumni: null,
    error: null,
    notification: {
      friends: [],
      accept: [],
      request: [],
    },
  };

  const [state, dispatch] = useReducer(alumniReducer, initialState);

  // Get any user profile:
  const getProfile = async (id) => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (err) {
      dispatch({
        type: ALUMNI_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get any authenticated user profile:
  const getAuthUsers = async () => {
    try {
      const res = await axios.get(`/api/users/auth/`);
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (err) {
      dispatch({
        type: ALUMNI_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get Own Profile:
  const getMyProfile = async () => {
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: GET_MY_PROFILE, payload: res.data });
    } catch (err) {
      dispatch({
        type: ALUMNI_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Set Current College ID:
  const setCurrentCollegeId = (id) => {
    dispatch({
      type: SET_CURRENT_COLLEGE,
      payload: id,
    });
  };

  // Set Current Alumnus:
  const setCurrentAlumnusId = (id) => {
    dispatch({
      type: SET_CURRENT_ALUMNUS,
      payload: id,
    });
  };

  // Send Email
  const sendEmail = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put("/api/dir", formData, config);
    } catch (error) {
      console.log("email sending error :" + error);
    }
  };

  // Send Sms
  const sendSms = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put("/api/dir/1", formData, config);
    } catch (error) {
      console.log("SMS sending error :" + error);
    }
  };

  // Get Alumni:
  const getAlumni = async (id) => {
    try {
      const res = await axios.get(`/api/college/${id}`);
      dispatch({ type: GET_ALUMNI, payload: res.data });
    } catch (err) {
      dispatch({
        type: ALUMNI_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get list of registered people for a college
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/college");
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (err) {
      dispatch({
        type: ALUMNI_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get Colleges:
  const getColleges = async () => {
    try {
      const res = await axios.get("/api/dir");
      dispatch({ type: GET_COLLEGES, payload: res.data });
    } catch (err) {
      dispatch({
        type: COLLEGE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update alumni profile:
  const updateProfile = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/users`, formData, config);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: COLLEGE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Authenticate a user:
  const authenticateUser = async (user) => {
    try {
      const res = await axios.put(`/api/college/${user._id}`);
      dispatch({
        type: AUTHENTICATE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: COLLEGE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Filter Colleges:
  const filterColleges = (text) => {
    dispatch({
      type: FILTER_COLLEGES,
      payload: text,
    });
  };

  // Filter Alumni:
  const filterAlumni = (text) => {
    dispatch({
      type: FILTER_ALUMNI,
      payload: text,
    });
  };

  // Clear College Filter:
  const clearColFilter = () => {
    dispatch({
      type: CLEAR_COL_FILTER,
    });
  };

  // Clear Alumni Filter:
  const clearAlFilter = () => {
    dispatch({
      type: CLEAR_AL_FILTER,
    });
  };

  //get firends,request,to accept list
  const getNotifications = async (id) => {
    try {
      const res = await axios.get(`/api/notf/${id}`);

      dispatch({
        type: LOAD_NOTIFICATIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ALUMNI_ERROR,
        payload: err.response,
      });
    }
  };

  //send or accept request
  const sendRequest = async (form) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put("/api/notf/req", form, config);
      dispatch({
        type: LOAD_NOTIFICATIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ALUMNI_ERROR,
        payload: err.response,
      });
    }
  };

  return (
    <AlumniContext.Provider
      value={{
        user: state.user,
        users: state.users,
        alumni: state.alumni,
        colleges: state.colleges,
        filteredColleges: state.filteredColleges,
        filteredAlumni: state.filteredAlumni,
        error: state.error,
        notification: state.notification,
        getProfile,
        getMyProfile,
        getUsers,
        getAlumni,
        getColleges,
        updateProfile,
        authenticateUser,
        filterColleges,
        filterAlumni,
        clearAlFilter,
        clearColFilter,
        setCurrentAlumnusId,
        setCurrentCollegeId,
        sendEmail,
        sendSms,
        getAuthUsers,
        getNotifications,
        sendRequest,
      }}
    >
      {props.children}
    </AlumniContext.Provider>
  );
};

export default AlumniState;
