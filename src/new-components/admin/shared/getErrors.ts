export function getErrors<T extends string>(errors: { [key in T]: { value: boolean } }) {
  return Object.entries(errors).flatMap(([key, val]) => ((val as { value: boolean }).value ? (key as T) : []))
}
