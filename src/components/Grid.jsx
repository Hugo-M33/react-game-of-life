import { useState, useEffect, useReducer } from "react";
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

const gridReducer = (grid, action) => {
  switch(action.type) {
    case "toggleCell":
      return produce(grid, gridCopy => {
        gridCopy[action.payload.row][action.payload.column] = !grid[action.payload.row][action.payload.column];
      });
      case "nextGen":
          const newGrid = [];
          for (let x = 0; x < 30; x++) {
            newGrid.push(Array.from(Array(50), () => undefined));
          }
          grid.forEach((row, i) => {
            row.forEach((cell, j) => {
              let neighboursCount = 0
              for (let nI = i-1; nI <= i+1; nI++) {
                for (let nJ = j-1; nJ <= j+1; nJ++) {
                  if (nI >= 0 && nI < 30 && nJ >= 0 && nJ < 50 && grid[nI][nJ] && (`${nI}-${nJ}` !== `${i}-${j}`)) {neighboursCount++}
                }
                
              }
              if (neighboursCount === 3 && !grid[i][j]) {newGrid[i][j] = true}
              else if (neighboursCount >= 2 && neighboursCount <= 3 && grid[i][j]) {newGrid[i][j] = true}
              else {newGrid[i][j] = false}
            })
          })
        return newGrid;
      }
}

const Grid = ({ rowsCount, colsCount }) => {

  const initialGrid = () => {
    const rows = [];
    for (let i = 0; i < rowsCount; i++) {
      rows.push(Array.from(Array(colsCount), () => false));
    }
    console.log(rows);
    return rows;
  }

  const [grid, dispatch] = useReducer(gridReducer, initialGrid())
  console.log(grid);

  return (
    <>
    <StyledGrid rowsCount={rowsCount} colsCount={colsCount}>
      {grid.map((rows, i) =>
        rows.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            row={i}
            column={j}
            value={grid[i][j]}
            dispatch={dispatch}
          ></Cell>
        ))
      )}
    </StyledGrid>
    <button onClick={() => dispatch({type: "nextGen"})}>nextGen</button>
    </>
  );
};

export default Grid;
