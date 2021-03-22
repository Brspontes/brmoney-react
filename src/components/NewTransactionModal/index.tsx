import React, { FormEvent, useContext, useState } from 'react'
import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outocmeImg from '../../assets/outcome.svg'
import { api } from '../../services/api'
import { TransactionsContext } from '../TransactionsContext'


interface NewTransactionModalProps {
  isOpen: boolean,
  onRequestClose: () => void
}

Modal.setAppElement('#root')

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext)
  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({
      title,
      amount: value,
      category,
      type
    })

    setTitle('')
    setValue(0)
    setCategory('')
    setType('deposit')

    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar Modal"/>
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input placeholder="Título" value={title} onChange={event => setTitle(event.target.value)}/>
        <input placeholder="Valor" type="number" value={value} onChange={event => setValue(Number(event.target.value))}/>

        <TransactionTypeContainer>
          <RadioBox type="button" onClick={() => { setType('deposit') }} isActive={type === 'deposit'} activeColor="green">
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>
          <RadioBox type="button"  onClick={() => { setType('withdraw') }} isActive={type === 'withdraw'} activeColor="red">
            <img src={outocmeImg} alt="Saida"/>
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)} />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}