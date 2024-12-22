import Form from "@/components/Form";
import RegistrationForm from "@/components/RegistrationForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-20">
      <header className="flex space-x-4">
        <Link href={"/posts"}>Posts</Link>
        <Link href={"/todos"}>Todos</Link>
        <Link href={"/products"}>Products</Link>
      </header>
      {/* <Form /> */}
      <RegistrationForm />
    </div>
  );
}
