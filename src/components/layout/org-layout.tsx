import { BottomNavigation } from "@/modules/point/components/BottomNavigation";
import { OrgHeader } from "../org-header";

type Props = {
  children: React.ReactNode;
};

export const OrgLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-background">
      <OrgHeader />

      <main className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-4 pb-24">
        {children}
      </main>

      <BottomNavigation />
    </div>
  );
};
