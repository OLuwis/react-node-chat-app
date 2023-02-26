import { useEffect, useRef, useState } from "react"

export default function ChatBody() {
    const [message, setMessage] = useState<string>("")

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textAreaRef.current) {
            !message ? textAreaRef.current.style.height = "3.5rem" :
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
        }
    }, [message])
    
    return (
        <div className="row-span-2 p-3.5 md:pl-0 h-full md:pt-3.5 pt-0">
            <div className="h-full rounded-md flex flex-col shadow-sm border-2 border-purple-500">
                <div className="w-full h-full md:p-3 p-1.5 flex flex-col gap-2 font-medium">
                    <div className={`bg-purple-500 w-fit text-white px-2.5 py-1.5 rounded-md border-2 border-purple-500 self-end md:max-w-lg break-all max-w-full shadow-sm`} id="message">
                        Hello There!adksjdksadasdasjdkajdkjsdjskdjakdjajdasjdajdksajdsajdkjsakdjaskdjasjdasjdkajdasjdajskdjsadjasjksjadkjadas
                    </div>
                    <div className={`bg-white w-fit text-black px-3 py-1.5 rounded-md border-2 border-purple-500 self-start md:max-w-lg break-all max-w-full shadow-sm`} id="message">
                        Hello There!
                    </div>
                </div>
                <form className="md:p-4 p-2 flex items-center justify-center md:gap-4 gap-2 h-auto">
                    <textarea name="text_input" id="text_input" placeholder="Type your message here..." className="w-full p-2 shadow-sm rounded-md border-2 focus:outline-purple-500 border-purple-300 placeholder:text-gray-500 resize-none py-1 pb-2 overflow-hidden" onChange={(e) => setMessage(e.target.value)} ref={textAreaRef} style={{minHeight: "3.5rem"}} value={message}></textarea>
                    <button type="submit" className="bg-purple-600 text-white h-14 w-20 rounded-md hover:bg-purple-500 shadow-sm font-medium place-self-end">Send</button>
                </form>
            </div>
        </div>
    )
}