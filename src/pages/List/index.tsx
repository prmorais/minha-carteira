import React from "react";

import {Container} from './styled'
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

const List: React.FC = () => {

   const options = [
      { value: 'Paulo', label: 'Paulo'},
      {value: 'Fernanda', label: 'Fernanda'},
      {value: 'Patricia', label: 'Patricia'},
   ];

  return (
   <Container>
      <ContentHeader title="Saídas" lineColor="#e44c4e">
         <SelectInput options={options} />
      </ContentHeader>
   </Container>
  );
};

export default List;
