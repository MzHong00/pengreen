import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { MdHome } from "@react-icons/all-files/md/MdHome";
import { FaUser } from "@react-icons/all-files/fa/FaUser";

import { ICON_COLOR, NAV_PATH } from "../consts/navMenu";
import { SearchBox } from "widgets/SearchBox";
import { Button } from "shared/ui/Button";
import { useModal } from "shared/hooks/useModal";

import styles from "./navbar.module.css";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ref, isOpen, toggleModal } = useModal();

  return (
    <aside className={`${styles.navbarContainer}`}>
      {isOpen && <SearchBox ref={ref} />}
      <nav className={`${styles.navbar}`}>
        <Button className={`${styles.searchButton}`} onClick={toggleModal}>
          <FaSearch size={17} className={styles.buttonIcon} />
        </Button>

        <div className={`${styles.linkContainer}`}>
          <Button
            onClick={() => {
              navigate(NAV_PATH[0]);
            }}
            className={`${styles.link} ${
              location.pathname === NAV_PATH[0] && "bg-white"
            }`}
          >
            <MdHome
              color={ICON_COLOR}
              size="20"
              className={styles.buttonIcon}
            />
          </Button>
          <Button
            onClick={() => {
              navigate(NAV_PATH[1]);
            }}
            className={`${styles.link} ${
              location.pathname === NAV_PATH[1] && "bg-white"
            }`}
          >
            <FaUser
              color={ICON_COLOR}
              size="15"
              className={styles.buttonIcon}
            />
          </Button>
        </div>
      </nav>
    </aside>
  );
}
