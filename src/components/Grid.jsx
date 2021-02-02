import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Cell from "./Cell";
import { produce } from "immer";

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.colsCount}, 1fr);
  grid-template-rows: repeat(
    ${(props) => props.rowsCount},
    ${(props) =>
      (window.innerWidth - 5 * (props.colsCount - 1)) / props.colsCount}px
  );
  gap: 5px;
  background: linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114));
  border: solid 5px;
  border-image: linear-gradient(90deg, #fc466b 0%, #3f5efb 100%);
  box-sizing: border-box;
`;

const StyledCell = styled(Cell)`
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
`;

const Grid = ({ rowsCount, colsCount }) => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < rowsCount; i++) {
      rows.push(Array.from(Array(colsCount), () => false));
    }
    console.log(rows);
    return rows;
  });

  const toggleCell = (row, column) => {
    setGrid(
      produce(grid, (gridCopy) => {
        gridCopy[row][column] = !grid[row][column];
      })
    );
  };

  return (
    <StyledGrid rowsCount={rowsCount} colsCount={colsCount}>
      {grid.map((columns, i) =>
        columns.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            value={grid[i][j]}
            toggleCell={() => toggleCell(i, j)}
          ></Cell>
        ))
      )}
    </StyledGrid>
  );
};

export default Grid;
