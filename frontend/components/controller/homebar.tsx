"use client";

import React from "react";
import { Navbar, Button } from "@nextui-org/react";
import { LogOut } from "lucide-react";
import HomeButton from "./homeButton";

// navbar on the homepage
const HomeBar = () => {
  return (
    <Navbar className="px-4" isBordered>
      <div className="flex w-full justify-between items-center">
        <HomeButton />
        <Button
          variant="light"
          className="text-danger"
          startContent={<LogOut className="h-4 w-4" />}
        >
          Logout
        </Button>
      </div>
    </Navbar>
  );
};

export default HomeBar;
