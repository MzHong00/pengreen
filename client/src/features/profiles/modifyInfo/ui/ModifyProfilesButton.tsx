import { FaUser } from "@react-icons/all-files/fa/FaUser";

import { Button } from "shared/ui/Button";

export function ModifyProfilesButton() {
  return (
    <Button>
      <FaUser size={22} />
      프로필 수정
    </Button>
  );
}
