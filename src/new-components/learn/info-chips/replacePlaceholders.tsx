// Replaces placeholders in a text. The placeholder should be inside curly braces.
export function replacePlaceholders(
  text: string,
  map: { [key: string]: string }
) {
  for (const key in map) {
    text = text.replace(new RegExp('\\{' + key + '\\}', 'gm'), map[key])
  }

  return text
}
