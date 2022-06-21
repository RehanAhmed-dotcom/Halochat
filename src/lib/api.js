import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://halochats.com/app/api',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});
// const axioss = Axios.create({
//   baseURL: 'https://intechsol-developer.co/blackdads/api',
//   headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
// });
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};
const edit = (payload, data) => {
  const request = `/edit`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('errrrr', e);
    });
};
const Halologin = payload => {
  const request = `/login`;
  console.log('payload', payload);
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('err', e);
    });
};
const HaloVerify = payload => {
  const request = `/sms-confirm-code`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('err', err);
    });
};
const editImage = (payload, data) => {
  const request = `/upload-image`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('errrrr', e);
    });
};

const getUserContacts = (payload, data) => {
  // console.log('res check', JSON.stringify(data));
  // console.log('payload', data);
  const request = `/get-user-contact`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in user contacts', e.response);
    });
};
const getdata = (payload, data) => {
  // console.log('res check', JSON.stringify(data));
  console.log('payload', data);
  const request = `/get_data`;
  return axios
    .get(request, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in get_data', e.response);
    });
};
// const logs = payload => {
//   const request = `/login`;
//   return axioss
//     .post(request, payload, {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then(({data, status}) => {
//       return status === 200 || status === 201 ? data : null;
//     })
//     .catch(e => {
//       console.log('err', e);
//     });
// };
const login = payload => {
  const request = `/login`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch login', e);
    });
};
const checkName = payload => {
  const request = `/checkname`;
  console.log('payload', payload);
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch checkname', e);
    });
};
const register = payload => {
  const request = `/register`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in register', e);
    });
};
const enterEmail = payload => {
  const request = `/forget-password`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in forgot email', e);
    });
};
const otp = payload => {
  const request = `/otp-verify`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in otp', e);
    });
};
const newPassword = payload => {
  const request = `/reset-password`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in new password', e);
    });
};
const editProfile = (payload, data1) => {
  // console.log('res check', JSON.stringify(data1));
  const request = `/profile/edit`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in edit profile ', e);
    });
};
const changePassword = payload => {
  const request = `/password-change`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in change password', e);
    });
};
const addPost = (payload, data) => {
  console.log('data of payload', JSON.stringify(data));
  const request = `/posts`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in add post', e);
    });
};
const getCurrencyExchangeRates = () => {
  const request = `https://freecurrencyapi.net/api/v2/latest?apikey=a6baae60-726e-11ec-b4e1-dd0810336ebf`;
  return Axios.get(request)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('error in cities', e);
    });
};
const showPosts = payload => {
  const request = `/showPosts`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in showPosts', e);
    });
};
const postLike = payload => {
  console.log('payload', payload);
  const request = `/post/like`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in like post', e);
    });
};
const callToken = payload => {
  console.log('payload', payload);
  const request = `/get-agora-token`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in call token', e);
    });
};
const showComments = payload => {
  const request = `/comment/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in show comments', e);
    });
};
const doComment = payload => {
  const request = `/comment`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in do comment', e);
    });
};
const tagUser = payload => {
  console.log('payload of tag', payload);
  const request = `/tag`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in tag user', e);
    });
};
const searchUser = payload => {
  const request = `/searchData/${payload.search}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in seacrh user', e);
    });
};
const fcmUpdateChat = payload => {
  const request = `/get-fcm/${payload.number}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in fcm token', e);
    });
};
const deletePost = payload => {
  const request = `/PostDelete/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in seacrh user', e);
    });
};
const deleteComment = payload => {
  const request = `/CommentDelete/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in seacrh user', e);
    });
};
const listofUser = payload => {
  console.log('payload', payload);
  const request = `/user-list`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list of users', e);
    });
};
const reportPost = payload => {
  const request = `/Report`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Report', e);
    });
};
const userProfile = payload => {
  const request = `/profile/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in user Profile', e);
    });
};
const followUser = payload => {
  const request = `/user`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in followUser', e);
    });
};
const postDetails = payload => {
  const request = `/postDetails/${payload.post_id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in post details', e);
    });
};
const notificationList = payload => {
  const request = `/notification-list`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in notification list', e);
    });
};
const changeNotificationstatus = payload => {
  const request = `/notification-status`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in change status', e);
    });
};

// const updateToken = payload => {
//   const request = `/save-token`;
//   console.log('payload', payload);
//   authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
//   return axios
//     .post(request, payload, {headers: authorizedHeaders})
//     .then(({data, status}) => {
//       return status === 200 || status === 201 ? data : null;
//     })
//     .catch(e => {
//       console.log('in update token');
//     });
// };
const ShowCasePost = payload => {
  console.log('Sho case payload taking api');
  const request = `/showcase`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('In get ShowCase Profiles List error');
    });
};
const FollowersList = payload => {
  const request = `/follower/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in post details', e);
    });
};
const updateToken = payload => {
  const request = `/update-fcm`;
  // console.log('paylaod', payload);
  // const {Auth, ...rest} = payload;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      console.log('data', data);
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in updateToken', e);
    });
};
const FollowingList = payload => {
  console.log('payload of folowing ', payload);
  const request = `/following/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in post details', e);
    });
};
const TopTravaller = payload => {
  const request = `/TopTravaller`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Top Travlers', e);
    });
};

const LocationPosts = payload => {
  // console.log('payload of Location Posts Api ', payload);
  const request = `/postsofuserlocation`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in post details', e);
    });
};
const Searching = payload => {
  const request = `/searchData`;

  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  console.log('payload of Location Posts Api ', payload);

  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in update token');
    });
};
const Suggestions = payload => {
  const request = `/searchSugestion`;

  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  console.log('payload of Location Posts Api ', payload);

  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in update token');
    });
};
const checkBadge = payload => {
  const request = `/checkbadge/${payload.id}`;

  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  // console.log('payload of Location Posts Api ', payload);

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in check badge', e);
    });
};
const blockUser = payload => {
  const request = `/block`;

  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  console.log('payload of Location Posts Api ', payload);

  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in block user');
    });
};
const deleteProfile = payload => {
  const request = `/SelfDelete`;

  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  console.log('payload of Location Posts Api ', payload);

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in delete user');
    });
};

export {
  login,
  register,
  enterEmail,
  newPassword,
  otp,
  editProfile,
  changePassword,
  addPost,
  showPosts,
  callToken,
  postLike,
  getCurrencyExchangeRates,
  showComments,
  doComment,
  searchUser,
  blockUser,
  userProfile,
  followUser,
  deleteProfile,
  postDetails,
  notificationList,
  changeNotificationstatus,
  updateToken,
  ShowCasePost,
  FollowersList,
  FollowingList,
  LocationPosts,
  // logs,
  Searching,
  Suggestions,
  editImage,
  reportPost,
  deleteComment,
  deletePost,
  TopTravaller,
  getUserContacts,
  checkName,
  checkBadge,
  listofUser,
  tagUser,
  fcmUpdateChat,
  Halologin,
  edit,
  HaloVerify,
  getdata,
};
