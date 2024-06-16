import { useNavigate } from "react-router-dom";

import { MdHome } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export const useNavSidebar = () => {
  const navigate = useNavigate();

  return [
    {
      name: "Home",
      path: "/",
      icon: () => <MdHome size="20" />,
      handler: () => {
        navigate("/");
      },
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: () => <MdOutlineSpaceDashboard size="20" />,
      handler: () => {
        navigate("/dashboard");
      },
    },
  ];
};
