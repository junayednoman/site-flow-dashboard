import NewPasswordForm from "./NewPasswordForm";

const SetNewPassword = () => {
  return (
    <main className="mx-auto flex flex-col items-center justify-center">
      <div className="h-screen grid grid-cols-2 w-full">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://i.postimg.cc/FKz53pq7/bg.jpg)`,
          }}
        ></div>
        <div className="flex items-center justify-center">
          <NewPasswordForm />
        </div>
      </div>
    </main>
  );
};

export default SetNewPassword;
