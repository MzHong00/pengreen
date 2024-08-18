import { IoMdHeart } from "@react-icons/all-files/io/IoMdHeart";
import { IoMdHeartEmpty } from "@react-icons/all-files/io/IoMdHeartEmpty";

import { Button } from "shared/ui/Button";
import { IconBox } from "shared/ui/IconBox";

const HEART_SIZE = 20;

interface Props extends React.HTMLAttributes<SVGElement> {
  isUserLike?: boolean;
  like?: number;
}

export function UpdateLike({
  like = 0,
  isUserLike = false,
  ...props
}: Partial<Props>) {
  return (
    <Button>
      <IconBox count={like}>
        {isUserLike ? (
          <IoMdHeart
            className="cursor-pointer"
            color="red"
            size={HEART_SIZE}
            {...props}
          />
        ) : (
          <IoMdHeartEmpty
            className="cursor-pointer"
            {...props}
            size={HEART_SIZE}
          />
        )}
      </IconBox>
    </Button>
  );
}
