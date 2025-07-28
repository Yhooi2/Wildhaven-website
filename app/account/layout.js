import { SignOutButton } from "../_features/auth/components";
import { SideMenu } from "./SideMenu";

function Layout({ children }) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12 xl:gap-32">
      <SideMenu>
        <SignOutButton />
      </SideMenu>
      {children}
    </div>
  );
}

export default Layout;
