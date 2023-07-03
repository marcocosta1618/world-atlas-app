const SunSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 30 30"
    {...props}>
    <path d="M14.984.986A1 1 0 0 0 14 2v3a1 1 0 1 0 2 0V2A1 1 0 0 0 14.984.986zM5.797 4.8a1 1 0 0 0-.695 1.717l2.12 2.12a1 1 0 1 0 1.415-1.413L6.516 5.102a1 1 0 0 0-.72-.303zm18.375 0a1 1 0 0 0-.688.303l-2.12 2.12a1 1 0 1 0 1.413 1.415l2.121-2.121a1 1 0 0 0-.726-1.717zM15 8a7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7zM2 14a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H2zm23 0a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3zM7.91 21.06a1 1 0 0 0-.687.303l-2.121 2.121a1 1 0 1 0 1.414 1.414l2.12-2.12a1 1 0 0 0-.726-1.717zm14.15 0a1 1 0 0 0-.697 1.717l2.121 2.121a1 1 0 1 0 1.414-1.414l-2.12-2.12a1 1 0 0 0-.717-.303zm-7.076 2.926A1 1 0 0 0 14 25v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1.016-1.014z" />
  </svg>
);

const MoonSvg = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={20}
    height={20}
    viewBox="-1 0 20 20" 
    {...props}>
    <path d="M13.719 1.8A8.759 8.759 0 1 1 1.8 13.719c3.335 1.867 7.633 1.387 10.469-1.449 2.837-2.837 3.318-7.134 1.45-10.47z" />
  </svg>
);

export const ThemeSwitchBox = ({theme, switchTheme}) => {

    return (
        <div className={"ThemeSwitchBox"} onClick={switchTheme}>
            <div className={"ThemeSwitch"}></div>
            {theme === 'light'
              ? <SunSvg></SunSvg>
              : <MoonSvg></MoonSvg>}
        </div>
    )
}