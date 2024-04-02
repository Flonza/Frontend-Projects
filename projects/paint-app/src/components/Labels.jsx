

export function Labels({children, For}) {
    return (
        <label htmlFor={For} className="inline-flex items-center p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-slate-200 peer-checked:bg-gray-700 peer-checked:border-2 peer-checked:border-white peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                {children}
        </label>
    )
}