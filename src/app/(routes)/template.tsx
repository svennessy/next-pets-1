// difference between layout is that it rerenders every time
// layout only renders when app loads

export default async function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // animate-appear is a custom property from template file
    <div className="animate-appear">{children}</div>
  )
}
