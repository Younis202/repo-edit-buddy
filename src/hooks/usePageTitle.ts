import { useEffect } from "react";

export const usePageTitle = (title: string) => {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | شذايا` : "شذايا — عطور فاخرة";
    return () => { document.title = prev; };
  }, [title]);
};
