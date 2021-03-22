import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode
}

interface TranscationsContextData {
  transaction: Transaction[],
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

export const TransactionsContext = createContext<TranscationsContextData>({} as TranscationsContextData);

export function TransactionsProvider({children} : TransactionsProviderProps) {
  const [transaction, setTransaction] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => {
        console.log(response)
        setTransaction(response.data.transactions)
      })
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })

    setTransaction([
      ...transaction,
      response.data.transactions
    ])
  }

  return (
    <TransactionsContext.Provider value={{transaction, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}