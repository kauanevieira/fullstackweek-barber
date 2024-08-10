import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Barbershop } from "@prisma/client";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return ( 
      <Card className="min-w-[159px] rounded-2xl">
        <CardContent className="p-0 px-1 pt-1">
          {/* IMAGEM */}
          <div className="relative h-[159px] w-full">
            <Image alt={barbershop.name} src={barbershop.imageUrl} fill className="object-cover rounded-2xl"/>
            <Badge className="absolute left-2 top-2 space-x-1" variant="secondary">
              <StarIcon size={12} className="fill-primary text-primary"/>
              <p className="text-xs font-semibold">5,0</p>
            </Badge>
          </div>

          {/* TEXT */}
          <div className="py-3 px-1">
            <h3 className="font-semibold truncate">{barbershop.name}</h3>
            <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
            <Button asChild variant="secondary" className="mt-3 w-full rounded-xl">
              <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
   );
}
 
export default BarbershopItem;