import { LuLogOut } from "react-icons/lu";

import { logoutActions } from "..";
import { Button } from "shared/ui/Button";

export const LogoutButton = () => {
  return (
    <Button onClick={logoutActions}>
      <LuLogOut size={22} />
      로그아웃
    </Button>
  );
};
