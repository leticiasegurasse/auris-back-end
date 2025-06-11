# Documentação dos Modelos do Projeto

Este documento contém a documentação detalhada de todos os modelos utilizados no projeto.

## Índice
- [UserPlan](#userplan)
- [Therapist](#therapist)
- [Log](#log)
- [PatientReport](#patientreport)
- [Agenda](#agenda)
- [Patient](#patient)
- [Anamnese](#anamnese)
- [Exercise](#exercise)
- [Category](#category)
- [User](#user)
- [TherapistEvaluation](#therapistevaluation)
- [PatientResponse](#patientresponse)
- [PatientExercise](#patientexercise)
- [Message](#message)

## UserPlan

O modelo `UserPlan` representa o plano de assinatura de um usuário no sistema. Este modelo é utilizado para gerenciar as informações de pagamento e status da assinatura do usuário.

### Estrutura do Modelo

```typescript
interface IUserPlan {
  stripe_subscription_id: string;    // ID da assinatura no Stripe
  payment_status: 'pago' | 'pendente' | 'falhou';  // Status do pagamento
  created_at: Date;                  // Data de criação do registro
  updated_at: Date;                  // Data da última atualização
}
```

### Campos

- **stripe_subscription_id**: String obrigatória e única que armazena o ID da assinatura no Stripe
- **payment_status**: Enum que pode ter os valores 'pago', 'pendente' ou 'falhou', com valor padrão 'pendente'
- **created_at**: Data de criação do registro, preenchida automaticamente
- **updated_at**: Data da última atualização do registro, preenchida automaticamente

### Uso

Este modelo é utilizado para:
- Rastrear o status de pagamento das assinaturas
- Gerenciar a integração com o sistema de pagamentos Stripe
- Manter o histórico de assinaturas dos usuários

## Therapist

O modelo `Therapist` representa um fonoaudiólogo no sistema. Este modelo armazena informações específicas do profissional, incluindo suas credenciais e dados de assinatura.

### Estrutura do Modelo

```typescript
interface ITherapist {
  userId: mongoose.Types.ObjectId;    // Referência ao usuário
  crfa: string;                       // Número do registro profissional
  stripeSubscriptionStatus: string;   // Status da assinatura no Stripe
  stripeCustomerId: string;           // ID do cliente no Stripe
  stripeSubscriptionId: string;       // ID da assinatura no Stripe
}
```

### Campos

- **userId**: Referência obrigatória ao modelo User (ObjectId)
- **crfa**: String obrigatória que armazena o número do registro profissional do fonoaudiólogo
- **stripeSubscriptionStatus**: Status atual da assinatura no Stripe
- **stripeCustomerId**: ID do cliente no sistema Stripe
- **stripeSubscriptionId**: ID da assinatura no sistema Stripe

### Uso

Este modelo é utilizado para:
- Gerenciar informações profissionais dos fonoaudiólogos
- Controlar assinaturas e pagamentos dos profissionais
- Estabelecer relação entre usuários e suas credenciais profissionais

### Relacionamentos

- Possui relação com o modelo `User` através do campo `userId`

## Log

O modelo `Log` é responsável por registrar todas as ações realizadas no sistema, mantendo um histórico de alterações para auditoria e rastreamento.

### Estrutura do Modelo

```typescript
interface ILog {
  action: 'CREATE' | 'UPDATE' | 'DELETE';  // Tipo da ação realizada
  entity: string;                          // Nome da entidade afetada
  entityId: mongoose.Types.ObjectId;       // ID da entidade afetada
  changes: any;                            // Alterações realizadas
  timestamp: Date;                         // Data e hora da ação
  user: mongoose.Types.ObjectId;           // Usuário que realizou a ação
}
```

### Campos

- **action**: Enum obrigatório que pode ter os valores 'CREATE', 'UPDATE' ou 'DELETE'
- **entity**: String obrigatória que identifica o tipo de entidade afetada
- **entityId**: ObjectId obrigatório que referencia a entidade específica afetada
- **changes**: Campo obrigatório do tipo Mixed que armazena as alterações realizadas
- **timestamp**: Data e hora da ação, preenchida automaticamente
- **user**: Referência obrigatória ao modelo User que realizou a ação

### Uso

Este modelo é utilizado para:
- Manter um histórico de todas as alterações no sistema
- Realizar auditorias de ações
- Rastrear mudanças em entidades específicas
- Identificar quem realizou cada ação

### Relacionamentos

- Possui relação com o modelo `User` através do campo `user`

## PatientReport

O modelo `PatientReport` representa os relatórios e avaliações feitos sobre os pacientes, podendo ser tanto anamneses quanto evoluções do tratamento.

### Estrutura do Modelo

```typescript
interface IPatientReport {
  userId: mongoose.Types.ObjectId;    // Referência ao usuário (profissional)
  patientId: mongoose.Types.ObjectId; // Referência ao paciente
  type: 'anamnese' | 'evolucao';     // Tipo do relatório
  report: string;                     // Conteúdo do relatório
  observation: string;                // Observações adicionais
  createdAt: Date;                    // Data de criação
}
```

### Campos

- **userId**: Referência obrigatória ao modelo User (profissional que criou o relatório)
- **patientId**: Referência obrigatória ao modelo Patient
- **type**: Enum obrigatório que pode ser 'anamnese' ou 'evolucao'
- **report**: String que contém o conteúdo principal do relatório
- **observation**: String para observações adicionais
- **createdAt**: Data de criação do relatório, preenchida automaticamente

### Uso

Este modelo é utilizado para:
- Registrar anamneses iniciais dos pacientes
- Documentar evoluções do tratamento
- Manter histórico de avaliações
- Compartilhar informações entre profissionais

### Relacionamentos

- Possui relação com o modelo `User` através do campo `userId`
- Possui relação com o modelo `Patient` através do campo `patientId`

## Agenda

O modelo `Agenda` gerencia os agendamentos de consultas entre pacientes e fonoaudiólogos.

### Estrutura do Modelo

```typescript
interface IAgenda {
  patient: mongoose.Types.ObjectId;       // Referência ao paciente
  therapist: mongoose.Types.ObjectId;     // Referência ao fonoaudiólogo
  consultationDateTime: Date;             // Data e hora da consulta
  observations?: string;                  // Observações sobre a consulta
  created_at: Date;                       // Data de criação do agendamento
  updated_at: Date;                       // Data da última atualização
}
```

### Campos

- **patient**: Referência obrigatória ao modelo Patient
- **therapist**: Referência obrigatória ao modelo Therapist
- **consultationDateTime**: Data e hora obrigatória da consulta
- **observations**: String opcional para observações sobre a consulta
- **created_at**: Data de criação do registro, preenchida automaticamente
- **updated_at**: Data da última atualização, preenchida automaticamente

### Uso

Este modelo é utilizado para:
- Gerenciar o calendário de consultas
- Agendar sessões entre pacientes e fonoaudiólogos
- Registrar observações sobre as consultas
- Manter histórico de agendamentos

### Relacionamentos

- Possui relação com o modelo `Patient` através do campo `patient`
- Possui relação com o modelo `Therapist` através do campo `therapist`

## Patient

O modelo `Patient` representa os pacientes do sistema, armazenando suas informações pessoais e de tratamento.

### Estrutura do Modelo

```typescript
interface IPatient {
  userId: mongoose.Types.ObjectId;     // Referência ao usuário
  therapistId: mongoose.Types.ObjectId; // Referência ao fonoaudiólogo responsável
  birthDate: Date;                     // Data de nascimento
  diagnosis: string;                   // Diagnóstico
  city: string;                        // Cidade
  notes: string;                       // Observações
  status: string;                      // Status do paciente
  createdAt: Date;                     // Data de cadastro
}
```

### Campos

- **userId**: Referência obrigatória ao modelo User
- **therapistId**: Referência obrigatória ao modelo User (fonoaudiólogo)
- **birthDate**: Data de nascimento obrigatória
- **diagnosis**: String opcional para o diagnóstico
- **city**: String opcional para a cidade
- **notes**: String opcional para observações
- **status**: String com valor padrão "Ativo"
- **createdAt**: Data de criação do registro, preenchida automaticamente

### Uso

Este modelo é utilizado para:
- Gerenciar informações dos pacientes
- Vincular pacientes aos seus fonoaudiólogos
- Manter histórico de diagnósticos
- Controlar o status dos pacientes no sistema

### Relacionamentos

- Possui relação com o modelo `User` através dos campos `userId` e `therapistId`

## Exercise

O modelo `Exercise` representa os exercícios fonoaudiológicos disponíveis no sistema.

### Estrutura do Modelo

```typescript
interface IExercise {
  title: string;                       // Título do exercício
  description: string;                 // Descrição do exercício
  instructions: string;                // Instruções de execução
  categoryId: mongoose.Types.ObjectId; // Categoria do exercício
  audioReference: mongoose.Types.ObjectId; // Referência ao áudio
}
```

### Campos

- **title**: String obrigatória com o título do exercício
- **description**: String opcional com a descrição do exercício
- **instructions**: String opcional com as instruções de execução
- **categoryId**: Referência obrigatória ao modelo Category
- **audioReference**: Referência opcional ao áudio do exercício

### Uso

Este modelo é utilizado para:
- Cadastrar exercícios fonoaudiológicos
- Organizar exercícios por categorias
- Fornecer instruções detalhadas
- Associar áudios aos exercícios

### Relacionamentos

- Possui relação com o modelo `Category` através do campo `categoryId`

## Category

O modelo `Category` representa as categorias de exercícios fonoaudiológicos criadas pelos fonoaudiólogos.

### Estrutura do Modelo

```typescript
interface ICategory {
  title: string;                       // Título da categoria
  description: string;                 // Descrição da categoria
  therapistId: mongoose.Types.ObjectId; // Fonoaudiólogo responsável
}
```

### Campos

- **title**: String obrigatória com o título da categoria
- **description**: String opcional com a descrição da categoria
- **therapistId**: Referência obrigatória ao modelo User (fonoaudiólogo)

### Uso

Este modelo é utilizado para:
- Organizar exercícios em categorias
- Permitir que fonoaudiólogos criem suas próprias categorias
- Facilitar a busca e filtragem de exercícios
- Personalizar a organização dos exercícios por profissional

### Relacionamentos

- Possui relação com o modelo `User` através do campo `therapistId`

## User

O modelo `User` representa os usuários do sistema, podendo ser tanto fonoaudiólogos quanto pacientes.

### Estrutura do Modelo

```typescript
interface IUser {
    name_user: string;    // Nome do usuário
    email: string;        // Email do usuário
    password: string;     // Senha criptografada
    role: string;         // Papel do usuário no sistema
    crfa: string;         // Número do registro profissional (para fonoaudiólogos)
    created_at: Date;     // Data de criação
    updated_at: Date;     // Data da última atualização
}
```

### Campos

- **name_user**: String obrigatória com o nome do usuário
- **email**: String obrigatória com o email do usuário
- **password**: String obrigatória com a senha criptografada
- **role**: String obrigatória que define o papel do usuário
- **crfa**: String opcional para o número do registro profissional
- **created_at**: Data de criação do registro, preenchida automaticamente
- **updated_at**: Data da última atualização, preenchida automaticamente

### Uso

Este modelo é utilizado para:
- Gerenciar autenticação de usuários
- Diferenciar papéis no sistema (fonoaudiólogo/paciente)
- Armazenar informações básicas dos usuários
- Controlar acesso ao sistema

### Relacionamentos

Este é um modelo base que é referenciado por vários outros modelos no sistema.

## TherapistEvaluation

O modelo `TherapistEvaluation` representa as avaliações feitas pelos fonoaudiólogos sobre as respostas dos pacientes aos exercícios.

### Estrutura do Modelo

```typescript
interface ITherapistEvaluation {
  patientResponseId: mongoose.Types.ObjectId; // Referência à resposta do paciente
  therapistComment: string;                   // Comentário do fonoaudiólogo
  therapistFeedback: string;                  // Feedback detalhado
  score: number;                              // Pontuação atribuída
  createdAt: Date;                            // Data da avaliação
}
```

### Campos

- **patientResponseId**: Referência obrigatória ao modelo PatientResponse
- **therapistComment**: String opcional com comentário do fonoaudiólogo
- **therapistFeedback**: String opcional com feedback detalhado
- **score**: Número opcional para pontuação
- **createdAt**: Data de criação da avaliação, preenchida automaticamente

### Uso

Este modelo é utilizado para:
- Avaliar o desempenho dos pacientes nos exercícios
- Fornecer feedback personalizado
- Atribuir pontuações aos exercícios
- Acompanhar o progresso do tratamento

### Relacionamentos

- Possui relação com o modelo `PatientResponse` através do campo `patientResponseId`

## PatientResponse

O modelo `PatientResponse` representa as respostas dos pacientes aos exercícios.

### Estrutura do Modelo

```typescript
interface IPatientResponse {
  patientId: mongoose.Types.ObjectId;    // Referência ao paciente
  exerciseId: mongoose.Types.ObjectId;    // Referência ao exercício
  response: string;                      // Resposta do paciente
  createdAt: Date;                       // Data de criação
}
```

### Campos

- **patientId**: Referência obrigatória ao modelo Patient
- **exerciseId**: Referência obrigatória ao modelo Exercise
- **response**: String que contém a resposta do paciente
- **createdAt**: Data de criação do registro, preenchida automaticamente

### Uso

Este modelo é utilizado para:
- Armazenar respostas dos pacientes aos exercícios
- Manter histórico de respostas
- Associar respostas aos pacientes e aos exercícios

### Relacionamentos

- Possui relação com o modelo `Patient` através do campo `patientId`
- Possui relação com o modelo `Exercise` através do campo `exerciseId`

## PatientExercise

O modelo `PatientExercise` representa o exercício realizado por um paciente.

### Estrutura do Modelo

```typescript
interface IPatientExercise {
  patientId: mongoose.Types.ObjectId;    // Referência ao paciente
  exerciseId: mongoose.Types.ObjectId;    // Referência ao exercício
  createdAt: Date;                       // Data de criação
}
```

### Campos

- **patientId**: Referência obrigatória ao modelo Patient
- **exerciseId**: Referência obrigatória ao modelo Exercise
- **createdAt**: Data de criação do registro, preenchida automaticamente

### Uso

Este modelo é utilizado para:
- Registrar exercícios realizados pelos pacientes
- Manter histórico de exercícios realizados
- Associar exercícios aos pacientes

### Relacionamentos

- Possui relação com o modelo `Patient` através do campo `patientId`
- Possui relação com o modelo `Exercise` através do campo `exerciseId`

## Message

O modelo `Message` representa as mensagens enviadas entre usuários no sistema.

### Estrutura do Modelo

```typescript
interface IMessage {
  senderId: mongoose.Types.ObjectId;    // Referência ao usuário remetente
  receiverId: mongoose.Types.ObjectId;   // Referência ao usuário destinatário
  content: string;                      // Conteúdo da mensagem
  createdAt: Date;                       // Data de criação
}
```

### Campos

- **senderId**: Referência obrigatória ao modelo User (usuário remetente)
- **receiverId**: Referência obrigatória ao modelo User (usuário destinatário)
- **content**: String que contém o conteúdo da mensagem
- **createdAt**: Data de criação do registro, preenchida automaticamente

### Uso

Este modelo é utilizado para:
- Armazenar mensagens enviadas entre usuários
- Manter histórico de mensagens
- Associar mensagens aos usuários

### Relacionamentos

- Possui relação com o modelo `User` através dos campos `senderId` e `receiverId`

Vou analisar cada modelo individualmente e adicionar suas descrições detalhadas. 