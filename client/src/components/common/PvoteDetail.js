import { useEffect, useState } from 'react';

import Button from './button'
import BarChart from './barChart'
import PieChart from './pieChart';
import Pchoice from './Pchoice';

export default function PvoteDetail({ profiles_picture, vote }) {
    const [chartType, setChartType] = useState(0);
    const [typeName, setTypeName] = useState();

    useEffect(() => {
        const view = ['기본', '막대', '파이']

        setTypeName(view[chartType]);
    }, [chartType]);

    const chartType_toggle = () => {
        setChartType(prev => (prev + 1) % 3)
    }

    return (
        <div className='min-w-[70vw] p-5 flex flex-col bg-gradient-to-br from-cyan-100 to-blue-200 gap-8'>
            <section className="flex justify-between gap-2">
                <div className='mr-20 flex items-center'>
                    <img src={profiles_picture} alt="프로필 사진" className="w-8 h-8 mr-3 rounded-full" />
                    <h1>{vote.title}</h1>
                </div>
            </section>
            <section >
                <Button
                    name={typeName}
                    containerStyles='h-7'
                    btnStyles='px-2 bg-blue-300 shadow hover:shadow-inner'
                    contentStyles='text-xs text-white font-light'
                    handler={chartType_toggle} />
                <div className='h-5/6 m-2'>
                    {chartType === 0 && <Pchoice choice={vote.choice} />}
                    {chartType === 1 && <BarChart data={vote.choice} />}
                    {chartType === 2 && <PieChart data={vote.choice} />}
                </div>
            </section>
        </div>
    )
}