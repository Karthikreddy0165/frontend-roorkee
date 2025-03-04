import FilterContext from "@/Context/FilterContext";
import Router from "next/router";
import { useContext, useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useAuth } from "../Context/AuthContext";

const PreferencesModal = () => {
const { states, setStates, statesFromApi, setBeneficiaries } = useContext(FilterContext);
const { authState } = useAuth();
const [profileData, setProfileData] = useState({});
const [loading, setLoading] = useState(true);
const [fields, setFields] = useState([]);
const modalRef = useRef(null);

const handleOnClickApplyPreferences = () => {
    handleSave();
    Router.push("/AllSchemes");
};


useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
    document.body.classList.remove("overflow-hidden");
    };
}, []);



useEffect(() => {
    const fetchProfileData = async () => {
    setLoading(true);
    try {
        // Only fetch profile data if user is logged in
        if (authState.token) {
        const requestOptions = {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
            },
        };

        const profileResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/profile/`,
            requestOptions
        );
        const pData = await profileResponse.json();

        setProfileData({
            ...profileData,
            ...Object.entries(pData.dynamic_fields || {}).reduce((acc, [key, value]) => {
            acc[key.toLowerCase().replace(" ", "_")] = value;
            return acc;
            }, {}),
        });
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    } finally {
        setLoading(false);
    }
    };

    fetchProfileData();
}, [authState.token]);

useEffect(() => {
    const fetchProfileFields = async () => {
    setLoading(true);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dynamic-fields/`);
        if (!response.ok) {
        throw new Error(`Failed to fetch fields: ${response.statusText}`);
        }
        const data = await response.json();
        setFields(data.profile_fields);
    } catch (error) {
        console.error("Failed to fetch profile fields", error);
    } finally {
        setLoading(false);
    }
    };

    fetchProfileFields();
}, []);

const handleChange = (e, field) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
    ...prevData,
    [name]: value,
    }));

    // Handle special cases for beneficiaries and states
    if (name === 'community' || name === 'category') {
    setBeneficiaries([value]);
    } else if (name === 'state') {
    statesFromApi.forEach((it) => {
        if (value === it.id) {
        setStates([[it.id], [it.state_name]]);
        }
    });
    }
};

