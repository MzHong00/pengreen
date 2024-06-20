import { LuUser2 } from "react-icons/lu";

import { Button } from "shared/ui/Button";

export function ModifyProfilesButton() {
  return (
    <Button>
      <LuUser2 size={22} />
      프로필 수정
    </Button>
  );
}
