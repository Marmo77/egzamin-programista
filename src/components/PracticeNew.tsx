import { getPracticeExams } from '@/hooks/getPracticeExams'
import { type PracticeType } from '@/types/types'
import { useEffect, useState } from 'react'
import PracticeCardNew from './Practice/PracticeCardNew'

const PracticeNew = () => {
    const [exams, setExams] = useState<PracticeType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [totalCount, setTotalCount] = useState<number>(0)

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const { data, count } = await getPracticeExams();
                setExams(data);
                setTotalCount(count);
                console.log("Fetched exams:", data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchExams();
    }, []);
    
  return (
    <section>
        <div>
            {isLoading ? <p>Loading...</p> : <p>Loaded</p>}
        </div>
        <div>
            Exams {totalCount}
        </div>
        <div className='grid grid-cols-3 max-w-6xl gap-5 mx-auto'>
            {exams.map((exam) => (
                <PracticeCardNew key={exam.id} exam={exam}/>
            ))}
        </div>

    </section>
  )
}

export default PracticeNew