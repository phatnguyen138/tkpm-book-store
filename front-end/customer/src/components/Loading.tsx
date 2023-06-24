import { AiOutlineLoading } from 'react-icons/ai'
const Loading = () => {
  return (
    <div className='flex items-center text-sky-600 font-semibold gap-2'>
        <AiOutlineLoading className='animate-spin-fast'/>
        <p>
            Đang tải...
        </p>
    </div>
  )
}

export default Loading