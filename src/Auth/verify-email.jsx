import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import axios from "axios";

const VerifyEmail = () => {
  const [status, setStatus] = useState("loading"); // loading | success | error
  const params = useParams()
  const token = params.token;
  const apiUrl = import.meta.env.VITE_API_URL;
  const verifyEmail = async ()=>{
    if (!token) {
      setStatus("error");
    }
     else{
        try {
            await axios.get(`${apiUrl}/verify-email/${token}`)
            setStatus('success')
        } catch (error) {
            setStatus('error')
            console.log(error)
        }
     }
  }
  useEffect(() => { 
    verifyEmail()
   
  }, []);

  const goBack = () => {
    window.history.back(); // Go back to the previous tab
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-violet-500 to-gray-200   px-4">
      <div className="bg-white p-6 md:p-8 shadow-lg rounded-xl text-center max-w-md w-full">
        {status === "loading" && <p className="text-lg font-medium">Verifying...</p>}

        {status === "success" && (
          <>
            <CheckCircle className="text-green-500 mx-auto w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Account Verified</h2>
            <p className="text-gray-600 mt-2">You can now close this tab.</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="text-red-500 mx-auto w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Session Expired</h2>
            <p className="text-gray-600 mt-2">Please request a new verification email.</p>
          </>
        )}

        <p
        onClick={goBack}
          className="mt-4  px-4 py-2 text-blue-500 transition"
        >
          Go to Previous Tab
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
