import { useState , useEffect} from 'react'

import Cell from "./Components/Cell/Cell"

import './App.css'

function App() {
  const [cells, setCells] = useState([ '' , '' , '' , '' , '' , '' , '' , '' , '' ])
  const [go, setGo] = useState('circle')
  const [winningMessage, setWinningMessage] = useState(null)
  // const [GameOver , setCellsFlag]

  const message = <span>It's now <span className={`${go === 'circle' ? 'text-sky-800' : 'text-red-700'}`}>{go}'s</span> go.</span>

  const reset = () =>{
    setCells([ '' , '' , '' , '' , '' , '' , '' , '' , '' ])
    setGo('circle')
    setWinningMessage(null)
  }

  const checkScore = () => {
    const winningCombos = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ]

    let circleWinsFlag = false
    let crossWinsFlag = false

    winningCombos.forEach(combo => {
      let circleWins = combo.every(cell => cells[cell] === 'circle')
      if(circleWins){
        circleWinsFlag = true
        setWinningMessage('Circle Wins!')
        return
      }
    })

    winningCombos.forEach(combo => {
      let crossWins = combo.every(cell => cells[cell] === 'cross')
      if(crossWins){
        crossWinsFlag = true
        setWinningMessage('Cross Wins!')
        return
      }
    })

    let emptyCellsNumber = cells.filter(cell => !cell.length).length
    if(!emptyCellsNumber && !crossWinsFlag && !circleWinsFlag){
      setWinningMessage('Draw!')
    }
  }

  useEffect(() => {
    checkScore()
  } , [cells])

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 bg-sky-500">
      <div className="w-[300px] flex items-center justify-center gap-5">
        {winningMessage && (
          <button className="px-4 py-2 bg-sky-800 translate-y-0 hover:bg-sky-700 hover:-translate-y-1 transition-all text-white text-xl font-bold flex items-center justify-center gap-2 rounded-md" onClick={reset}>
            Reset
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 stroke-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        )}
        <div className="text-sky-100 font-bold text-2xl">{winningMessage || message}</div>
      </div>
      <div className="w-[300px] h-[300px] flex flex-wrap ">
        {cells.map((cell , index) => (
          <Cell 
            key={index}
            id={index}
            cell={cell}
            go={go}
            setGo={setGo}
            cells={cells}
            setCells={setCells}
            winningMessage={winningMessage}
          />
        ))}
      </div>
    </div>
  )
}

export default App
