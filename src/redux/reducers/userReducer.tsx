import {ActionType} from '../actions';
const InitialCalState = {
  isLoggedIn: false,
  verified: false,
  userData: {},
  fbArray: [],
  fcmtoken: '',
  checked: false,
  passwoord: '',
  notificationSymbol: false,
};

export default (state = InitialCalState, {type, payload}) => {
  switch (type) {
    case ActionType.USERLOGGED: {
      // console.log('hhhh', 'Why m i calling');
      return {
        ...state,
        isLoggedIn: true,
        userData: {...payload},
      };
    }
    case ActionType.FIREBASEARRAY: {
      return {
        ...state,
        fbArray: payload,
      };
    }
    case ActionType.VERIFY: {
      return {
        ...state,
        verified: true,
      };
    }
    case ActionType.LOGOUT: {
      return {
        ...state,
        isLoggedIn: payload,
      };
    }
    case ActionType.UPDATE: {
      return {
        ...state,
        userData: {...payload},
      };
    }
    case ActionType.FCM: {
      //console.log('avc', fcmtoken);
      return {
        ...state,
        fcmtoken: payload,
      };
    }
    case ActionType.SAVEPASSWORD: {
      return {
        ...state,
        passwoord: payload,
      };
    }
    case ActionType.REMEMBER: {
      return {
        ...state,
        checked: payload,
      };
    }
    case ActionType.NOTIFICATIONALERT: {
      // console.log("true,false",notificationSymbol);
      return {
        ...state,
        notificationSymbol: payload,
      };
    }
    default:
      return state;
  }
};
