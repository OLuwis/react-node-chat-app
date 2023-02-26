export default function ChatHeader() {
    return (
        <header>
            <div className="flex items-center gap-2 p-3 px-3 md:px-4 h-full">
                <span className="text-3xl text-gray-400">#</span>
                <span className="text-md px-2.5 rounded-md  font-medium flex justify-center items-center gap-2 h-8 mt-0.5 border-2 border-purple-500">All <span className="w-2 h-2 bg-purple-500 rounded-full"></span><span className="-mt-0.5">1 User</span></span>
            </div>
        </header>
    )
}