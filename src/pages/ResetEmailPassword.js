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
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/password-reset/`,
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

            setErrorMessage("Password reset email sent successfully. Please check your email to verify.");
        } catch (error) {
            console.error("Error during password reset:", error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen px-4 md:px-0">
            <div className="flex flex-col items-center gap-8 w-full max-w-sm md:max-w-lg">
                <div className="text-center">
                    <h1 className="font-bold text-xl md:text-2xl">Enter Your Email</h1>
                </div>

                <div className="text-center mt-2">
                    <p className="text-sm md:text-base">
                        Please enter your registered email address to receive the password reset link.
                    </p>
                </div>

                <div className="mt-6 w-full">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email.toLowerCase()}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 border rounded-lg w-full text-sm md:text-base"
                    />
                </div>

                <div
                    className="bg-[#3431BB] px-6 py-3 rounded-lg w-full flex justify-center cursor-pointer hover:bg-[#282797]"
                    onClick={handleSubmit}
                >
                    <button
                        className="text-white font-medium"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Continue"}
                    </button>
                </div>

                {errorMessage && (
                    <div className="mt-4 text-red-500 text-sm md:text-base">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnterResPass;
