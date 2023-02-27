import { useState } from "react";
import { Socket } from "socket.io-client";

export default function ChatSideBar({ socket }: {socket: Socket}) {
    const [users, setUsers] = useState<string[]>([])
    
    socket.on("users", myUsers => setUsers(myUsers))
    
    return (
        <div className="h-full pl-3.5 pb-3.5 md:pr-0 pr-3.5 w-full overflow-y-auto">
            <div className="h-auto md:rounded-r-none rounded-xl pl-3.5 font-medium max-h-full overflow-y-auto shadow-sm border-2 md:border-r-0 border-purple-500 border-r-2 bg-purple-500 text-white gap-3 flex flex-col py-3">
            {users.map(user => (
                <div className="h-10 flex items-center bg-purple-600 px-4 w-fit rounded-full" key={user}>
                    <span className="w-3 h-3 block bg-green-400 rounded-full mr-2.5"></span>{user}
                </div>
            ))}
            </div>
        </div>
    )
}