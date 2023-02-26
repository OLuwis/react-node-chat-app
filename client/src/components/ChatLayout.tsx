import ChatHeader from "./ChatHeader"
import ChatSideBar from "./ChatSideBar"
import ChatBody from "./ChatBody"

export default function ChatLayout() {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 h-screen" style={{gridAutoRows: "4rem 1fr"}}>
            <ChatHeader />
            <ChatBody />
            <ChatSideBar />
        </div>
    )
}