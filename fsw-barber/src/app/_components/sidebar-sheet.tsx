import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import Image from "next/image";

const SidebarSheet = () => {
  return ( 
    <SheetContent className="overflow-y-outo">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>

        <div className="flex items-center gap-3 py-5 border-b border-solid">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
          </Avatar>

          <div>
            <p className="font-bold">Kauane Vieira</p>
            <p className="text-xs">kauane@teste.com.br</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-5 border-b border-solid">
          <SheetClose asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href="/">
                <HomeIcon size={18}/>
                Início
              </Link>
            </Button>
          </SheetClose>
          <Button className="justify-start gap-2" variant="ghost">
            <CalendarIcon size={18}/>
            Agendamentos
          </Button>
        </div>
        <div className="flex flex-col gap-2 py-5 border-b border-solid">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} className="justify-start gap-2" variant="ghost">
              <Image alt={option.title} src={option.imageUrl} height={18} width={18}/>
              {option.title}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2 py-5">
            <Button className="justify-start gap-2" variant="ghost">
              <LogOutIcon size={18}/>
              Sair da conta
            </Button>
        </div>
      </SheetHeader>
    </SheetContent>
   );
}
 
export default SidebarSheet;