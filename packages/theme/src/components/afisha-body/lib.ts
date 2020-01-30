import moment from 'moment'
import 'moment/locale/ru'

function getDiff(date) {
  return Math.ceil(moment().diff(moment(date), 'days', true))
}

export function isSameDay(date1: string, date2: string): boolean {
  return Math.ceil(moment(date2).diff(moment(date1), 'days', true)) === 0
}

export function isToday(date: string): boolean {
  return getDiff(date) === 0
}

export function isTomorrow(date: string): boolean {
  return getDiff(date) === -1
}

export function isInFuture(date: string): boolean {
  return getDiff(date) <= 0
}

export function formatDate(date: string): string {
  moment.locale('ru', {
    calendar : {
      lastDay : '[вчера]',
      sameDay : '[сегодня]',
      nextDay : '[завтра]',
      lastWeek : '[прошл.] dd., DD MMMM',
      nextWeek : 'dd., DD MMMM',
      sameElse : 'DD MMMM',
    }
  })
    
  return moment(date).calendar()
}
