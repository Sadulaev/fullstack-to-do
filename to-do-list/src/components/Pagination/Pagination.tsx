import styles from "./styles.module.css";
import Button from "@/components/Button/Button";

type Props = {
  currentPage: number;
  lastPage: number | null;
  onChangePage?: (page: number) => void;
};

const Pagination = (props: Props) => {
  const { currentPage, lastPage, onChangePage = () => {} } = props;
  return (
    <div className={styles.container}>
      {currentPage >= 3 && (
        <div className={styles.firstPageButton}>
          <Button variant="secondary" onClick={() => onChangePage(1)}>
            1
          </Button>
          {currentPage > 3 && <span>...</span>}
        </div>
      )}
      {currentPage > 1 && (
        <Button
          variant="secondary"
          onClick={() => onChangePage(currentPage - 1)}
        >
          {currentPage - 1}
        </Button>
      )}
      <div className={styles.currentPageButton}>
        <Button onClick={() => {}}>{currentPage}</Button>
      </div>
      {lastPage && currentPage < lastPage && (
        <Button
          variant="secondary"
          onClick={() => onChangePage(currentPage + 1)}
        >
          {currentPage + 1}
        </Button>
      )}
      {lastPage && currentPage + 1 < lastPage && (
        <div className={styles.firstPageButton}>
          {currentPage + 2 < lastPage && <span>...</span>}
          <Button variant="secondary" onClick={() => onChangePage(lastPage)}>
            {lastPage}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
