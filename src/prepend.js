export default (target, element) => {
  if (target.firstChild) {
    target.insertBefore(element, target.firstChild)
  } else {
    target.appendChild(element)
  }
}

