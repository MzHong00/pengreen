import { IoMdHeart } from "@react-icons/all-files/io/IoMdHeart";
import { IoMdHeartEmpty } from "@react-icons/all-files/io/IoMdHeartEmpty";

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
    <div className="flex items-center">
      {isUserLike ? (
        <IoMdHeart
          className="cursor-pointer"
          color="red"
          {...props}
        />
      ) : (
        <IoMdHeartEmpty
          className="cursor-pointer"
          {...props}
        />
      )}
      <span>{like}</span>
    </div>
  );
}
