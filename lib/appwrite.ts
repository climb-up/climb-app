import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Models,
  Storage,
} from "react-native-appwrite";

import { appwriteConfig } from "./appwriteConfig";
import { TRocks } from "@/types/rocksData";

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  usersCollectionId,
  rocksCollectionId,
  pathsCollectionId,
} = appwriteConfig;

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "An unexpected error occured");
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<Models.Session> => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error((error as Error).message || "An unexpected error occured");
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error((error as Error).message || "An unexpected error occured");
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error("No current account");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length) throw Error("No current user found");

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllRocks = async () => {
  try {
    const rocks = await databases.listDocuments(databaseId, rocksCollectionId);

    if (!rocks) {
      throw Error;
    }
    return rocks;
  } catch (error) {
    console.log(error);
  }
};

export const getRock = async (rockId: string) => {
  try {
    const rock = await databases.getDocument(
      databaseId,
      rocksCollectionId,
      rockId
    );

    if (!rock) throw Error("No rock found");

    const rockData: TRocks = {
      id: rock.$id,
      name: rock.name,
      thumbnail: rock.thumbnail,
      location: rock.location,
      region: rock.region,
      paths: rock.paths,
      longitude: rock.longitude,
      latitude: rock.latitude,
    };

    return rockData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