const handleSave = async () => {
    // Apply filters based on selected preferences even for non-logged in users
    const dynamicFields = fields.reduce((acc, field) => {
    const key = field.name;
    const value = profileData[key.toLowerCase().replace(" ", "_")];
    if (value) acc[key] = value;
    return acc;
    }, {});
    
    // Apply local filter changes regardless of authentication
    // Update beneficiaries and states based on profileData
    Object.entries(profileData).forEach(([key, value]) => {
    if (key === 'community' || key === 'category') {
        setBeneficiaries([value]);
    } else if (key === 'state') {
        statesFromApi.forEach((it) => {
        if (value === it.id) {
            setStates([[it.id], [it.state_name]]);
        }
        });
    }
    });
    
    // Only save to API if user is logged in
    if (authState.token) {
    const requestOptions = {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({
        dynamic_fields: dynamicFields,
        }),
    };

    try {
        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/profile/`,
        requestOptions
        );

        if (!response.ok) {
        throw new Error("Failed to save profile data.");
        }
    } catch (error) {
        console.error("Error saving profile data:", error);
    }
    }
    
};

const renderField = (field) => {
    switch (field.type) {
    case "choice":
        return (
        <div key={field.id} className="flex-1 mb-4">
            <label className="block mb-2 text-xs sm:text-sm font-semibold text-black">
            {field.name}
            </label>
            <select
            name={field.name.toLowerCase().replace(" ", "_")}
            className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 text-sm font-semibold text-black"
            value={profileData[field.name.toLowerCase().replace(" ", "_")] || ""}
            onChange={(e) => handleChange(e, field)}
            >
            <option value="">Select {field.name}</option>
            {field.choices.map((choice) => (
                <option key={choice} value={choice}>
                {choice}
                </option>
            ))}
            </select>
        </div>
        );
    case "integer":
        return (
        <div key={field.id} className="flex-1 mb-4">
            <label className="block mb-2 text-xs sm:text-sm font-semibold text-black">
            {field.name}
            </label>
            <input
            type="text"
            inputMode="numeric" 
            name={field.name.toLowerCase().replace(" ", "_")}
            className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 text-sm font-semibold text-black"
            placeholder={field.placeholder || `Enter your ${field.name}`}
            value={profileData[field.name.toLowerCase().replace(" ", "_")] ?? ""}
            onChange={(e) => {
                let rawValue = e.target.value;
                rawValue = rawValue.replace(/[^0-9-]/g, "");
                if (rawValue.includes("-") && rawValue.indexOf("-") !== 0) {
                rawValue = rawValue.replace("-", "");
                }
                let value = rawValue === "-" ? rawValue : Number.parseInt(rawValue, 10);
                if (isNaN(value)) {
                value = "";
                }
                if (value !== "" && field.min_value !== undefined) value = Math.max(field.min_value, value);
                if (value !== "" && field.max_value !== undefined) value = Math.min(field.max_value, value);
                handleChange({ target: { name: e.target.name, value } }, field);
            }}
            />
        </div>
        );
    case "char":
        return (
        <div key={field.id} className="flex-1 mb-4">
            <label className="block mb-2 text-xs sm:text-sm font-semibold text-black">
            {field.name}
            </label>
            <input
            type="text"
            name={field.name.toLowerCase().replace(" ", "_")}
            className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 text-sm font-semibold text-black"
            placeholder={field.placeholder || `Enter your ${field.name}`}
            value={profileData[field.name.toLowerCase().replace(" ", "_")] || ""}
            onChange={(e) => handleChange(e, field)}
            />
        </div>
        );
    case "boolean":
        return (
        <div key={field.id} className="flex-1 mb-4">
            <label className="block mb-2 text-xs sm:text-sm font-semibold text-black">
            {field.name}
            </label>
            <select
            name={field.name.toLowerCase().replace(" ", "_")}
            className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 text-sm font-semibold text-black"
            value={profileData[field.name.toLowerCase().replace(" ", "_")] || ""}
            onChange={(e) => handleChange(e, field)}
            >
            <option value="">Select {field.name}</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </select>
        </div>
        );
    case "date":
        return (
        <div key={field.id} className="flex-1 mb-4">
            <label className="block mb-2 text-xs sm:text-sm font-semibold text-black">
            {field.name}
            </label>
            <input
            type="date"
            name={field.name.toLowerCase().replace(" ", "_")}
            className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 text-sm font-semibold text-black"
            value={profileData[field.name.toLowerCase().replace(" ", "_")] || ""}
            onChange={(e) => handleChange(e, field)}
            />
        </div>
        );
    default:
        return null;
    }
};

// Group fields in pairs for responsive layout
const createFieldPairs = (fieldsArray) => {
    const pairs = [];
    for (let i = 0; i < fieldsArray.length; i += 2) {
    pairs.push(fieldsArray.slice(i, i + 2));
    }
    return pairs;
};

const fieldPairs = createFieldPairs(fields);

return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#3431BB] bg-opacity-10 z-50 h-screen">
    <div 
        ref={modalRef}
        className="bg-white rounded-lg w-[90%] sm:w-[720px] max-h-[90vh] overflow-y-auto p-6 flex flex-col items-start relative"
    >
        {/* Header */}
        <div className="flex justify-between items-center mb-2 -mt-2 w-full">
        <h2 className="text-2xl font-semibold text-[#0A0A0A]">
            Tell us a little more about yourself
        </h2>
        <button
            onClick={()=>{Router.push('/')}}
            className="text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center"
        >
            <MdClose className="w-6 h-6" />
        </button>
        </div>
        <p className="text-sm mb-4">
        Knowing you will help us find relevant schemes and job opportunities for you
        </p>

        {loading ? (
        <div className="flex items-center justify-center w-full h-32">
            <div className="w-8 h-8 border-4 border-t-transparent border-[#3431BB] border-solid rounded-full animate-spin"></div>
        </div>
        ) : (
        <>
            {/* Form Inputs */}
            <div className="space-y-4 w-full overflow-y-auto flex-1">
            {fieldPairs.map((pair, pairIndex) => (
                <div key={pairIndex} className="flex flex-col sm:flex-row gap-4 w-full">
                {pair.map((field) => renderField(field))}
                </div>
            ))}
            </div>

            {/* Footer Message */}
            <div className="flex p-2 items-end gap-2 self-stretch rounded bg-[#EEF] mt-4 mb-4 w-full">
            {authState.token ? 
                "You can edit your details later as well." : 
                "Sign in to save your preferences for future visits."}
            </div>

            {/* Apply Button */}
            <div className="flex mt-4 gap-4 w-full">
            <button
                onClick={handleOnClickApplyPreferences}
                className="px-4 py-2 rounded-lg border border-transparent bg-[#3431BB] text-white hover:bg-blue-700 w-full sm:w-auto"
            >
                Apply preferences
            </button>
            </div>
        </>
        )}
    </div>
    </div>
);
};

export default PreferencesModal;

