import { User } from "../lib/models/userModel";
import { IUser } from "../types/user";
import logger from "../utils/logger";
import { LOGGER_MESSAGES_USER } from "../constants";

export const fetchUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_USER.ERROR_FETCH_USERS);
    throw error;
  }
};
export const fetchUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      logger.warn(LOGGER_MESSAGES_USER.USER_NOT_FOUND_BY_ID(id));
      return null;
    }
    return user;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_USER.ERROR_FETCH_USER_BY_ID, error);
    throw error;
  }
};
export const saveUser = async (data: IUser) => {
  try {
    const newUser = new User(data);
    await newUser.save();
    logger.info(LOGGER_MESSAGES_USER.SUCCESS_ADD_USER);
    return newUser;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_USER.ERROR_SAVE_USER, error);
    throw error;
  }
};
export const modifyUser = async (id: string, updatedData: Partial<IUser>) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      logger.warn(LOGGER_MESSAGES_USER.USER_NOT_FOUND_BY_ID(id));
      throw new Error(LOGGER_MESSAGES_USER.USER_NOT_FOUND_BY_ID(id));
    }
    logger.info(LOGGER_MESSAGES_USER.SUCCESS_UPDATE_USER);
    return updatedUser;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_USER.ERROR_UPDATE_USER, error);
    throw error;
  }
};
export const removeUser = async (id: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      logger.warn(LOGGER_MESSAGES_USER.USER_NOT_FOUND_BY_ID(id));
      throw new Error(LOGGER_MESSAGES_USER.USER_NOT_FOUND_BY_ID(id));
    }
    logger.info(LOGGER_MESSAGES_USER.SUCCESS_DELETE_USER);
    return deletedUser;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_USER.ERROR_DELETE_USER, error);
    throw error;
  }
};
