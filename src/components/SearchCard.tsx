import React from "react";
import { CommandItem } from "./ui/command";
import { Facebook } from "lucide-react";

const SearchCard = () => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      window.location.href = "https://google.com";
    }
  };
  return (
    <CommandItem onKeyDown={handleKeyDown}>
      <a
        href="https://google.com"
        target="_blank"
        className="w-full flex items-center gap-4"
      >
        <Facebook />

        <div className="flex flex-col items-start">
          <h3>Site title</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum</p>
        </div>
      </a>
    </CommandItem>
  );
};

export default SearchCard;
