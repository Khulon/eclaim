


export function parseDate (date) {
    date = new Date(date).toLocaleDateString("en-UK")
    var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var day = parseInt(date.substring(0,2))
    var month = parseInt(date.substring(3,5))
    month = months[month-1]
    var year = date.substring(8,10)
    //console.log(date)
    //console.log(day + ' ' + month + ' ' + year)
    return day + ' ' + month + ' ' + year
  }

export function parseDatePeriod (dateFrom, dateTo) {
    //console.log('hi')
    dateFrom = parseDate(dateFrom)

    dateTo = parseDate(dateTo)

    var final = dateFrom + " - " + dateTo
    return final 
  }