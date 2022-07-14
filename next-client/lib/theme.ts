interface MantineTheme {
  // Defines color scheme for all components, defaults to "light"
  colorScheme: 'light' | 'dark';

  // Controls focus ring styles:
  // auto – display focus ring only when user navigates with keyboard (default)
  // always – display focus ring when user navigates with keyboard and mouse
  // never – focus ring is always hidden (not recommended)
  focusRing: 'auto' | 'always' | 'never';

  // Default border-radius used for most elements
  defaultRadius: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

  // White and black colors, defaults to '#fff' and '#000'
  white: string;
  black: string;

  // Object of arrays with 10 colors
  colors: Record<string, Tuple<string, 10>>;

  // Key of theme.colors
  primaryColor: string;

  // Index of color from theme.colors that is considered primary, Shade type is 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  primaryShade: Shade | { light: Shade; dark: Shade };

  // font-family and line-height used in most components
  fontFamily: string;
  lineHeight: string | number;

  // Timing function used for animations, defaults to 'ease'
  transitionTimingFunction: string;

  // Monospace font-family, used in Code, Kbd and Prism components
  fontFamilyMonospace: string;

  // Sizes for corresponding properties
  fontSizes: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  radius: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  spacing: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;

  // Values used for box-shadow
  shadows: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;

  // Breakpoints used in some components to add responsive styles
  breakpoints: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;

  // h1-h6 styles, used in Title and TypographyStylesProvider components
  headings: {
    fontFamily: CSSProperties['fontFamily'];
    fontWeight: CSSProperties['fontWeight'];
    sizes: {
      h1: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
      h2: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
      h3: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
      h4: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
      h5: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
      h6: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
    };
  };

  // theme functions, see in theme functions guide
  fn: MantineThemeFunctions;

  // Left to right or right to left direction, see RTL Support guide to learn more
  dir: 'ltr' | 'rtl';

  // Default loader used in Loader and LoadingOverlay components
  loader: 'oval' | 'bars' | 'dots';

  // Default date format used in DatePicker and DateRangePicker components
  dateFormat: string;

  // Add your own custom properties on Mantine theme
  other: Record<string, any>;

  // Default dates formatting locale used in every @mantine/dates component
  datesLocale: string;
}
