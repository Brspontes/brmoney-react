import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionsTable() {

  interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string
  }

  const [transaction, setTransaction] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => {
        console.log(response)
        setTransaction(response.data.transactions)
      })
  }, [])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map(tr => {
            return (
            <tr key={tr.id}>
              <td>{tr.title}</td>
              <td className={tr.type}>{ new Intl.NumberFormat('pt-Br', {
                style: 'currency',
                currency: 'BRL'
              }).format(tr.amount)}</td>
              <td>{tr.category}</td>
              <td>{ new Intl.DateTimeFormat('pt-BR').format(new Date(tr.createdAt)) }</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}