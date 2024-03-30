import { useLocation } from 'react-router-dom';

import { Button } from 'shared/ui';

import { useNavSidebar } from '../model/sidebar';
import { Logo } from 'widgets/LayoutHeader';

export function Navbar() {
    const location = useLocation();
    const sideList = useNavSidebar();

    return (
        <aside className={`w-full flex justify-center absolute left-0 bottom-10 duration-500`}>
            <nav className='p-1 flex border bg-[#E3E1D9] rounded-lg gap-3'>
                <div className='px-2 bg-[#7b7b7b] rounded-lg'>
                    <Logo />
                </div>
                <div className='bg-[#F2EFE5] rounded-lg'>
                    {
                        sideList.map((path, idx) =>
                            <Button
                                key={idx}
                                componentImg={path.icon}
                                handler={path.handler}
                                btnStyles="w-10 h-10 "
                                contentStyles={`h-10 text-gray-400 hover:text-gray-700 gap-2 ${location.pathname === path.path && '!text-gray-700'}`} />)
                    }
                </div>
            </nav>
        </aside>
    )
}