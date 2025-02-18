export interface IRequestAccess {
    _id: string,
    userId: string;
    action: "add" | "update" | "delete";
    status: "pending" | "approved" | "denied";
    createdAt: Date;
  }