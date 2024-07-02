import { useLocation } from "react-router-dom";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";

import { useNavSidebar } from "../model/sideBarItems";
import { Button } from "shared/ui/Button";

import styles from "./navbar.module.css";
import { SearchBox } from "widgets/SearchBox";
import { useModal } from "shared/hooks/useModal";

export function Navbar() {
  const location = useLocation();
  const navList = useNavSidebar();
  const { ref, isOpen, toggleModal } = useModal();

  return (
    <aside className={`${styles.navbarContainer}`}>
      {isOpen && <SearchBox ref={ref} />}
      <nav className={`${styles.navbar}`}>
        <Button className={`${styles.searchButton}`} onClick={toggleModal}>
          <FaSearch size={17} className={styles.buttonIcon} />
        </Button>

        <div className={`${styles.buttonContainer}`}>
          {navList.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.name}
                onClick={item.handler}
                className={`${styles.button} ${
                  location.pathname === item.path && "bg-white"
                }`}
              >
                <Icon color="black" className={styles.buttonIcon} />
              </Button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
