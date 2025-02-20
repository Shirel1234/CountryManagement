export interface IRequestAccess {
  _id: string;
  userId: { username: string } | null;
  action: "add" | "update" | "delete";
  status: "pending" | "approved" | "denied";
  createdAt: Date;
  updatedAt: Date;
}
