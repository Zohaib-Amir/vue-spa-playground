import { inject, ref, Ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { ColorPallette, Theme, themeKey } from './../data/theme';

export interface ThemeComposition {
  isDark: Ref<boolean>;
  toggleDark: () => boolean;
  theme: Ref<ColorPallette>;
}

export function useTheme(): ThemeComposition {
  const theme = inject(themeKey) as Theme;
  const pallette = ref(theme.light);
  const isDark = ref(false);
  const isDarkInternal = useDark({
    onChanged(dark: boolean) {
      isDark.value = dark;
      pallette.value = dark ? theme.dark : theme.light;
    },
  });
  const toggleDark = useToggle(isDarkInternal);

  return {
    isDark,
    toggleDark,
    theme: pallette,
  };
}
