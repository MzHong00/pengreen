import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { MdHome } from "@react-icons/all-files/md/MdHome";

import { SearchBox } from "widgets/SearchBox";
import { Button } from "shared/ui/Button";
import { useModal } from "shared/hooks/useModal";

import styles from "./navbar.module.css";

export const ICON_COLOR = "black";

export function Navbar() {
  const location = useLocation();
  const { ref, isOpen, toggleModal } = useModal();

  return (
    <aside className={styles.navbarContainer}>
      {isOpen && <SearchBox ref={ref} />}

      <nav className={styles.navbar}>
        <Button className={styles.searchButton} onClick={toggleModal}>
          <FaSearch size={17} className={styles.buttonIcon} />
        </Button>

        <div className={styles.linkContainer}>
          <Link
            to="/"
            className={`${styles.link} ${
              location.pathname === "/" && "bg-white"
            }`}
          >
            <MdHome
              color={ICON_COLOR}
              size="20"
              className={styles.buttonIcon}
            />
          </Link>
        </div>
      </nav>
    </aside>
  );
}
