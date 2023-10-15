import CardWithForm from "@/components/card-with-form";

export default function SignIn() {
  return (
    <section className="text grid h-screen grid-cols-2">
      <div className="bg-login-background bg-cover bg-center bg-no-repeat" />

      <div className="self-center justify-self-center">
        <CardWithForm type="sign-in" />
      </div>
    </section>
  );
}
