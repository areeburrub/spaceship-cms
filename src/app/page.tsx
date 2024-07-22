import Image from "next/image";
import { Rocket } from "lucide-react"
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className={'flex items-center font-bold text-4xl gap-4 h-fit'}><Rocket size={50}/> Spaceship CMS</div>
      <div className={'flex items-center text-xl gap-4 h-fit'}>Work in Progress</div>
        <Button>Fuck Me</Button>
    </main>
  );
}
