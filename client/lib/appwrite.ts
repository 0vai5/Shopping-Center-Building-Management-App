import { Client, Account, Databases, ID } from "react-native-appwrite";

const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionID: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  expenseCollectionID: process.env.EXPO_PUBLIC_APPWRITE_EXPENSE_COLLECTION_ID,
  expenseSlipCollectionID:
    process.env.EXPO_PUBLIC_APPWRITE_EXPENSESLIP_COLLECTION_ID,
  androidPlatformID: process.env.EXPO_PUBLIC_APPWRITE_ANDROID_PLATFORM_ID,
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.project!)
  .setPlatform(appwriteConfig.androidPlatformID!);

const account = new Account(client);
const databases = new Databases(client);

export {
  client,
  account,
  databases,
  ID,
  appwriteConfig as config,
};
