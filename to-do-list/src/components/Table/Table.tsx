import Loader from "../Loader/Loader";
import styles from "./styles.module.css";

export type Header = {
  title: string;
  property: string;
  type?: "text" | "component";
};

type ComponentProps<Headers extends Header[]> = {
  headers: Headers; // Заголовки, которые передаются
  rows: { [key: string]: any }[]; // Типизируем значения на основе заголовков
  isLoading?: boolean;
};

const Table = (props: ComponentProps<Header[]>) => {
  const { headers, rows, isLoading } = props;
  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <table className={styles.commonTable}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th className={styles.titles}>{header.title}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <div className={styles.tableContent}>
        {isLoading && (
          <div className={styles.emptyListBlock}>
            <Loader scale={2} color="blue" />
          </div>
        )}
        {!isLoading && rows.length === 0 && (
          <div className={styles.emptyListBlock}>Пока что список пуст</div>
        )}
        {!isLoading && rows.length > 0 && (
          <table className={styles.commonTable}>
            <tbody>
              {rows.map((rowData) => (
                <tr>
                  {headers.map((header) => (
                    <td className={styles.rows}>
                      {(!header.type || header.type === "text") && (
                        <p>{rowData[header.property]}</p>
                      )}
                      {header.type === "component" && rowData[header.property]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;
