# DDD (Domain-driven Design)

Design dirigido à domínio

## Domínio

 - Domain Experts
   - Conversa
 - Linguagem Obíqua

- Usuário
  - Cliente
  - Fornecedor
  - Atendente
  - Barman

- Agregados
- Value Objects
- Eventos de dominio
- Subdominios (Bounded Contexts)
- Entidades
- Casos de uso

# Conceitos
- Aggregate
- WatchedList

## Exemplo
- Order -> OrderItem[]
- Order -> Shipping

- Question -> Attachment[]

### Criação
- Titulo
- Conteúdo
- Anexos (3)

### Edição
- Titulo
- Conteúdo

- Adicionar um novo anexo (create)
- Remover o segundo anexo que tinha sido criado previamente (delete)
- Editar um anexo existente (update)

# Subdominios
 - core: o que da dinheiro
 - Supporting: Da suporte para o core funcionar
 - Generic: Voce precisa, mas não são tão importantes

## Exemplos
### Core
- Compra
- Catálogo
- Pagamento
- Entrega

### Supporting
- Estoque
  
### Generic
- Notificação de cliente
- Promoções
- Chat
  
  