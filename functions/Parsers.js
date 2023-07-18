
/**
 * parseDate Function
 *
 * Converts a type date to a formatted date string in "dd MMM yy" format.
 *
 * @param {string} date - The date string to be parsed.
 * @returns {string} - The parsed date string in "dd MMM yy" format.
 */
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

/**
 * parseDatePeriod Function
 *
 * Converts date strings representing a date range to a formatted string in "dd MMM yy - dd MMM yy" format.
 *
 * @param {string} dateFrom - The start date of the date range.
 * @param {string} dateTo - The end date of the date range.
 * @returns {string} - The formatted date range string in "dd MMM yy - dd MMM yy" format.
 */
export function parseDatePeriod (dateFrom, dateTo) {
    //console.log('hi')
    dateFrom = parseDate(dateFrom)

    dateTo = parseDate(dateTo)

    var final = dateFrom + " - " + dateTo
    return final 
  }
