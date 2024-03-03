import { useSelector } from "react-redux";
import * as ROLES from "../constants/roleSlugs";

export default function useUserRole() {
  const user = useSelector((state) => state.auth?.data?.user);

  return {
    user,
  };
}
