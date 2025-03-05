import { AccessLevel } from "../constants/accessLevelEnum";
import { RequestAccessAction } from "../constants/requestAccessEnum";

export const mapActionToAccessLevel = (action: RequestAccessAction): AccessLevel => {
    const accessMap: Record<RequestAccessAction, AccessLevel> = {
      add: AccessLevel.ADD,
      update: AccessLevel.UPDATE,
      delete: AccessLevel.DELETE,
    };
    return accessMap[action];
  };
  