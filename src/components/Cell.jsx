import {memo} from 'react'
import {motion} from 'framer-motion'


const Cell = memo(({value, toggleCell, column, row, dispatch}) => {
    return (
        <motion.div onMouseLeave={e => e.buttons === 1 && dispatch({type: "toggleCell", payload: {column, row}})} whileHover={{ scale: 1.5, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: "5px" }} onClick={() => dispatch({type: "toggleCell", payload: {column, row}})} style={{ backgroundColor: value ? "#0091AD" : "white"}}>
            
        </motion.div>
    )
})

export default Cell
