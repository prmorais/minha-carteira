import React from "react";

import {Container} from './styled'
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

const Dashboard: React.FC = () => {

   const options = [
      { value: 'Paulo', label: 'Paulo'},
      {value: 'Fernanda', label: 'Fernanda'},
      {value: 'Patricia', label: 'Patricia'},
   ];

  return (
   <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
         <SelectInput options={options} onChange={() => {}} />
      </ContentHeader>
   </Container>
  );
};

export default Dashboard;
