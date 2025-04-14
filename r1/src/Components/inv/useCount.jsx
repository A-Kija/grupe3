import { useRef } from 'react';

export default function useCount() {

    const invoiceTotals = useRef({
        subtotal: 0,
        vat: 0,
        total: 0
    });

    const invLines = useRef(null);

    const setInvLines = l => {
        invLines.current = l;
    }

    const countLineTotal = (i, number = false) => {
        const price = parseFloat(invLines.current[i].price);
        const quantity = parseInt(invLines.current[i].quantity);
        if (isNaN(price) || isNaN(quantity)) {
            return 0;
        }
        if (number) {
            return (price * quantity); // grazina skaiciu
        }
        return (price * quantity).toFixed(2); // grazina stringa
    }

    const subTotal = _ => {
        let subTotalValue = 0;
        for (let i = 0; i < invLines.current.length; i++) {
            subTotalValue += countLineTotal(i, true);
        }
        invoiceTotals.current.subtotal = subTotalValue;
        return subTotalValue.toFixed(2);
    }

    const vat = _ => {
        const vatValue = invoiceTotals.current.subtotal * 0.21;
        invoiceTotals.current.vat = vatValue;
        return vatValue.toFixed(2);
    }

    const total = _ => {
        const totalValue = invoiceTotals.current.subtotal + invoiceTotals.current.vat;
        invoiceTotals.current.total = totalValue;
        return totalValue.toFixed(2);
    }

    const invTotal = inv => {
        setInvLines(inv.lines);
        subTotal();
        vat();
        return total();
    }


    return { countLineTotal, subTotal, vat, total, setInvLines, invTotal }

}