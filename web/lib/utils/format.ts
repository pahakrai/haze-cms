export const formatUserName = (user?: IUser) => {
  const first = user?.firstName || "";
  const last = user?.lastName || "";

  return first && last ? `${first} ${last}` : first || last;
};
