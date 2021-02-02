import {motion} from 'framer-motion'


const Cell = ({value, toggleCell}) => {
    return (
        <motion.div onMouseLeave={e => e.buttons === 1 && toggleCell()} whileHover={{ scale: 1.75 }} onClick={toggleCell} style={{ backgroundColor: value ? "#0091AD" : "white"}}>
            
        </motion.div>
    )
}

export default Cell
