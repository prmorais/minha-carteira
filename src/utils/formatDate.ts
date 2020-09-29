import moment from 'moment';

const formatDate = (date: string): string => {

   return moment(date).format('DD/MM/YYYY');

   // const dateFormatted = new Date(date);
   //
   // const year = dateFormatted.getFullYear();
   //
   // const month = dateFormatted.getMonth() + 1 > 9
   //    ? dateFormatted.getMonth() + 1
   //    : `0${dateFormatted.getMonth() + 1}`;
   //
   // const day = dateFormatted.getDay() > 9
   //    ? dateFormatted.getDay()
   //    : `0${dateFormatted.getDay()}`
   //
   // return `${day}/${month}/${year}`;
};

export default formatDate;
