import Image from 'next/image';

export default function ArapackLogo() {
  return (
    <div
      className={` flex flex-row items-center md:flex-col md:pl-8 leading-none text-black`}
    >
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
