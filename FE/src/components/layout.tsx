import { Header } from "./header";
import { Footer } from "./footer";
// import { Table } from './table';
export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
