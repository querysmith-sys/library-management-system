

export function BaseButton({ButtonName, onClick}: {ButtonName: string, onClick?: () => void}) {

    return( 
        <button className='border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer' onClick={onClick}>{ButtonName}</button>
    )
}