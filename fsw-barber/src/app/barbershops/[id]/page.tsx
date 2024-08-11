import PhoneItem from "@/app/_components/phone-items";
import ServiceItem from "@/app/_components/service-item";
import SidebarSheet from "@/app/_components/sidebar-sheet";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/prisma";
import { ChevronLeft, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({params}: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  })

  if(!barbershop) {
    return notFound()
  }

  return (
    <>
      <div className="relative h-[250px] w-full">
        <Image alt={barbershop?.name} src={barbershop?.imageUrl} fill className="object-cover"/>
        <Button asChild size="icon" variant="secondary" className="absolute left-4 top-4">
          <Link href="/">
            <ChevronLeft />
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="absolute right-4 top-4" size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      {/* TÍTULO */}
      <div className="p-5 border-b border-solid">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18}/>
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="text-primary fill-primary" size={18}/>
          <p className="text-sm">5,0 (880 avaliações)</p>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="space-y-3 border-b corder-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-sm text-justify">{barbershop?.description}</p>
      </div>

      {/* SERVICOS */}
      <div className="p-5 space-y-3">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} barbershop={barbershop}/>
          ))}
        </div>
      </div>

      {/* CONTATO */}
      <div className="p-5 space-y-3">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone}/>
        ))}
      </div>
    </>
   );
}
 
export default BarbershopPage;