import { createContext, type Dispatch } from "react";

// 1. Типизация и создание контекста
export interface ILanguageContext {
  language: "ru" | "en" | "de";
  setLanguage: Dispatch<React.SetStateAction<"ru" | "en" | "de">>;
}

export const languageContext = createContext<ILanguageContext>({
  language: "ru",
  setLanguage: () => {},
});
