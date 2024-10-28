"use client";

import React from "react";
import { Navbar, Button } from "@nextui-org/react";
import { Home, LogOut } from "lucide-react";

const HomeBar = () => {
  return (
    <Navbar className="px-4" isBordered>
      <div className="flex w-full justify-between items-center">
        <Button isIconOnly variant="light">
          <Home className="h-4 w-4" />
        </Button>
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
