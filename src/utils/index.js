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

const monthsIndex = {
  '01': 'января',
  '02': 'февраля',
  '03': 'марта',
  '04': 'апреля',
  '05': 'мая',
  '06': 'июня',
  '07': 'июля',
  '08': 'августа',
  '09': 'сентября',
  '10': 'октября',
  '11': 'ноября',
  '12': 'декабря',
}

export const localDate = date => {
  const match = date.match(/(\d{2})\s(\w+)\s(\d{4})/)
  return `${match[1]} ${months[match[2]]} ${match[3]}`
}

export const toLocalDate = date => {
  const match = date.match(/(\d{4})-(\d{2})-(\d{2})/)
  return `${match[3]} ${monthsIndex[match[2]]} ${match[1]}`
}

const categories = {
  reviews: 'ревью',
  analitics: 'аналитика',
  discussions: 'дискуссии',
  persons: 'персона',
  palces: 'места',
  videos: 'видео',
  zins: 'журнал',
}

export const getCategory = x => categories[x]
