import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

const StyledGrid = styled.div`
display: grid;
grid-template-columns: repeat(${props => props.colsCount}, 1fr);
grid-template-rows: repeat(${props => props.rowsCount}, ${props => (window.innerWidth - 5*(props.colsCount-1)) /props.colsCount}px);
gap: 5px;
background: black;
`

const StyledCell = styled(motion.div)`
    background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
`

const Grid = ({rowsCount, colsCount}) => {
    const [grid, setGrid] = useState([]);
    useEffect(() => {
        setGrid(Array(colsCount).fill(Array(rowsCount).fill(false)));
    }, [rowsCount, colsCount, window.innerWidth])
    return (
        <StyledGrid rowsCount={rowsCount} colsCount={colsCount}>
            {grid.map(columns => columns.map(cell => <StyledCell whileHover={{scale: 1.75}}></StyledCell>))}
        </StyledGrid>
    )
}

export default Grid
