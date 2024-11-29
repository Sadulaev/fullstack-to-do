import styles from "./styles.module.css";

type Option = {
  text: string;
  value: string | undefined;
  disabled?: boolean;
  hidden?: boolean;
  selected?: boolean;
};

type Props = {
  placeholder?: string;
  options?: Option[];
  onChange?: (value: string) => void;
};

const Select = (props: Props) => {
  const { options = [], onChange, placeholder, ...args } = props;
  return (
    <select
      className={styles.customSelect}
      {...args}
      onChange={(event) => onChange && onChange(event.target.value)}
    >
      {!!placeholder && (
        <option disabled selected hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          id={option.value}
          value={option.value}
          disabled={option.disabled}
          selected={option.selected}
          hidden={option.hidden}
        >
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
