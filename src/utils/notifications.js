import * as Notifications from "expo-notifications";

export async function scheduleDailyNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Don't forget to study!",
      body: "Practice makes perfect.",
    },
    trigger: { hour: 20, minute: 0, repeats: true },
  });
}
