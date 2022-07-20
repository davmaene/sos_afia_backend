import { Expo } from 'expo-server-sdk';

export const uniCastNofication = async ({ title, subtitle, body, token }) => {

};

export const broadCastNotification = async ({ tokens, title, subtitle, body, data, cs }, cb) => {
    // cs : can be 1: chat | 2: information 
    let messages = [];
    let expo = new Expo();//{ accessToken: process.env.EXPO_ACCESS_TOKEN }
    for (let pushToken of tokens) {

        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
          continue;
        }
      
        messages.push({
          to: pushToken,
          sound: 'default',
          body,
          title,
          subtitle,
          data: {
            cs, 
            response: data 
          }
        })
      }
      
      let chunks = expo.chunkPushNotifications(messages);
      let tickets = [];

      (async () => {
        for (let chunk of chunks) {
          try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
          } catch (error) {
            console.error(error);
          }
        }
      })();
};
