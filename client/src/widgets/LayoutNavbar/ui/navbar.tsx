import { useLocation } from "react-router-dom";
import { BsList } from "react-icons/bs";

import { useNavSidebar } from "../model/sideBarItems";
import { Button } from "shared/ui/Button";

import styles from "./navbar.module.css";

export function Navbar() {
  const location = useLocation();
  const navList = useNavSidebar();

  return (
    <aside className={`${styles.navbarContainer}`}>
      <nav className={`${styles.navbar}`}>
        <div className={`${styles.menuIcon}`}>
          <BsList />
        </div>
        <div className={`${styles.buttonContainer}`}>
          {navList.map((item, idx) => {
            const Icon = item.icon;

            return (
                <Button
                  key={idx}
                  onClick={item.handler}
                  className={`${styles.button} ${
                    location.pathname === item.path && styles.activeButton
                  }`}
                >
                  <Icon/>
                </Button>
              )
          })}
        </div>
      </nav>
    </aside>
  );
}
