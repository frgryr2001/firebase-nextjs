import CardWithForm from "@/components/card-with-form";

export default function SignIn() {
  return (
    <section className="text relative grid h-screen grid-cols-1 min-[900px]:grid-cols-2">
      <div className="absolute inset-0 bg-login-background bg-cover bg-center bg-no-repeat min-[900px]:relative" />

      <div className="relative self-center justify-self-center">
        <CardWithForm type="sign-in" />
      </div>
    </section>
  );
}
