import { useState } from 'react';

const EnterResPass = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setErrorMessage(null); // Clear any previous errors

        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({ email: email });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            const response = await fetch(
                `http://3.109.208.148:8000/api/password-reset/`,
                requestOptions
            );
            const result = await response.json();

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error("User with this email does not exist. Enter a valid email");
                }
                if (result.email && result.email.includes("User with this email does not exist.")) {
                    throw new Error("User with this email does not exist.");
                } else {
                    throw new Error(result.message || `HTTP error! status: ${response.status}`);
                }
            }

            // console.log("Password reset email sent successfully:", result);

            // Handle success (e.g., show a success message or redirect)
            setErrorMessage("Password reset email sent successfully. Please check your email to verify.");
        } catch (error) {
            console.error("Error during password reset:", error);
            // Display the specific error message
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center gap-[59px] w-[400px]">
                <div className="flex flex-col items-center justify-center max-w-lg mx-auto">
                    <div className="flex items-center justify-center max-w-lg w-full">
                        <h1 className="font-bold text-36px">Enter Your Email</h1>
                    </div>

                    <div className="text-center mt-4 max-w-lg w-auto">
                        <h1>Please enter your registered email address to receive the password reset link.</h1>
                    </div>

                    <div className="mt-8 w-full flex flex-col gap-4">
                        <div className="flex flex-col w-full">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email.toLowerCase()}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full"
                            />
                        </div>
                    </div>

                    <div
                        className="bg-[#3431BB] px-8 py-4 rounded-[13px] mt-8 max-w-lg w-full flex justify-center cursor-pointer hover:bg-[#282797]"
                        onClick={handleSubmit}
                    >
                        <button className="text-white px-4 hover:bg-[#282797]" disabled={loading}>
                            {loading ? "Sending..." : "Continue"}
                        </button>
                    </div>

                    {errorMessage && (
                        <div className="mt-4 text-red-500">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnterResPass;
