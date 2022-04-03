// A wrapper that is applied only when condition is met.
const ConditionalWrapper = ({ children, condition, wrapper }) =>  condition ? wrapper(children) : children

export default ConditionalWrapper