import classNames from 'classnames';
import { DetailedHTMLProps, HTMLProps, InputHTMLAttributes } from 'react';
import styles from './style.module.css';

type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {

}

const TextInput = ({ className, ...props }: TextInputProps) => {
    return (
        <input className={classNames(styles['TextInput'],
            { [className!]: Boolean(className) })
        } {...props} />
    );
}

export default TextInput;
