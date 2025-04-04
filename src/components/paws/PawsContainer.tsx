import { PawPrint } from "./PawPrint"

// Tailwind uses regex to find classNames so there can't be string interpolation

export async function PawsContainer() {
  const width = 300
  const height = 300
  return (
    <div className={`w-[400px] h-[400px] bg-green-300 relative`}>
      <PawPrint
        rotation={"-rotate-[15deg]"}
        left={"left-[0%]"}
        bottom={"bottom-[-2%]"}
      />
      <PawPrint
        rotation={"-rotate-[15deg]"}
        left={"left-[2%]"}
        bottom={"bottom-[5%]"}
      />
      <PawPrint
        rotation={"rotate-[10deg]"}
        left={"left-[10%]"}
        bottom={"bottom-[10%]"}
      />
      <PawPrint
        rotation={"rotate-[30deg]"}
        left={"left-[15%]"}
        bottom={"bottom-[4%]"}
      />

      <PawPrint
        rotation={"rotate-[20deg]"}
        left={"left-[40%]"}
        bottom={"bottom-[4%]"}
      />
      <PawPrint
        rotation={"-rotate-[15deg]"}
        left={"left-[46%]"}
        bottom={"bottom-[-3%]"}
      />
      <PawPrint
        rotation={"-rotate-[30deg]"}
        left={"left-[52%]"}
        bottom={"bottom-[2%]"}
      />
      <PawPrint
        rotation={"rotate-[0deg]"}
        left={"left-[54%]"}
        bottom={"bottom-[4%]"}
      />


    </div>
  )
}
