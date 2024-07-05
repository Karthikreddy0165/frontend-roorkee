const ForgetPassSent = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen max-w-lg mx-auto">
            <div className="flex items-center justify-center max-w-lg w-full">
                <h1 className="font-bold">Password reset link sent!</h1>
            </div>

            <div className="text-center mt-4 max-w-lg w-auto">
                <h1>Click on the link sent to “ishita.kedia01@gmail.com” to reset your password</h1>
            </div>

            <div className="bg-[#3431BB] px-8 py-4 rounded-[13px] mt-8 max-w-lg w-full flex justify-center cursor-pointer hover:bg-[#282797]">
                <button className="text-white px-4 hover:bg-[#282797]">
                Take me to inbox
                </button>
            </div>
        </div>
    );
}

export default ForgetPassSent;
