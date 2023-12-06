"use client";

import React from "react";
import styles from "./SearchBar.module.css";
import VisuallyHidden from "../VisuallyHidden";

function SearchBar({ children, ...delegated }: { children: React.ReactNode }) {
  return (
    <form {...delegated}>
      <search>
        <label>
          <VisuallyHidden>검색</VisuallyHidden>
        </label>
        {children}
      </search>
    </form>
  );
}

SearchBar.TextField = React.forwardRef<HTMLInputElement>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={styles["search-area__text-field"]}
      type="text"
      placeholder="검색어를 입력하세요"
      autoComplete="off"
    />
  );
});

SearchBar.TextField.displayName = "SearchBar";

export default SearchBar;
