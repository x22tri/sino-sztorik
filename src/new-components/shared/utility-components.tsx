export function Conditional({
  when,
  children,
}: {
  when: any
  children: JSX.Element
}) {
  return !!when ? children : null
}
