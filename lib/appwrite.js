import { Client, Databases, Account } from "react-native-appwrite";
import { Platform } from "react-native";
const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  database: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  flatsCollection: process.env.EXPO_PUBLIC_APPWRITE_FLATS_COLLECTION_ID,
  expensesCollection: process.env.EXPO_PUBLIC_APPWRITE_EXPENSES_COLLECTION_ID,
  maintenanceCollection:
    process.env.EXPO_PUBLIC_APPWRITE_MAINTENANCE_COLLECTION_ID,
  usersCollection: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  expenseSlipsCollection:
    process.env.EXPO_PUBLIC_APPWRITE_EXPENSESLIPS_COLLECTION_ID,
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.project);
switch (Platform.OS) {
  case "ios":
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_IOS);
    break;
  case "android":
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_ANDROID);
    break;
  default:
    break;
}

const database = new Databases(client);
const account = new Account(client);

export { database, account, config, client };
