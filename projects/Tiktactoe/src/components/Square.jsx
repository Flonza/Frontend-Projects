

export const Square = ({children, updateBoard, index}) => {
    const handleClick = () => {
      updateBoard(index)
    }
    return (
      <div onClick={handleClick} 
      className='sm:w-28 sm:h-28 border-2 border-slate-200 rounded-md grid place-items-center cursor-pointer text-5xl w-20 h-20'>
        {children}
      </div>
    )
  }