"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const VerificationSuccess = () => {
  const router = useRouter();
  const handleContinue = () => {
    console.log("Navigating to dashboard...");
    router.push("/beverage-dashboard");
  };

  return (
    <div className="min-h-screen from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-md flex flex-col gap-20 py-14 w-full max-w-md p-8">
        {/* Success Icon */}
        <div className="flex  flex-col gap-2">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src={"/account/success.svg"}
                alt="logo image"
                width={100}
                height={100}
              />
              {/* Inner glow effect */}
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">
              Verification Successful!
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Congratulations! Your email has been successfully verified. Your
              account is now active and ready to use.
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
};
