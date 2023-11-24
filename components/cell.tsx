interface CellProps {
   row: number;
   col: number;
   value?: number;
   onClickEvent: (row: number, col: number) => void;
}

export default function Cell(props: CellProps){
   return(
      <div className="cell" onClick={() => props.onClickEvent(props.row, props.col)}>
      { props.value === -10 ? "" 
         : props.value === 0 ? "O" 
         : "X"}
      </div>
   )
}