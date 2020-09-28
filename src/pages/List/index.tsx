import React from "react";

import {Container, Content} from './styled'
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

const List: React.FC = () => {

   const options = [
      { value: 'Paulo', label: 'Paulo'},
      {value: 'Fernanda', label: 'Fernanda'},
      {value: 'Patricia', label: 'Patricia'},
   ];

  return (
   <Container>
       <ContentHeader title="Saídas" lineColor="#e44c4e">
           <SelectInput options={options}/>
       </ContentHeader>

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
