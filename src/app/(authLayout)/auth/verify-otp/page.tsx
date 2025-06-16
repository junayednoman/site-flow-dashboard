
import OtpVerificationForm from "./OtpVerificationForm";

const VerifyOtpPassword = () => {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://i.postimg.cc/FKz53pq7/bg.jpg)`,
        }}
      ></div>
      <div className="flex items-center justify-center">
        <OtpVerificationForm />
      </div>
    </main>
  );
};

export default VerifyOtpPassword;
