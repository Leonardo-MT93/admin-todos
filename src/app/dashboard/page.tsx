import Widget from "@/components/Widget";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const session = await getServerSession(authOptions)
  if(!session){
    redirect('/api/auth/signin')
  }
    return (
        <div className="grid gap-6 grid-cols-1">
            
        <Widget title="Usuario conectado Server Side">
            <div className="flex flex-col gap-2">
              <p>{session.user?.name}</p>
              <p>{session.user?.email}</p>
            </div>
        </Widget>
        <div>
          {
            JSON.stringify(session)
          }
        </div>
      </div>   
    )
}