import * as uuid from 'uuid/v1'

export { uuid }

const months = {
  January: 'января',
  February: 'февраля',
  March: 'марта',
  April: 'апреля',
  May: 'мая',
  June: 'июня',
  July: 'июля',
  August: 'августа',
  September: 'сентября',
  October: 'октября',
  November: 'ноября',
  December: 'декабря',
}

export const localDate = date => {
  const match = date.match(/(\d{2})\s(\w+)\s(\d{4})/)
  return `${match[1]} ${months[match[2]]} ${match[3]}`
}
