import styles from "./Button.module.scss"

interface IButton {
  type?: string;
  onClick?: () => void;
  text: string;
}

const Button = (props: IButton) => {
  return <button className={styles.button} onClick={props.onClick}>{props.text}</button>;
};

export default Button;