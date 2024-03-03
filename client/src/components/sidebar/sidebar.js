import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MdHome } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuArrowBigLeftDash } from "react-icons/lu";
import { LuArrowBigRightDash } from "react-icons/lu";

import ListButton from "../common/ListButton";
import Plogo from '../common/Plogo';
import Button from '../common/button';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [sideToggle, setSideToggle] = useState(true);
    const leftArrow = () => <LuArrowBigLeftDash color='white' />
    const rightArrow = () => <LuArrowBigRightDash color='white' />

    const sideToggleHandler = () => {
        setSideToggle(sideToggle ? false : true);
    }
    
    const sideList = useMemo(() => {
        return (
            [
                {
                    name: "Home",
                    path: '/',
                    icon: () => <MdHome size="20" />,
                    handler: () => {
                        navigate('/')
                    }
                },
                {
                    name: "Dashboard",
                    path: '/dashboard',
                    icon: () => <MdOutlineSpaceDashboard size="20" />,
                    handler: () => {
                        navigate('/dashboard')
                    }
                },
            ]
        )
    }, [navigate]);

    return (
        <aside className={`relative flex flex-col w-40 h-full left-0 top-0 bg-white duration-500 ${!sideToggle && '!w-14'}`}>
            <div className='w-full h-12 pl-5 overflow-hidden'>
                {sideToggle && <Plogo />}
            </div>
            <nav className='min-w-14 h-full overflow-hidden'>
                {
                    sideList.map((path, idx) =>
                        <ListButton
                            key={idx}
                            name={sideToggle && path.name }
                            componentImg={path.icon}
                            handler={path.handler}
                            containerStyles='w-40'
                            btnStyles="hover:border-r-2 hover:border-solid hover:border-blue-300 "
                            contentStyles={`px-5 w-full h-10 hover:text-blue-400 ${location.pathname === path.path && '!text-blue-400'}`} />)
                }
            </nav>
            <Button
                componentImg={sideToggle ? leftArrow : rightArrow}
                containerStyles='absolute left-full bg-slate-300'
                handler={sideToggleHandler} />
        </aside>
    )
}