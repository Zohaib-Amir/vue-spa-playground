import { InjectionKey } from 'vue';

export interface ColorPallette {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  highlight: string;
}

export interface Theme {
  light: ColorPallette;
  dark: ColorPallette;
}

export const themeKey = Symbol() as InjectionKey<Theme>;
