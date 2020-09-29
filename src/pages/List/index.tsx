import React, {useEffect, useMemo, useState} from "react";

import {Container, Content, Filters} from './styled'
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
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
   id: number;
   description: string;
   amountFormatted: string;
   frequency: string;
   dateFormatted: string;
   tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {

   const [data, setData] = useState<IData[]>([]);

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

   useEffect(() => {
      const response = listData.map(item => {
         return {
            id: Math.random() * data.length,
            description: item.description,
            amountFormatted: item.amount,
            frequency: item.frequency,
            dateFormatted: item.date,
            tagColor: item.frequency === 'recorrente' ? '#e44c4e'  : '#4e41f0'
         }
      })
      setData(response);
   },[listData]);

   const months = [
      {value: 7, label: 'Julho'},
      {value: 8, label: 'Agosto'},
      {value: 9, label: 'Setembro'},
   ];

   const years = [
      {value: 2020, label: 2020},
      {value: 2019, label: 2019},
      {value: 2018, label: 2018},
   ];

  return (
   <Container>
       <ContentHeader title={properties.title} lineColor={properties.lineColor}>
           <SelectInput options={months}/>
           <SelectInput options={years}/>
       </ContentHeader>

      <Filters>
         <button
            type="button"
            className='tag-filter tag-filter-recurrent'
         >
            Recorrentes
         </button>

         <button
            type="button"
            className='tag-filter tag-filter-eventual'
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
