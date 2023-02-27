import ChatHeader from "./ChatHeader"
import ChatSideBar from "./ChatSideBar"
import ChatBody from "./ChatBody"
import { Socket } from "socket.io-client"

export default function ChatLayout({ socket }: {socket: Socket}) {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 h-screen" style={{gridAutoRows: "4rem 1fr"}}>
            <ChatHeader socket={socket}/>
            <ChatBody socket={socket}/>
            <ChatSideBar socket={socket}/>
        </div>
    )
}