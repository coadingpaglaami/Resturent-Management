import TranstackProvider from "@/provider/TranstackProvider";
import Image from "next/image";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <Image
        src= "/authImages/left-image.png"
        width={800}
        height={800}
        alt="Left Decorative"
        className=" max-md:hidden w-full h-auto"
        style={{
          maxWidth: "54vw",
        }}
      />
      <div className="flex flex-col gap-2.5">
        <Image
          src={"/authImages/food-management.png"}
          width={100}
          height={100}
          alt="Logo"
          className="mb-8 self-center"
        />
        <TranstackProvider>{children}</TranstackProvider>
      </div>
    </div>
  );
}
