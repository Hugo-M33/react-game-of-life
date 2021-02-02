import { useState, useEffect, useReducer, useCallback, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Cell from "./Cell";
import { produce } from "immer";
import { FaPlay, FaPause } from 'react-icons/fa'

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

const StyledControls = styled.aside`
height: 5rem;
display: flex;
align-items: center;
justify-content: space-around;
background: #0091AD;

`

const gridReducer = (grid, action) => {
  switch (action.type) {
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
          for (let nI = i - 1; nI <= i + 1; nI++) {
            for (let nJ = j - 1; nJ <= j + 1; nJ++) {
              if (nI >= 0 && nI < 30 && nJ >= 0 && nJ < 50 && grid[nI][nJ] && (`${nI}-${nJ}` !== `${i}-${j}`)) { neighboursCount++ }
            }

          }
          if (neighboursCount === 3 && !grid[i][j]) { newGrid[i][j] = true }
          else if (neighboursCount >= 2 && neighboursCount <= 3 && grid[i][j]) { newGrid[i][j] = true }
          else { newGrid[i][j] = false }
        })
      })
      return newGrid;
    case "randomGrid":
      let randGrid = [];
      for (let i = 0; i < 30; i++) {
        randGrid.push(Array.from(Array(50), () => Math.floor(Math.random() * Math.floor(2)) ? true : false));
      }
      console.log(randGrid);
      return randGrid;
  }
}

const Grid = ({ rowsCount, colsCount }) => {
  const [speed, setSpeed] = useState(2000);
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const initialGrid = () => {
    const rows = [];
    for (let i = 0; i < rowsCount; i++) {
      rows.push(Array.from(Array(colsCount), () => false));
    }
    return rows;
  }
  const [alive, setAlive] = useState(false);
  const aliveRef = useRef(alive);
  aliveRef.current = alive
  const [grid, dispatch] = useReducer(gridReducer, initialGrid());
  const live = useCallback(() => {
    console.log(alive);
    if (!aliveRef.current) {
      return;
    } else {
      dispatch({ type: "nextGen" });
      setTimeout(live, speedRef.current)
    }
  },
    []);

  return (
    <>
      <StyledControls><button onClick={() => dispatch({ type: "nextGen" })}>next Generation</button>
        <button onClick={() => dispatch({ type: "randomGrid" })}>random Grid</button>
        {alive ? <FaPause color="white" onClick={() => { setAlive(!alive); aliveRef.current = !alive; live() }} size={32} /> : <FaPlay color="white" onClick={() => { setAlive(!alive); aliveRef.current = !alive; live() }} size={32} />}

        <input id="typeinp" onChange={e => { setSpeed(2000 - e.target.value); speedRef.current = 2000 - e.target.value; console.log(speedRef.current) }} type="range" min="0" max="1950" defaultValue="0" step="50" /></StyledControls>
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
    </>
  );
};

export default Grid;
