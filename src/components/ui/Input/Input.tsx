import { HTMLProps, ReactNode } from 'react';
import styles from './style.module.css';
import classNames from 'classnames';
import TextInput from './TextInput';
type InputProps = Omit<HTMLProps<HTMLDivElement>, 'children'> & {
    children: ReactNode
}

const Input = ({ className, children, ...props }: InputProps) => {
    return (
        <div className={classNames(styles['Input'], { [className!]: Boolean(className) })} {...props}>
            {children}
        </div>
    );
}

Input.TextInput = TextInput

export default Input;
