import axios from 'axios';
import axiosWithAuth from './axiosWithAuth';

/**
 * @function: Logs you into the API endpoint and obtains a JWT for server authentication
 * @param {*} credentials: Pass in these credentials to authenticate: { username: 'Lambda School', password: 'i<3Lambd4' }
 * @returns: none
 */
const login = (credentials, props, destination) => {
  axios.post('/api/login', credentials)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      props.history.push(destination)
    })
    .catch(err => console.error(err.response))
}

// Protected endpoints requiring an authentication token
/**
 * @function: Send a GET request to /api/friends to obtain the list of friends in res.data
 * @param: none
 * @returns: none
 */
const getAllFriends = () => {
  axiosWithAuth().get('/api/friends')
    .then(res => {
      console.log(res)
      return res.data;
    })
    .catch(err => console.error(err.response));
}

/**
 * @function: Send a GET req to /api/friends/123 to get the friend with that id from the API
 * @param {*} id: The id of the friend to update
 * @returns {*} The friend with the id passed in the req url 
 */
const getFriend = (id) => {
  axiosWithAuth().get(`/api/friends/${id}`)
    .then(res => {
      console.log(res)
      return res.data;
    })
    .catch(err => console.error(err.response));
}

/**
 * @function: Send a POST req to /api/friends to create a friend in the API endpoint 
 *            Note: Pass the friend as the body of the request (the second argument passed to axios.post).
 * @param {*} friend 
 * @returns: The new list of friends
 */
const addFriend = (friend) => {
  axiosWithAuth().post('/api/friends', friend)
    .then(res => {
      console.log(res)
      return res.data;
    })
    .catch(err => console.error(err.response));
}

/**
 * @function: Send a PUT req to /api/friends/:id to update the friend using the id passed as part of the URL. 
 *            Note: The friend param should be an object with the updated information
 * @param {*} friend 
 * @returns: none (?)
 */
const updateFriend = (friend) => {
  axiosWithAuth().put(`/api/friends/:${friend.id}`, friend)
    .then(res => {
      console.log(res)
      return res.data;
    })
    .catch(err => console.error(err.response));
}

/**
 * @function: Send a DELETE req to /api/friends/${id} to remove the friend with that id from the endpoint
 * @param {*} id 
 * @returns: none (?)
 */
const deleteFriend = (id) => {
  axiosWithAuth().delete(`/api/friends/${id}`)
    .then(res => {
      console.log(res)
      return res.data;
    })
    .catch(err => console.error(err.response));
}
