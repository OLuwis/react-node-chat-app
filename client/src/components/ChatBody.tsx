import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

export default function ChatBody({ socket }: {socket: Socket}) {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<{ user:string, message: string, id: string }[]>([]);
    
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            !message ? textAreaRef.current.style.height = "3.5rem" :
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        };
    }, [message])
    
    socket.on("messages", messages => setMessages(messages));
    
    return (
        <div className="row-span-2 p-3.5 md:pl-0 h-full md:pt-3.5 pt-0">
            <div className="h-full rounded-md flex flex-col shadow-sm border-2 border-purple-500">
                <div className="w-full h-full md:p-3 p-1.5 flex flex-col gap-2 font-medium overflow-y-auto">
                    {messages.map(message => (
                        <div className={`${message.id === socket.id ? "bg-purple-500 text-white self-end" : "bg-white text-black self-start"} w-fit px-3 py-1.5 rounded-md border-2 border-purple-500 self-start md:max-w-lg break-all max-w-full shadow-sm relative mb-12`} id="message" key={message.user}>
                            {message.message}
                            <span className="block absolute right-1/2 -translate-x-1;2 w-2 h-3 top-full bg-purple-500"></span>
                            <span className={`block absolute ${message.id === socket.id ? "right-0 bg-white text-black border-2 border-purple-500" : "left-0 bg-purple-500 text-white"} top-full mt-3 rounded-md w-auto whitespace-nowrap px-2.5 py-1.5`} id="user">
                                {message.user}<span className={`${message.id === socket.id ? "text-gray-500" : "text-gray-200"} ml-1`}>#{message.id}</span>
                            </span>
                        </div>
                    ))}
                </div>
                <form className="md:p-4 p-2 flex items-center justify-center md:gap-4 gap-2 h-auto" onSubmit={(e) => {
                    e.preventDefault()
                    socket.emit("message", { user: localStorage.user, message: message, id: socket.id })
                }}>
                    <textarea name="text_input" id="text_input" placeholder="Type your message here..." className="w-full p-2 shadow-sm rounded-md border-2 focus:outline-purple-500 border-purple-300 placeholder:text-gray-500 resize-none py-1 pb-2 overflow-hidden disabled:cursor-not-allowed" onChange={(e) => setMessage(e.target.value)} ref={textAreaRef} style={{minHeight: "3.5rem"}} value={message}></textarea>
                    <button type="submit" className="bg-purple-600 text-white h-14 w-20 rounded-md hover:bg-purple-500 shadow-sm font-medium place-self-end">Send</button>
                </form>
            </div>
        </div>
    )
}