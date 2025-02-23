'use client'
import React from "react";
import { ChevronLeft, ScrollTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HeaderButtons = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-30 rounded-full"
        onClick={handleClick}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-30 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </>
  );
};

export default HeaderButtons;
