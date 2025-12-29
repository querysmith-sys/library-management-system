import { Layout } from "../layout";
import { Booktable } from "../booktable";
export function IssueReturnpage()  {
     return (
        
        <Layout>
                <div>
                    <Booktable />
                </div>
                <div className="mt-4 flex gap-4 justify-start">
                    <button className='border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer'>Issue Book</button>
                    <button className='border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer'>Return Book</button>
                </div>
        </Layout>
        
     )
}