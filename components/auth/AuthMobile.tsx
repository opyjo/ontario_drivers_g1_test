"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import UserNav from "./UserNav";
import { NavItems } from "./NavItems";

export const AuthMobile = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            aria-label="Open mobile menu"
            tabIndex={0}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col space-y-6 pt-6">
            <div className="flex justify-center">
              <UserNav />
            </div>
            <NavItems />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
