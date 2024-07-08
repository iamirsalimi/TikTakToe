const Cell = ({id , cell , go, setGo , cells , setCells , winningMessage}) => {
    const handleCheck = e => {
        if(!winningMessage){
            let isTaken = e.target.firstChild?.classList.contains('circle') || 
            e.target.firstChild?.classList.contains('cross') || 
            e.target.classList.contains('circle') || 
            e.target.classList.contains('cross')
        
            if(!isTaken){
                if(go === 'circle'){
                    e.target.firstChild.classList.add('circle')
                    handleCellChange('circle')
                    setGo('cross')
                }
                if(go === 'cross'){
                    e.target.firstChild.classList.add('cross')
                    handleCellChange('cross')
                    setGo('circle')
                }

            }
        }
    }
  

    const handleCellChange = className => {
        let nextCells = cells.map((cell , index) => {
            if(index === id){
                return className
            } else {
                return cell
            }
        })

        setCells(nextCells)
    }

    // console.log(cells)

    return (
    <div className="square w-[100px] h-[100px] flex items-center justify-center cursor-pointer bg-sky-100 scale-100 hover:bg-sky-300 hover:scale-110 hover:!border-none hover:z-10 transition-all ease-in-out duration-200" id={id} onClick={handleCheck}>
        <div className={cell}></div>
    </div>
  )
}

export default  Cell