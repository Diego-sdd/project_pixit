import React from "react";
import styles from "./styles.module.css";
import { MdDeleteSweep } from "react-icons/md";

interface ButtonProps {
  data: Array<Object>;
  titleData: Array<String>;
  onActions: (id: Number, actions: String) => void;
}

const Table: React.FC<ButtonProps> = ({ data, titleData, onActions }) => {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          {titleData.map((e, k) => (
            <th key={k}>{e}</th>
          ))}
          <th className={styles.actionsTableTh}>Ações</th>
        </tr>
        {data.map((e: any, k) => (
          <tr key={k}>
            {Object.values(e).map((element: any, k: number) => (
              <td key={k}>{element}</td>
            ))}
            <td className={styles.actionsTable}>
              <MdDeleteSweep
                size={16}
                className="icon"
                color="#f45d5d"
                onClick={() => {
                  let id = e?.id;
                  let actions = "deleted";
                  onActions(id, actions);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
