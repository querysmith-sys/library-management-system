import { Layout } from "../layout"
import { Membertable } from "../membertable"
export function Memberpage() {
    return (
         <Layout> 
            <div>
                <Membertable />
            </div>
            <div className="mt-4 flex gap-4 justify-start">
                <button className='border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer'>Add Member</button>
                <button className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer ml-2">Edit Member</button>
                <button className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer ml-2">Delete Member</button>
            </div>
         </Layout>
    )
}