import { useLocation } from 'react-router-dom';
import { Button } from 'shared/ui';
import { useNavSidebar } from '../model/sidebar';
import { BsList } from "react-icons/bs";

import styles from './navbar.module.css';

export function Navbar() {
    const location = useLocation();
    const sideList = useNavSidebar();

    return (
        <aside className={`${styles.navbarContainer}`}>
            <nav className={`${styles.nav}`}>
                <div className={`${styles.menuIcon}`}>
                    <BsList />
                </div>
                <div className={`${styles.buttonContainer}`}>
                    {
                        sideList.map((path, idx) =>
                            <Button
                                key={idx}
                                componentImg={path.icon}
                                handler={path.handler}
                                btnStyles={styles.button}
                                contentStyles={`${styles.buttonContent} ${location.pathname === path.path && styles.activeButton}`} />)
                    }
                </div>
            </nav>
        </aside>
    )
}
