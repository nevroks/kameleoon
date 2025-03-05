import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from './style.module.css';
import classNames from "classnames";
type ButtonProps = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'text' | 'children'> & {
    text: string
    variant?: "active" | "inactive"
}

const Button = ({ text, className, variant, ...props }: ButtonProps) => {
    return (
        <button className={classNames(styles['Button'], {
            [className!]: Boolean(className),
            [styles.active]: Boolean(variant) && variant === "active",
            [styles.inactive]: Boolean(variant) && variant === "inactive",
        })} {...props}>
            {text}
        </button>
    );
}

export default Button;
