import { SignOutButton } from "@/app/_features/auth/components";
import { SideMenu } from "@/app/_features/guest/components/SideMenu";

function Layout({ children }) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12 2xl:gap-32">
      <SideMenu>
        <SignOutButton />
      </SideMenu>
      {children}
    </div>
  );
}

export default Layout;
