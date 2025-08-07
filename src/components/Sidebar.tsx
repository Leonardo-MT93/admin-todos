import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import logo from "../assets/next.svg";
import { SidebarItem } from "./SidebarItem";
import { IoBasketballOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPersonOutline } from "react-icons/io5";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./LogoutButton";

const menuItems = [
  {
    icon: <IoCalendarOutline size={30} />,
    path: "/dashboard",
    title: "Dashboard",
  },
  {
    icon: <IoCheckboxOutline size={30} />,
    path: "/dashboard/rest-todos",
    title: "Rest TODOS",
  },
  {
    icon: <IoListOutline size={30} />,
    path: "/dashboard/server-todos",
    title: "Server Actions",
  },
  {
    icon: <IoCodeWorkingOutline size={30} />,
    path: "/dashboard/cookies",
    title: "Cookies",
  },
  {
    icon: <IoBasketballOutline size={30} />,
    path: "/dashboard/products",
    title: "Products",
  },
  {
    icon: <IoPersonOutline size={30} />,
    path: "/dashboard/profile",
    title: "Profile",
  },
  
  
];

const Sidebar = async () => {

  const session = await getServerSession(authOptions)
  if(!session){
    redirect('/api/auth/signin')
  }

  const imageProfile = session.user?.image ?? ""

  const userRoles = session.user?.roles
  return (  
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <Link href="#" title="home">
              <Image src={logo} width={32} height={32} alt="tailus logo"/>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Image src={imageProfile} width={100} height={100} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
              <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{session.user?.name}</h5>
              <span className="hidden text-gray-400 lg:block">{userRoles?.join(", ")}</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {menuItems.map((item) => (
              <SidebarItem key={item.path} {...item} />
            ))}
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <LogoutButton />
        </div>
      </aside>
  )
}

export default Sidebar