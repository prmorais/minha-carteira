import React, {useMemo} from 'react';
import CountUp from 'react-countup';

import {Container} from './stayled'

import dolarImg from '../../assets/dolar.svg';
import arrowDownImg from '../../assets/arrow-down.svg';
import arrowUpImg from '../../assets/arrow-up.svg';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerLabel: string;
    icon: "dolar" | "arrowUp" | "arrowDown";
    color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
        title,
        amount,
        footerLabel,
        icon,
        color
}) => {

    const iconSelected = useMemo(() => {
        switch (icon) {
            case "dolar":
                return dolarImg;
            case "arrowUp":
                return arrowUpImg;
            case "arrowDown":
                return arrowDownImg;
        }
    }, [icon]);

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp
                    end={amount}
                    prefix="R$ "
                    separator="."
                    decimal=","
                    decimals={2}
                />
            </h1>
            <small>{footerLabel}</small>
            <img src={iconSelected} alt={title}/>
        </Container>
    );
};

export default WalletBox;