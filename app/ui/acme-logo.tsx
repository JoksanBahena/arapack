import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={` flex flex-row items-center md:flex-col md:pl-8 leading-none text-black`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      
      {/* <Image src={"/arapack-logo.png"} alt="Logo" width={100} height={40} /> */}
      <Image
        src="/arapack-logo.png"
        alt="Logo"
        className="h-12 md:h-28 w-auto px-2 md:mb-2"
        width={120}
        height={40}
      />
      <p className="text-[32px] md:hidden block">Arapack</p>
    </div>
  );
}
