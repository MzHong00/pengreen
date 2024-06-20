import { LuLogOut } from "react-icons/lu";

import { fetchLogout } from "entities/login/api/logout";
import { Button } from "shared/ui/Button";

export const LogoutButton = () => {
  return (
    <Button onClick={fetchLogout}>
      <LuLogOut size={22} />
      로그아웃
    </Button>
  );
};
