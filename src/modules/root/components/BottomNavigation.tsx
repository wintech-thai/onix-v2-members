"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Gift, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouteConfig } from "@/config/route.config";

const navItems = [
  {
    label: "Home",
    icon: Home,
    path: RouteConfig.ROOT,
  },
  {
    label: "Privilege",
    icon: Gift,
    path: RouteConfig.PRIVILEGE.LIST,
  },
  {
    label: "Product",
    icon: ShoppingBag,
    path: RouteConfig.PRODUCT.LIST,
  },
  {
    label: "Profile",
    icon: User,
    path: RouteConfig.PROFILE.PROFILE,
  },
];

export const BottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl items-center justify-around px-4 sm:px-6 md:px-8">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item.path)}
              className={`flex h-14 min-w-15 flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon
                className={`h-5 w-5 transition-all ${
                  isActive ? "scale-110" : "scale-100"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};
