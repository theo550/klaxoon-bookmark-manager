function getSeconds(time: number) {
  return time % 60
}

function getMinutes(time: number) {
  return ('0' + (Math.floor(time / 60) - (Math.floor(time / 3600) * 60))).slice(-2)
}

function getHours(time: number) {
  if (time < 3600) {
    return '00'
  } else {
    return Math.floor(time / 3600)
  }
}

export function convertNumberIntoTimer(duration: number) {
  const hours = getHours(duration)
  const minutes = getMinutes(duration)
  const seconds = getSeconds(duration)
  return `${hours}:${minutes}:${seconds}`
}

// Select the good unit for the timer of when you add the element in the app
export function getUnits(day: number, hours: number, minutes: number) {
  if (day > 0) {
    return day > 1 ? 'jours' : 'jour'
  } else if (hours > 0){
    return hours > 1 ? 'heures' : 'heure'
  } else {
    return minutes > 1 ? 'minutes' : 'minute'
  }
}

// Chose if you want to display minutes, hours or day for the timer
export function getAddTime(day: number, hours: number, minutes: number) {
  if (day > 0) {
    return day
  } else if (hours > 0){
    return hours
  } else {
    return minutes
  }
}