
export const TurnsValue = ({isSelect, children}) => {
    const classValue = `${isSelect ? 'bg-slate-400 duration-200 border-3 text-slate-800' : 'text-slate-300'}`
    return (
      <div className={classValue + ` w-[100px] h-[100px] border-2 border-slate-200 rounded-full grid place-items-center mx-2 text-6xl duration-150`}>
        {children}
      </div>
    )
  }