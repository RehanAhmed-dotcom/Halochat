import database from '@react-native-firebase/database';

export const senderMsg = async (
  msgValue,
  currentUserId,
  guestUserId,
  date,
  key,
) => {
  // console.log(
  //   'inside sender function',
  //   msgValue,
  //   currentUserId,
  //   guestUserId,
  //   date,
  // );
  try {
    return await database()
      .ref('messeges/' + currentUserId)
      .child(guestUserId)
      .child(key)
      .set({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          delete: false,
          date,
        },
      });
  } catch (error) {
    console.log('error in send message', error);
    return error;
  }
};

export const recieverMsg = async (
  msgValue,
  currentUserId,
  guestUserId,
  date,
  key,
) => {
  // console.log(
  //   'inside sender function',
  //   msgValue,
  //   currentUserId,
  //   guestUserId,
  //   date,
  // );
  try {
    return await database()
      .ref('messeges/' + guestUserId)
      .child(currentUserId)
      .child(key)
      .set({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          delete: false,
          msg: msgValue,
          date,
        },
      });
  } catch (error) {
    console.log('error in reciving message ', error);
    return error;
  }
};
