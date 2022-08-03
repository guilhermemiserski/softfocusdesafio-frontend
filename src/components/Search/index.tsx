import styles from "./Search.module.scss"

interface ISearch {
  maxLenght: number;
  placeholder: string;
  onChange: (e: any) => void;
}

const Search = (props: ISearch) => {


  return (
    <input className={styles.searchInput} type="number" maxLength={props.maxLenght} placeholder={props.placeholder} onChange={props.onChange} />
  );
};

export default Search;