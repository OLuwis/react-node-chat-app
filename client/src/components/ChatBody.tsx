import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"

export default function ChatBody({ socket }: {socket: Socket}) {
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<string[]>([])

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textAreaRef.current) {
            !message ? textAreaRef.current.style.height = "3.5rem" :
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
        };
    }, [message])

    useEffect(() => {
        socket.on("message", message => setMessages(oldMessages => [...oldMessages, message]));
    }, [messages])
    
    return (
        <div className="row-span-2 p-3.5 md:pl-0 h-full md:pt-3.5 pt-0">
            <div className="h-full rounded-md flex flex-col shadow-sm border-2 border-purple-500">
                <div className="w-full h-full md:p-3 p-1.5 flex flex-col gap-2 font-medium overflow-y-auto">
                    <div className={`bg-purple-500 w-fit text-white px-2.5 py-1.5 rounded-md border-2 border-purple-500 self-end md:max-w-lg break-all max-w-full shadow-sm mb-6 relative overflow-visible rounded-br-none`} id="message">
                        Hello There!adksjdksadasdasjdkajdkjsdjskdjakdjajdasjdajdksajdsajdkjsakdjaskdjasjdasjdkajdasjdajskdjsadjasjksjadkjadasaokdsokdoakoadksokdaokdokadokaddoksdoaokd
                        <span className={`block absolute right-0 top-full px-2 rounded-lg rounded-t-none bg-purple-500 -mt-1 pb-0.5 -mr-0.5 text-white`} id="user">
                            ~ Luis
                        </span>
                    </div>
                    <div className={`bg-white w-fit text-black px-3 py-1.5 rounded-md border-2 border-purple-500 self-start md:max-w-lg break-all max-w-full shadow-sm relative mb-7 rounded-br-none`} id="message">
                        Hello There!dkjsakdjaskdjskdjkdjsakdjdkjsadksajdkjsadkj
                        <span className={`block absolute right-0 top-full px-2 rounded-lg rounded-t-none bg-purple-500 pb-0.5 -mr-0.5 text-white`} id="user">
                            ~ Luis
                        </span>
                    </div>
                    {messages.map(message => (
                        <div className={`bg-white w-fit text-black px-3 py-1.5 rounded-md border-2 border-purple-500 self-start md:max-w-lg break-all max-w-full shadow-sm relative mb-7 rounded-br-none`} id="message" key={message}>
                            {message}
                            <span className={`block absolute right-0 top-full px-2 rounded-lg rounded-t-none bg-purple-500 pb-0.5 -mr-0.5 text-white`} id="user">
                                ~ Luis
                            </span>
                        </div>
                    ))}
                </div>
                <form className="md:p-4 p-2 flex items-center justify-center md:gap-4 gap-2 h-auto" onSubmit={(e) => {
                    e.preventDefault()
                    socket.emit("message", message)
                }}>
                    <textarea name="text_input" id="text_input" placeholder="Type your message here..." className="w-full p-2 shadow-sm rounded-md border-2 focus:outline-purple-500 border-purple-300 placeholder:text-gray-500 resize-none py-1 pb-2 overflow-hidden" onChange={(e) => setMessage(e.target.value)} ref={textAreaRef} style={{minHeight: "3.5rem"}} value={message}></textarea>
                    <button type="submit" className="bg-purple-600 text-white h-14 w-20 rounded-md hover:bg-purple-500 shadow-sm font-medium place-self-end">Send</button>
                </form>
            </div>
        </div>
    )
}