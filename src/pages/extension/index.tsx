import { Button } from "@/components/ui/button";
import { DoorOpen, Plus, Search, SettingsIcon } from "lucide-react";
import CardComponent from "@/components/CardComponent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import SearchCard from "@/components/SearchCard";

const ExtensionPage = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <div className="lg:container h-full flex flex-col">
      <header className="flex justify-between items-center bg-primary text-primary-foreground py-4 px-4 sticky top-0 z-10 flex-1">
        <h1 className="text-4xl font-bold pl-16 flex-1">Swift Search</h1>
        <Button className="bg-green-500 hover:bg-green-700/90 text-white mr-4">
          <Plus className="mr-2" /> Add Habit
        </Button>
        <Button onClick={() => setOpen(true)} size={"icon"}>
          <Search />
        </Button>
      </header>

      <div className="flex flex-row">
        <aside className="bg-primary text-primary-foreground w-20 z-0 items-end justify-center py-4 flex top-0 fixed h-screen">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="" size={"icon"}>
                <SettingsIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              loop
              sideOffset={-50}
              alignOffset={50}
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log("profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DoorOpen /> Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </aside>
        <main className="bg-secondary text-secondary-foreground p-4 grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] auto-rows-fr gap-6 justify-evenly overflow-y-auto ml-20 w-full justify-items-center">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <CardComponent key={i} />
            ))}
        </main>
      </div>
      <CommandDialog open={true} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {/* {Array(10)
              .fill(0)
              .map((_, i) => (
                <CommandItem key={i}>{Math.random()}</CommandItem>
              ))} */}
            <SearchCard />
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default ExtensionPage;
