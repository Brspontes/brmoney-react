import { useState } from 'react'
import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'
import Modal from 'react-modal'

interface HeaderProps {
  onOpenNewReansactionModal: () => void
}

export function Header ({ onOpenNewReansactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="br money"/>
        <button type="button" onClick={onOpenNewReansactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}