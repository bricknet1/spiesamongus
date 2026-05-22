import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const MENU_GAP_PX = 4;
const MIN_MENU_HEIGHT_PX = 120;
const PREFERRED_MAX_MENU_HEIGHT_PX = 240;

function ResponsiveSelect({ name, id, className = "", value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const preferredMaxHeight = Math.min(
      PREFERRED_MAX_MENU_HEIGHT_PX,
      window.innerHeight * 0.45
    );
    const menuScrollHeight = menuRef.current?.scrollHeight ?? preferredMaxHeight;
    const naturalHeight = Math.min(menuScrollHeight, preferredMaxHeight);

    const spaceBelow = window.innerHeight - rect.bottom - MENU_GAP_PX;
    const spaceAbove = rect.top - MENU_GAP_PX;
    const shouldOpenUpward =
      spaceBelow < naturalHeight && spaceAbove > spaceBelow;

    setOpenUpward(shouldOpenUpward);

    const availableSpace = shouldOpenUpward ? spaceAbove : spaceBelow;
    const maxHeight = Math.max(
      MIN_MENU_HEIGHT_PX,
      Math.min(preferredMaxHeight, availableSpace)
    );

    setMenuStyle({
      position: "fixed",
      left: rect.left,
      width: rect.width,
      maxHeight,
      zIndex: 10000,
      ...(shouldOpenUpward
        ? { bottom: window.innerHeight - rect.top + MENU_GAP_PX }
        : { top: rect.bottom + MENU_GAP_PX }),
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const frame = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(frame);
  }, [open, options, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const onScrollOrResize = () => updatePosition();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);

    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (
        wrapperRef.current?.contains(event.target) ||
        menuRef.current?.contains(event.target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setOpen(false);
  };

  const displayValue = value || options[0] || "";

  return (
    <div className="responsiveSelect" ref={wrapperRef}>
      <button
        type="button"
        id={id}
        className={`responsiveSelect-trigger formField ${className}`.trim()}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        <span className="responsiveSelect-triggerText">{displayValue}</span>
        <span className="responsiveSelect-chevron" aria-hidden="true">
          {open && openUpward ? "▴" : "▾"}
        </span>
      </button>
      {open &&
        menuStyle &&
        createPortal(
          <ul
            ref={menuRef}
            className="responsiveSelect-menu"
            role="listbox"
            aria-labelledby={id}
            style={menuStyle}
          >
            {options.map((option) => (
              <li
                key={option}
                role="option"
                aria-selected={option === value}
                className={
                  option === value
                    ? "responsiveSelect-option responsiveSelect-optionSelected"
                    : "responsiveSelect-option"
                }
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
}

export default ResponsiveSelect;
