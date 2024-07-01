import { SVGAttributes } from "react";
import { useNavigate } from "react-router-dom";

import { MdHome } from "@react-icons/all-files/md/MdHome";
import { FaUser } from "@react-icons/all-files/fa/FaUser";

export const useNavSidebar = () => {
  const navigate = useNavigate();

  return [
    {
      name: "Home",
      path: "/",
      icon: (props: SVGAttributes<SVGElement>) => (
        <MdHome {...props} size="20" />
      ),
      handler: () => {
        navigate("/");
      },
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (props: SVGAttributes<SVGElement>) => (
        <FaUser {...props} size="15" />
      ),
      handler: () => {
        navigate("/dashboard");
      },
    },
  ];
};
