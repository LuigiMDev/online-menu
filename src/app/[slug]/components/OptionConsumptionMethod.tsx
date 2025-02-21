import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ConsumptionMethod } from "@prisma/client";

type prop = {
  imageUrl: string;
  altImage: string;
  text: string;
  option: ConsumptionMethod;
  slug: string;
};

const OptionConsumptionMethod: React.FC<prop> = ({
  imageUrl,
  altImage,
  text,
  option,
  slug,
}) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={imageUrl}
            alt={altImage}
            fill
            className="object-contain"
          />
        </div>
        <Button variant={"secondary"} className="rounded-full" asChild>
          <Link href={`${slug}/menu?consumptionMethod=${option}`}>{text}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default OptionConsumptionMethod;
