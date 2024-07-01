import { useLocation } from "react-router-dom";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";

import { useNavSidebar } from "../model/sideBarItems";
import { Button } from "shared/ui/Button";

import styles from "./navbar.module.css";

export function Navbar() {
  const location = useLocation();
  const navList = useNavSidebar();

  return (
    <aside className={`${styles.navbarContainer}`}>
      <nav className={`${styles.navbar}`}>
        <Button className={`${styles.searchButton}`}>
          <FaSearch size={18} className={styles.buttonIcon}/>
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
