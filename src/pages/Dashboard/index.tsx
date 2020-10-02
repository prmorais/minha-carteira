import React, {useMemo, useState} from "react";

import {Container, Content} from './styled'
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";

import listOfMonths from "../../utils/months";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
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
    }, []);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        })
    }, []);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('Invalid month value. Is accept 0 - 12.')
        }
    };

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('Invalid year value. Is accept integer numbers.')
        }
    };

  return (
   <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
          <SelectInput
              options={months}
              onChange={event => handleMonthSelected(event.target.value)}
              defaultValue={monthSelected}
          />
          <SelectInput
              options={years}
              onChange={event => handleYearSelected(event.target.value)}
              defaultValue={yearSelected}
          />
      </ContentHeader>

       <Content>
           <WalletBox
               title="Saldo"
               amount={150.00}
               footerLabel="Atualizado com base nas entradas e saídas"
               icon="dolar"
               color="#4e41f0"
           />
           <WalletBox
               title="entradas"
               amount={5000.00}
               footerLabel="Atualizado com base nas entradas e saídas"
               icon="arrowUp"
               color="#f7931b"
           />
           <WalletBox
               title="saídas"
               amount={4850.00}
               footerLabel="Atualizado com base nas entradas e saídas"
               icon="arrowDown"
               color="#e44c4e"
           />
       </Content>
   </Container>
  );
};

export default Dashboard;
