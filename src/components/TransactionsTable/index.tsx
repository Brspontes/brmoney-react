import { useEffect, useState, useContext } from "react";
import { api } from "../../services/api";
import { TransactionsContext } from "../TransactionsContext";
import { Container } from "./styles";

export function TransactionsTable() {

  const { transaction } = useContext(TransactionsContext)

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