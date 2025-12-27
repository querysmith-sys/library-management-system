import { Header } from './header';
import { Footer } from './footer';
import { Table } from './table';
export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 bg-white">
        <Header />
        <div>
            <Table />
        </div>
        <div className="mt-4 flex gap-4 justify-start">
            <button className='border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer'>Issue Book</button>
            <button className='border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer'>Return Book</button>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

