"use client"

import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar";

const SidebarSheet = () => {
  const {data} = useSession()

  const handleLoginWithGoogleClick = () => signIn("google")
  const handleLogoutClick = () => signOut()

  return ( 
    <SheetContent className="overflow-y-outo">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>

        <div className="flex items-center gap-3 py-5 border-b border-solid justify-between">         
          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.user.image ?? ''}/>
              </Avatar>

              <div className="text-left">
                <p className="font-bold">{data.user.name}</p>
                <p className="text-xs">{data.user.email}</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-bold text-lg">Olá, faça seu login!</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <LogInIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Faça login na plataforma</DialogTitle>
                    <DialogDescription>
                      Conecte-se usando sua conta do Google.
                    </DialogDescription>
                  </DialogHeader>
                  <Button variant="outline" className="gap-1 font-bold" onClick={handleLoginWithGoogleClick}>
                    <Image alt="Fazer login com o Google" src="/google.svg" width={18} height={18}/>
                    Google
                  </Button>
                </DialogContent>
              </Dialog>
            </>
          )}
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
            <SheetClose asChild key={option.title}>
              <Button asChild className="justify-start gap-2" variant="ghost">
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image alt={option.title} src={option.imageUrl} height={18} width={18}/>
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        <div className="flex flex-col gap-2 py-5">
            <Button className="justify-start gap-2" variant="ghost" onClick={handleLogoutClick}>
              <LogOutIcon size={18}/>
              Sair da conta
            </Button>
        </div>
      </SheetHeader>
    </SheetContent>
   );
}
 
export default SidebarSheet;