import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingItem from "./_components/booking-item";
import Search from "./_components/search";
import Link from "next/link";

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  })

  return ( 
    <div>
      {/* header */}
      <Header />
      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">Olá, Kauane</h2>
        <p>Segunda-feira, 05 de agosto.</p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} className="gap-2" variant="secondary" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image alt={option.title} src={option.imageUrl} width={16} height={16}/>
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* IMAGE */}
        <div className="relative w-full h-[150px] mt-6">
          <Image alt="Agende nos melhores com FSW Barber" src="/banner-01.png" fill className="object-cover rounded-xl" />
        </div>

        {/* AGENDAMENTO */}
        <BookingItem />

        <h2 className="uppercase font-bold text-xs text-gray-400 mb-3 mt-6">Recomendados</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
          ))}
        </div>

        <h2 className="uppercase font-bold text-xs text-gray-400 mb-3 mt-6">Populares</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
          ))}
        </div>
      </div>
    </div>
   );
}
 
export default Home;