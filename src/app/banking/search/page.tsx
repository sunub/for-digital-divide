"use client";

import SearchBar from "@/components/SearchBar";
import React from "react";
import VirtualKeyboard from "@/components/VirtualKeyboard";

function SearchPage() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>Search Page</h1>
      <SearchBar>
        <SearchBar.TextField ref={inputRef} />
      </SearchBar>
      <VirtualKeyboard inputRef={inputRef} />
    </div>
  );
}

export default SearchPage;
