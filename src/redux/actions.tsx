//=======================================================Action Types Constants
const USER_AUTHORIZE = 'USER_SIGN_IN',
  USER_LOGOUT = 'USER_LOGOUT',
  FETCHING_LOADING = 'FETCHING_LOADING',
  FIREBASEARRAY = 'FIREBASEARRAY',
  REGISTER_FOR_LINKEDIN = 'REGISTER_FOR_LINKEDIN',
  USER_REFRESH = 'USER_REFRESH',
  CAL_ADD = 'CAL_ADD',
  CAL_SUB = 'CAL_SUB',
  CAL_APPEND = 'CAL_APPEND',
  CAL_DIFF = 'CAL_DIFF',
  CAL_CART = 'CAL_CART',
  CARTITEMUPDATE = 'CARTITEMUPDATE',
  PRODUCTINC = 'PRODUCTINC',
  PRODUCTDEC = 'PRODUCTDEC',
  USERLOGGED = 'USERLOGGED',
  SELECTEDUSER = 'SELECTEDUSER',
  USERDATA = 'USERDATA',
  LOGOUT = 'LOGOUT',
  ADDHORSE = 'ADDHORSE',
  UPDATE = 'UPDATE',
  FCM = 'FCM',
  VERIFY = 'VERIFY',
  SAVEPASSWORD = 'SAVEPASSWORD',
  REMEMBER = 'REMEMBER',
  NOTIFICATIONALERT = 'NOTIFICATIONALERT';
//========================================================Dispatchers
const userAuthorize = payload => async dispatch => {
  dispatch({type: USER_AUTHORIZE, payload});
  return '';
};
const userRefresh = payload => dispatch => {
  dispatch({type: USER_REFRESH, payload});
};
const userLKAuthorize = payload => dispatch => {
  dispatch({type: REGISTER_FOR_LINKEDIN, payload});
};
const logout = () => dispatch => {
  dispatch({type: USER_LOGOUT});
};
const setLoader = payload => dispatch => {
  dispatch({type: FETCHING_LOADING, payload});
};
const firebaseArray = payload => dispatch => {
  dispatch({type: FIREBASEARRAY, payload});
};
const add = () => dispatch => {
  dispatch({type: CAL_ADD});
};
const sub = () => dispatch => {
  dispatch({type: CAL_SUB});
};
const append = payload => dispatch => {
  dispatch({type: CAL_APPEND, payload});
};
const diff = payload => dispatch => {
  dispatch({type: CAL_DIFF, payload});
};
const cart = payload => dispatch => {
  dispatch({type: CAL_CART, payload});
};
const cartItemUpdate = payload => dispatch => {
  dispatch({type: CARTITEMUPDATE, payload});
};
const increament = payload => dispatch => {
  dispatch({type: PRODUCTINC, payload});
};
const decrement = payload => dispatch => {
  dispatch({type: PRODUCTDEC, payload});
};
const logged = payload => dispatch => {
  dispatch({type: USERLOGGED, payload});
};
const logoutuser = payload => dispatch => {
  dispatch({type: LOGOUT, payload});
};
const selecteduser = payload => dispatch => {
  dispatch({type: SELECTEDUSER, payload});
};
const addhorse = payload => dispatch => {
  // console.log('payload inside action', payload);
  dispatch({type: ADDHORSE, payload});
};
const userdata = payload => dispatch => {
  dispatch({type: USERDATA, payload});
};
const update = payload => dispatch => {
  dispatch({type: UPDATE, payload});
};
const verify = payload => dispatch => {
  dispatch({type: VERIFY, payload});
};
const fcm = payload => dispatch => dispatch({type: FCM, payload});
const savepassword = payload => dispatch => {
  dispatch({type: SAVEPASSWORD, payload});
};
const remember = payload => dispatch => {
  dispatch({type: REMEMBER, payload});
};
const notificationAlert = payload => dispatch => {
  dispatch({type: NOTIFICATIONALERT, payload});
};
//========================================================Exporter
const ActionType = {
  FETCHING_LOADING,
  USER_REFRESH,
  USER_LOGOUT,
  USER_AUTHORIZE,
  REGISTER_FOR_LINKEDIN,
  CAL_SUB,
  CAL_ADD,
  CAL_APPEND,
  CAL_DIFF,
  CAL_CART,
  CARTITEMUPDATE,
  FIREBASEARRAY,
  PRODUCTINC,
  PRODUCTDEC,
  USERLOGGED,
  LOGOUT,
  USERDATA,
  SELECTEDUSER,
  ADDHORSE,
  UPDATE,
  FCM,
  VERIFY,
  REMEMBER,
  SAVEPASSWORD,
  NOTIFICATIONALERT,
};
export {
  ActionType,
  userLKAuthorize,
  logout,
  setLoader,
  userAuthorize,
  userRefresh,
  add,
  sub,
  append,
  diff,
  cart,
  firebaseArray,
  verify,
  cartItemUpdate,
  increament,
  decrement,
  logged,
  logoutuser,
  userdata,
  selecteduser,
  addhorse,
  update,
  fcm,
  savepassword,
  remember,
  notificationAlert,
};
