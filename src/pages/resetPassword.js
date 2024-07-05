const ResPass = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center gap-[59px] w-[400px]">
                <div className="flex flex-col items-center justify-center max-w-lg mx-auto">
                    <div className="flex items-center justify-center max-w-lg w-full">
                        <h1 className="font-bold text-36px">Reset your password</h1>
                    </div>

                    <div className="text-center mt-4 max-w-lg w-auto">
                        <h1>Enter a new password below to change your password</h1>
                    </div>

                    <div className="mt-8 w-full flex flex-col gap-4">
                        <div className="flex flex-col w-full">
                            <p className="font-medium mb-1">New Password</p>
                            <input 
                                type="password" 
                                placeholder="Enter your new password" 
                                className="px-4 py-2 border rounded-lg w-full"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <p className="font-medium mb-1">Confirm Password</p>
                            <input 
                                type="password" 
                                placeholder="Confirm Password" 
                                className="px-4 py-2 border rounded-lg w-full"
                            />
                        </div>
                    </div>

                    <div className="bg-[#3431BB] px-8 py-4 rounded-[13px] mt-8 max-w-lg w-full flex justify-center cursor-pointer hover:bg-[#282797]">
                        <button className="text-white px-4 hover:bg-[#282797]">
                            Reset password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResPass;
