import React, {useEffect, useMemo, useState} from "react";
import {v4} from 'uuid'

import {Container, Content, Filters} from './styled'

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from '../../utils/months';

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

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
   const movimentType  = match.params.type;

   const [data, setData] = useState<IData[]>([]);
   const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
   const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
   const [frequencyFilterSelected, setFrequencyFilterSelected] = useState<string[]>(['recorrente', 'eventual']);

   const pageData = useMemo(() => {
      return movimentType === 'entry-balance' ? {
         title: 'Entradas',
         lineColor: '#f7931b',
         data: gains,
      }
      : {
         title: 'Saídas',
         lineColor: '#E44c4e',
         data: expenses,
      }
   }, [movimentType]);

   const years = useMemo(() => {
      let uniqueYears: number[] = [];

      const { data } = pageData;

         data.forEach(item => {
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
   }, [pageData]);

   const months = useMemo(() => {
      return listOfMonths.map((month, index) => {
         return {
            value: index + 1,
            label: month,
         }
      })
   }, []);

   const handleFrequencyClick = (frequency: string) => {
      const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

      if (alreadySelected >= 0) {
         const filtered = frequencyFilterSelected.filter(value => value !== frequency);
         setFrequencyFilterSelected(filtered);
      } else {
         setFrequencyFilterSelected(prevState => [...prevState, frequency]);
      }
   };

   useEffect(() => {
      const { data } = pageData;

      const filteredData = data.filter(item => {
         const date = new Date(item.date);
         const month = String(date.getMonth() + 1);
         const year = String(date.getFullYear());

         return month === monthSelected &&
             year === yearSelected &&
             frequencyFilterSelected.includes(item.frequency);
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

   },[pageData, monthSelected, yearSelected, frequencyFilterSelected]);

  return (
   <Container>
       <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
           <SelectInput
               options={months}
               onChange={event => setMonthSelected(event.target.value)}
               defaultValue={monthSelected}
           />
           <SelectInput
               options={years}
               onChange={event => setYearSelected(event.target.value)}
               defaultValue={yearSelected}
           />
       </ContentHeader>

      <Filters>
         <button
            type="button"
            className={
               `tag-filter
                tag-filter-recurrent
                ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
            onClick={() => handleFrequencyClick('recorrente')}
         >
            Recorrentes
         </button>

         <button
            type="button"
            className={
               `tag-filter
               tag-filter-eventual
               ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
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
