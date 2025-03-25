import Link from "next/link";

export default function Header() {
  return (
    <header className="h-10 flex items-center border-b border-border shadow-md shadow-shadow">
      <Link href={"/"} className="text-2xl font-bold px-2 ml-4">
        <span className="text-green-500">R</span>
        <span className="text-red-500">F</span>
        {/* &nbsp; */}
        <span>Check</span>
      </Link>
    </header>
  )
}
