
import BarChart from 'entities/chart/barChart'
import PieChart from 'entities/chart/pieChart';
import { NumChart } from 'entities/chart/numChart';
import { Button } from 'shared/ui';
import { useGetChoiceData } from '../model/queries';
import { useChartTypeState } from '../model/voteDetail';

interface Props {
    ownPicture: string;
    title: string;
    voteId: string;
}

export function VoteDetail({
    ownPicture, title, voteId
}: Props) {
    const choice = useGetChoiceData(voteId);
    const { chartType, chartTypeHandler } = useChartTypeState();

    return (
        <div className={`${choice?.length > 8 && "w-[70vw]"} min-w-80 flex flex-col gap-8`}>
            <section className="flex justify-between gap-2">
                <div className='mr-20 flex items-center'>
                    <img src={ownPicture} alt="프로필 사진" className="w-8 h-8 mr-3 rounded-full" />
                    <h1>{title}</h1>
                </div>
            </section>
            <section >
                <Button
                    text={chartType}
                    btnStyles='h-7 px-2 bg-blue-300 shadow hover:shadow-inner'
                    contentStyles='text-xs text-white font-light'
                    handler={chartTypeHandler} />
                <div className='h-5/6 m-2'>
                    {chartType === '기본' && <NumChart data={choice} />}
                    {chartType === '막대' && <BarChart data={choice} />}
                    {chartType === '파이' && <PieChart data={choice} />}
                </div>
            </section>
        </div>
    )
}