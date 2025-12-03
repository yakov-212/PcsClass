import dayjs from 'dayjs'
export function setupCounter(element) {
  let count = dayjs();
  
  const setCounter = (count) => {
    const counter = count
    element.innerHTML = `today is ${counter.format('dddd, MMMM D, YYYY')}`
  }
  element.addEventListener('click', () => {
    count = count.add(1,'month')
    setCounter(count)
  })
  setCounter(count)
}
