import axios from "axios";
import { axiosWithAuth } from "./axiosWithAuth";

/**
 * @function: Sends a post to log you in and obtain an authentication token for the endpoint
 * @param {*} credentials: The credentials used to authenticate
 * @returns {Promise} promise: The API promise to be resolved in useEffect or componentDidMount
 */
export const login = (credentials, history) => {
  return axios.post("http://localhost:5000/api/login", credentials)
    .then(res => {
      localStorage.setItem("token", res.data.payload);
      history.push('/friends');
      return res;
    })
    .catch(err => console.log("Error in actions>login:", err.response));
};

/**
 * @function: Remove the authentication token on logout
 * @param: none
 * @returns: none
 */
export const logout = (history) => {
  localStorage.removeItem('token')
}

// Protected endpoints requiring an authentication token
/**
 * @function: Send a GET request to /api/friends to obtain the list of friends in res.data
 * @param: none
 * @returns: none
 */
export const getAllFriends = () => {
  axiosWithAuth()
    .get("/api/friends")
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => console.error(err.response));
};

/**
 * @function: Send a GET req to /api/friends/123 to get the friend with that id from the API
 * @param {*} id: The id of the friend to update
 * @returns {*} The friend with the id passed in the req url
 */
export const getFriend = id => {
  axiosWithAuth()
    .get(`/api/friends/${id}`)
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => console.error(err.response));
};

/**
 * @function: Send a POST req to /api/friends to create a friend in the API endpoint
 *            Note: Pass the friend as the body of the request (the second argument passed to axios.post).
 * @param {*} friend
 * @returns: The new list of friends
 */
export const addFriend = friend => {
  axiosWithAuth()
    .post("/api/friends", friend)
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => console.error(err.response));
};

/**
 * @function: Send a PUT req to /api/friends/:id to update the friend using the id passed as part of the URL.
 *            Note: The friend param should be an object with the updated information
 * @param {*} friend
 * @returns: none (?)
 */
export const updateFriend = friend => {
  axiosWithAuth()
    .put(`/api/friends/:${friend.id}`, friend)
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => console.error(err.response));
};

/**
 * @function: Send a DELETE req to /api/friends/${id} to remove the friend with that id from the endpoint
 * @param {*} id
 * @returns: none (?)
 */
export const deleteFriend = id => {
  axiosWithAuth()
    .delete(`/api/friends/${id}`)
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => console.error(err.response));
};
