import { useEffect, useCallback, forwardRef } from 'react';
import { useSelect } from 'downshift';
import { IoIosArrowDown } from 'react-icons/io';
import { VscClose } from 'react-icons/vsc';
import { Mods, classNames } from 'helpers/classNames/classNames';
import styles from './Dropdown.module.scss';

/* eslint-disable */

export interface IOptions {
  label: string;
  value: string;
  icon?: string;
}

export type DropdownProps<IOptions> = {
  options?: Array<IOptions>;
  value?: IOptions | null;
  onChange?: (value: IOptions | null) => void;
  onChaggeValue?: (value: IOptions | null) => void;
  onBlur?: (value: IOptions | null) => void;
  onFocus?: () => void;
  hasError?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  ariaLabel?: string;
  className?: string;
  labelname?: string;
  placeholder?: string;
  itemToString?: (item: IOptions | null) => string;
  id?: string;
  loading?: boolean;
  showCleanBtn?: boolean;
  onChaggeValu?: (value: IOptions | null) => void;
};

export const Dropdown = forwardRef(({
  options = [],
  id,
  value,
  onBlur,
  onFocus,
  onChange,
  onChaggeValue,
  ariaLabel,
  hasError = false,
  disabled = false,
  autoFocus = false,
  labelname = '',
  placeholder = '',
  className,
  itemToString,
  loading,
  showCleanBtn = true,
}: DropdownProps<IOptions | null>) => {
  const handleChange = useCallback(
    ({ selectedItem }: { selectedItem: IOptions | null }) => {
      if (onChaggeValue) {
        onChaggeValue(selectedItem);
      }
    },
    [onChaggeValue],
  );

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useSelect({
    items: options,
    onSelectedItemChange: handleChange,
    selectedItem: value,
  });

  const menuMods: Mods = {
    [styles.hidden]: !isOpen,
  };

  const menuClass = classNames(styles.menu, menuMods, []);

  const arrowMods: Mods = {
    [styles.rotate]: !!isOpen,
  };

  const btnMods: Mods = {
    [styles.isOpen]: !isOpen,
    [styles.error]: !!hasError,
    [styles.mgtop]: !!labelname,
  };

  const arrowClass = classNames(styles.arrow, arrowMods);
  const btnClass = classNames(styles.button, btnMods);

  const defaultItemToString = useCallback(
    (item: IOptions) => String(item.label),
    [],
  );

  const convertItemToString = itemToString ?? defaultItemToString;

  useEffect(() => {
    if (isOpen && onFocus) {
      onFocus();
    }
  }, [isOpen, onBlur, onFocus]);

  const placeho: Mods = {
    [styles.placeholderSmall]: Boolean(showCleanBtn && selectedItem),
  };

  return (
    <div className={classNames(styles.wrapper, {}, [className || ''])}>
      <label {...getLabelProps()}>
        {labelname}
        <button
          type='button'
          id={id}
          aria-label={ariaLabel}
          className={btnClass}
          disabled={disabled || options.length === 0}
          autoFocus={autoFocus}
          {...getToggleButtonProps()}
        >
          <div className={styles.wrapperPlaceHolder} style={{ height: 24 }}>
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              className={classNames(styles.placeholder, placeho)}
            >
              {selectedItem?.icon && (
                <img
                  style={{
                    width: 24,
                    height: 24,
                    display: 'inline-block',
                    marginRight: 8,
                  }}
                  src={selectedItem.icon}
                  alt='icon'
                />
              )}
              {selectedItem ? convertItemToString(selectedItem) : placeholder}
            </div>
            <div className={styles.wrapperButtons}>
              {showCleanBtn && selectedItem && (
                <span
                  role='button'
                  tabIndex={0}
                  className={styles.cleanBtn}
                  aria-label='remove selection button'
                  onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    if (onChange && !disabled) onChange(null);
                  }}
                >
                  <VscClose fill='#b8b8b8' />
                </span>
              )}
              <span
                role='button'
                className={arrowClass}
                aria-label='toggle menu button'
              >
                <IoIosArrowDown fontSize={22} fill='#b8b8b8' />
              </span>
            </div>
          </div>
        </button>
      </label>
      <div className={styles.relative}>
        {!loading ? (
          <ul className={menuClass} {...getMenuProps()}>
            {options.map((item, index: number) => (
              <li
                style={{ display: 'flex', alignItems: 'center' }}
                className={classNames(styles.li, {}, [
                  highlightedIndex === index ? styles.highlighted : '',
                  item === selectedItem ? styles.selected : '',
                ])}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                {item?.icon && (
                  <img
                    style={{ width: 24, height: 24, marginRight: 8 }}
                    src={item.icon}
                    alt='coin-icon'
                  />
                )}
                {item && convertItemToString(item)}
              </li>
            ))}
          </ul>
        ) : isOpen ? (
          <div>loader</div>
        ) : null}
      </div>
    </div>
  );
});
