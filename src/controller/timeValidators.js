import moment from 'moment';

// export const startTimeValidate = async (startTime, slotEndTime, openingTime, closingTime) => {
//   const endTimeTest = moment(slotEndTime).format('HH:mm');
//   const endString = endTimeTest.split(':');
//   const endSeconds = parseInt(endString[1] * 60 + endString[0] * 3600, 10);
//   const Start = moment(startTime).format('HH:mm');
//   const str2 = Start.split(':');
//   const totalSeconds1 = parseInt(str2[1] * 60 + str2[0] * 3600, 10);
//   const OpenT = openingTime.split(':');
//   const openhour = OpenT[0];
//   const opensec = OpenT[1];
//   const openminute = opensec.substring(0, 2);
//   const openAmPm = opensec.substring(2, 4);
//   const CloseT = closingTime.split(':');
//   const closehour = CloseT[0];
//   const closesec = CloseT[1];
//   const closeminute = closesec.substring(0, 2);
//   const closeAmPm = closesec.substring(2, 4);
//   if (openAmPm === 'AM') {
//     if (closeAmPm === 'AM') {
//       const Closing = parseInt(closeminute * 60 + closehour * 3600, 10);
//       const Opening = parseInt(openminute * 60 + openhour * 3600, 10);
//       if (totalSeconds1 >= Opening && totalSeconds1 <= Closing) {
//         setSlotStartTime(startTime);
//         if (totalSeconds1 > endSeconds) {
//           setSlotEndTime(startTime);
//         }
//       } else {
//         swal({
//           text: `Shop Opening Time : ${openingTime} Closing Time : ${closingTime} \nSelect Timing within Working Hours!`,
//           // icon: 'error',
//           dangerMode: true,
//         });
//       }
//     } else if (closeAmPm === 'PM') {
//       const Closing = parseInt(closeminute * 60 + closehour * 3600 + 12 * 3600, 10);
//       const Opening = parseInt(openminute * 60 + openhour * 3600, 10);
//       if (totalSeconds1 >= Opening && totalSeconds1 <= Closing) {
//         setSlotStartTime(startTime);
//         if (totalSeconds1 > endSeconds) {
//           setSlotEndTime(startTime);
//         }
//       } else {
//         swal({
//           text: `Shop Opening Time : ${openingTime} Closing Time : ${closingTime} \nSelect Timing within Working Hours!`,
//           // icon: 'error',
//           dangerMode: true,
//         });
//       }
//     }
//   } else if (openAmPm === 'PM') {
//     if (closeAmPm === 'AM') {
//       const Closing = parseInt(closeminute * 60 + closehour * 3600, 10);
//       const Opening = parseInt(openminute * 60 + openhour * 3600 + 12 * 3600, 10);
//       if (totalSeconds1 >= Opening && totalSeconds1 <= Closing) {
//         setSlotStartTime(startTime);
//         if (totalSeconds1 > endSeconds) {
//           setSlotEndTime(startTime);
//         }
//       } else {
//         swal({
//           text: `Shop Opening Time : ${openingTime} Closing Time : ${closingTime} \nSelect Timing within Working Hours!`,
//           // icon: 'error',
//           dangerMode: true,
//         });
//       }
//     } else if (closeAmPm === 'PM') {
//       const Closing = parseInt(closeminute * 60 + closehour * 3600 + 12 * 3600, 10);
//       const Opening = parseInt(openminute * 60 + openhour * 3600 + 12 * 3600, 10);
//       if (totalSeconds1 >= Opening && totalSeconds1 <= Closing) {
//         setSlotStartTime(startTime);
//         if (totalSeconds1 > endSeconds) {
//           setSlotEndTime(startTime);
//         }
//       } else {
//         swal({
//           text: `Shop Opening Time : ${openingTime} Closing Time : ${closingTime} \nSelect Timing within Working Hours!`,
//           // icon: 'error',
//           dangerMode: true,
//         });
//       }
//     }
//   }
// };

export const DateValidate = async (start, end) => {
  const sampleStartDate = moment(start).format('YYYY-MM-DD');
  const sampleEndDate = moment(end).format('YYYY-MM-DD');

  if (sampleStartDate > sampleEndDate) {
    return true;
  }
  return false;
};
