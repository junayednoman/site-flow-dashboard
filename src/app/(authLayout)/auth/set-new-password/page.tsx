import NewPasswordForm from "./NewPasswordForm";

const SetNewPassword = () => {
  return (
    <main className="w-[80%] mx-auto flex flex-col items-center justify-center">
      <div className="flex items-center gap-44 justify-between h-fit">
        <div>
          <NewPasswordForm />
        </div>
      </div>
    </main>
  );
};

export default SetNewPassword;
