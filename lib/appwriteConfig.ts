import { TAppwriteConfig } from "@/types/appwrite";

export const appwriteConfig: TAppwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_PLATFORM_IOS,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
  usersCollectionId: process.env.EXPO_PUBLIC_USERS_COLLECTION_ID,
  rocksCollectionId: process.env.EXPO_PUBLIC_ROCKS_COLLECTION_ID,
  pathsCollectionId: process.env.EXPO_PUBLIC_PATHS_COLLECTION_ID,
};
