import React, {useEffect, useMemo, useState} from "react";
import {v4} from 'uuid'

import {Container, Content, Filters} from './styled'
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import listOfMonths from '../../utils/months';

interface IRouteParams {
   match: {
      params: {
         type: string;
      }
   }
}

interface IData {
   id: string;
   description: string;
   amountFormatted: string;
   frequency: string;
   dateFormatted: string;
   tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {

   const [data, setData] = useState<IData[]>([]);
   const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
   const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
   const [selectFrequency, setSelectFrequency] = useState<string[]>(['recorrente', 'eventual']);

   const { type } = match.params;
   const properties = useMemo(() => {
      return type === 'entry-balance' ? {
         title: 'Entradas',
         lineColor: '#f7931b'
      } : {
         title: 'Saídas',
         lineColor: '#E44c4e'
      }
   }, [type]);

   const listData = useMemo(() => {
      return type === 'entry-balance' ? gains : expenses;
   }, [type]);

   const years = useMemo(() => {
      let uniqueYears: number[] = [];

      listData.forEach(item => {
         const date = new Date(item.date);
         const year = date.getFullYear();

         if (!uniqueYears.includes(year)) {
            uniqueYears.push(year);
         }
      });

      return uniqueYears.map(year => {
         return {
            value: year,
            label: year,
         }
      });
   }, [listData]);

   const months = useMemo(() => {
      return listOfMonths.map((month, index) => {
         return {
            value: index + 1,
            label: month,
         }
      })
   }, []);

   const handleFrequencyClick = (frequency: string) => {
      const alreadySelected = selectFrequency.findIndex(item => item === frequency);

      if (alreadySelected >= 0) {
         const filtered = selectFrequency.filter(value => value !== frequency);
         setSelectFrequency(filtered);
      } else {
         setSelectFrequency(prevState => [...prevState, frequency]);
      }
   };

   useEffect(() => {
      const filteredData = listData.filter(item => {
         const date = new Date(item.date);
         const month = String(date.getMonth() + 1);
         const year = String(date.getFullYear());

         return month === monthSelected &&
             year === yearSelected &&
             selectFrequency.includes(item.frequency);
      });

      const formattedData = filteredData.map(item => {
         return {
            id: v4(),
            description: item.description,
            amountFormatted: formatCurrency(Number(item.amount)),
            frequency: item.frequency,
            dateFormatted: formatDate(item.date),
            tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#e44c4e'
         }
      });

      setData(formattedData);

   },[listData, monthSelected, yearSelected, selectFrequency]);

   // const months = [
   //    {value: 7, label: 'Julho'},
   //    {value: 5, label: 'Maio'},
   //    {value: 1, label: 'Janeiro'},
   // ];

   // const years = [
   //    {value: 2020, label: 2020},
   //    {value: 2019, label: 2019},
   //    {value: 2018, label: 2018},
   // ];

  return (
   <Container>q
       <ContentHeader title={properties.title} lineColor={properties.lineColor}>
           <SelectInput
               options={months}
               onChange={event => setMonthSelected(event.target.value)}
               defaultValue={monthSelected} />
           <SelectInput
               options={years}
               onChange={event => setYearSelected(event.target.value)}
               defaultValue={yearSelected} />
       </ContentHeader>

      <Filters>
         <button
            type="button"
            className={`tag-filter tag-filter-recurrent
               ${selectFrequency.includes('recorrente') && 'tag-actived'}`}
            onClick={() => handleFrequencyClick('recorrente')}
         >
            Recorrentes
         </button>

         <button
            type="button"
            className={`tag-filter tag-filter-eventual
               ${selectFrequency.includes('eventual') && 'tag-actived'}`}
            onClick={() => handleFrequencyClick('eventual')}
         >
            Eventuais
         </button>
      </Filters>

       <Content>
          {
             data.map(item => (
                <HistoryFinanceCard
                   key={item.id}
                   tagColor={item.tagColor}
                   title={item.description}
                   subtitle={item.dateFormatted}
                   amount={item.amountFormatted}
               />
             ))
          }
       </Content>
   </Container>
  );
};

export default List;
