import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";

import { logoutActions } from "..";
import { Button } from "shared/ui/Button";

export const LogoutButton = () => {
  return (
    <Button onClick={logoutActions}>
      <IoLogOutOutline size={22} />
      로그아웃
    </Button>
  );
};
