type Props = {
  rotation: string
  left?: string
  right?: string
  top?: string
  bottom?: string
}

export function PawPrint({ rotation, left, right, top, bottom }: Props) {
  return (
    <div
      className={`absolute opacity-1 ${rotation} ${left} ${right} ${top} ${bottom}  animation w-[17%] h-[17%]`}
    >
      <div className="pad w-[23.333%] h-[23.666%] rotate-[82deg] left-[30.333%] top-[17.666%]"></div>
      <div className="pad w-[8.333%] h-[9%] rotate-[50deg] left-[48.333%] top-[9.333%]"></div>
      <div className="pad w-[8.333%] h-[9%] rotate-[65deg] left-[58%] top-[16.666%]"></div>
      <div className="pad w-[8.333%] h-[9%] rotate-[98deg] left-[59.333%] top-[29%] absolute"></div>
      <div className="pad w-[8.333%] h-[9%] rotate-[140deg] left-[52.666%] top-[39%] absolute"></div>
    </div>
  )
}


/* ${left && `left-[${left}]`}
      ${right && `right-[${right}]`} 
      ${top && `top-[${top}]`} 
      ${bottom && `bottom-[${bottom}]`}
      
      right-[${right}px] left-[${left}px] top-[${top}px] bottom-[${bottom}px]
      
      animate-[walk_3s_linear_infinite]
      */
