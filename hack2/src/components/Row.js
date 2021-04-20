import Grid from '../components/Grid'
export default function Row (props) {
    const row_vector = props.row_vector;
    const row_idx = props.row_idx;
    return (
        <tr>
          {row_vector.map((col, col_idx) => (<Grid col_idx={col_idx} row_idx={row_idx} value={col}/>))}
        </tr>
    );
};
