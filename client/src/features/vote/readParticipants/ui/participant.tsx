import { FaUser } from "@react-icons/all-files/fa/FaUser";

import { IconBox } from "shared/ui/IconBox";

const PARTICIPANT_ICON_SIZE = 16;

interface Props {
  participant?: number;
}

export const Participant = ({ participant = 0 }: Props) => {
  return (
    <IconBox count={participant}>
        <FaUser size={PARTICIPANT_ICON_SIZE} />
    </IconBox>
  );
};
