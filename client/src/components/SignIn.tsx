import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000" ,{
    secure:false,
    autoConnect: false,
});

export default function SignIn() {
    const [name, setName] = useState<string>("")
    const navigate = useNavigate()
    
    return (
        <>
            <main className="w-full flex items-center justify-center h-screen p-4">
                <form className="w-full max-w-md shadow-md rounded-md p-4 border-purple-500 border-2 flex gap-4 flex-col pb-5" onSubmit={(e) => {
                    e.preventDefault()
                    if (name) {
                        socket.connect()
                        return navigate("/chat")
                    }
                }}>
                    <h1 className="font-bold text-purple-600 text-center text-2xl">SIGN IN</h1>
                    <input type="text" value={name} name="signin" id="signin" placeholder="Name" className="w-full text-left h-12 px-3 placeholder:text-gray-500 border-2 rounded-md border-purple-400 shadow-sm font-medium focus:outline-purple-600 hover:border-purple-600" onChange={(e) => setName(e.target.value)}/>
                    {!name && <span className="text-red-500 flex gap-2 px-0.5 -my-2"><span className="aspect-square block text-white bg-red-400 w-6 rounded-full text-center">!</span> Please insert a name</span>}
                    <button type="submit" className="h-12 w-full bg-purple-600 rounded-md shadow-md text-white font-medium flex items-center justify-center disabled:bg-red-600 enabled:hover:bg-purple-500" disabled={!name}>Sign In</button>
                </form>
            </main>
        </>
    )
}