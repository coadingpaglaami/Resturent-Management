import TranstackProvider from "@/provider/TranstackProvider";
import { Profile } from "@/webcomponent/account";

export default function ProfilePage() {
  return (
    <TranstackProvider>
      <Profile />
    </TranstackProvider>
  );
}
