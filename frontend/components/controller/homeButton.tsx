import { Home } from "lucide-react"; // Replace with actual import path
import { Button } from "@nextui-org/react"; // Replace with actual import path
import Link from "next/link";

export default function HomeButton() {
  return (
    <Link href="/">
      <Button isIconOnly variant="light">
        <Home className="h-4 w-4" />
      </Button>
    </Link>
  );
}
