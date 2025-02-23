import { AccessLevel } from "../types/accessLevel";

export const mapActionToAccessLevel = (action: "add" | "update" | "delete"): AccessLevel => {
    const accessMap: Record<"add" | "update" | "delete", AccessLevel> = {
      add: AccessLevel.ADD,
      update: AccessLevel.UPDATE,
      delete: AccessLevel.DELETE,
    };
    return accessMap[action];
  };
  