import { Box } from "@/app/lib/definitions";

export default function WildcardRow({ wildcard }: { wildcard: Box }) {
  return (
    <li
      role="button"
      className={
        "py-4 pr-5 pl-4 text-sm/6 cursor-pointer transition-colors select-none"
      }
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex w-full md:w-0 flex-1 items-center">
          <div className="flex flex-col md:flex-row md:min-w-0 flex-1 gap-1 md:gap-2">
            <span className="truncate font-medium text-xs">
              {wildcard.client}
            </span>
          </div>
        </div>
      </div>
      {wildcard.symbol}
    </li>
  );
}
