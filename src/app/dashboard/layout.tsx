import Sidebar from '@/components/Sidebar';
import { TopMenu } from '@/components/TopMenu';
import { CiBellOn, CiBookmarkCheck, CiChat1, CiLogout, CiMenuBurger, CiSearch } from 'react-icons/ci';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />    
      
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen text-black">
        
        <TopMenu />

        <div className="px-6 pt-6 bg-white p-2 m-2 pb-6 rounded-lg">
          {children}
        </div>
      </div>
    </>
  );
}