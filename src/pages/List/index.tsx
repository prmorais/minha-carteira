import React, {useMemo} from "react";

import {Container, Content, Filters} from './styled'
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

interface IRouteParams {
   match: {
      params: {
         type: string;
      }
   }
}

const List: React.FC<IRouteParams> = ({ match }) => {

   const { type } = match.params;

   const properties = useMemo(() => {
      return type === 'entry-balance' ? {
         title: 'Entradas',
         lineColor: '#f7931b'
      } : {
         title: 'Saídas',
         lineColor: '#E44c4e'
      }
   }, [type])

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
           <HistoryFinanceCard
               tagColor="#e44c4e"
               title="Conta de Luz"
               subtitle="30/09/2020"
               amount="R$ 96,68"
           />
       </Content>
   </Container>
  );
};

export default List;
