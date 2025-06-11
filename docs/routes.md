# Documentação das Rotas da API

Este documento descreve todas as rotas disponíveis na API do sistema Auris.

## Autenticação
- **Base URL**: `/auth`
- **Descrição**: Rotas relacionadas à autenticação de usuários
- **Arquivo**: `auth.routes.ts`
- **Rotas**:
  - `POST /register` - Registro de novos usuários
  - `POST /login` - Autenticação de usuários
  - `GET /verify-token` - Verificação de token de autenticação

## Usuários
- **Base URL**: `/users`
- **Descrição**: Gerenciamento de usuários do sistema. Todas as rotas requerem autenticação.
- **Arquivo**: `user.routes.ts`
- **Rotas**:
  - `GET /:id` - Busca um usuário específico pelo ID
    - Requer autenticação
    - Retorna os dados do usuário encontrado
    - Retorna 404 se o usuário não for encontrado
  - `PUT /:id` - Atualiza os dados de um usuário específico
    - Requer autenticação
    - Recebe os dados a serem atualizados no corpo da requisição
    - Retorna os dados do usuário atualizado
    - Retorna 400 em caso de erro na atualização

## Pacientes
- **Base URL**: `/patients`
- **Descrição**: Gerenciamento dos pacientes e suas informações
- **Arquivo**: `patient.routes.ts`
- **Rotas**:
  - `GET /` - Lista todos os pacientes do terapeuta logado
    - Requer autenticação
  - `GET /:id` - Busca um paciente específico pelo ID
    - Requer autenticação
  - `PUT /:id` - Atualiza os dados de um paciente
    - Requer autenticação
    - Registra log da operação

## Fonoaudiólogos
- **Base URL**: `/therapists`
- **Descrição**: Gerenciamento de fonoaudiólogos e suas informações
- **Arquivo**: `therapist.routes.ts`
- **Rotas**:
  - `GET /` - Lista todos os fonoaudiólogos
    - Requer autenticação
  - `GET /:id` - Busca um fonoaudiólogo específico pelo ID
    - Requer autenticação
  - `PUT /:id` - Atualiza os dados de um fonoaudiólogo
    - Requer autenticação
  - `POST /:id/cancel-subscription` - Cancela a assinatura de um fonoaudiólogo
    - Requer autenticação

## Exercícios
- **Base URL**: `/exercises`
- **Descrição**: Gerenciamento de exercícios fonoaudiológicos, incluindo upload e download de áudios
- **Arquivo**: `exercise.routes.ts`
- **Rotas**:
  - `POST /` - Cria um novo exercício
    - Requer autenticação
    - Aceita upload de arquivo de áudio
    - Registra log da operação
  - `GET /category/:categoryId` - Lista exercícios por categoria
    - Requer autenticação
  - `GET /audio/:id` - Obtém o arquivo de áudio de um exercício
  - `GET /:id` - Busca um exercício específico pelo ID
    - Requer autenticação
  - `PUT /:id` - Atualiza um exercício existente
    - Requer autenticação
    - Aceita upload de novo arquivo de áudio
    - Registra log da operação
  - `DELETE /:id` - Remove um exercício
    - Requer autenticação
    - Registra log da operação

## Exercícios do Paciente
- **Base URL**: `/patient-exercises`
- **Descrição**: Associação e gerenciamento de exercícios atribuídos aos pacientes
- **Arquivo**: `patientExercise.routes.ts`
- **Rotas**:
  - `POST /` - Atribui um novo exercício ao paciente
    - Requer autenticação
    - Registra log da operação
  - `GET /` - Lista todos os exercícios do paciente logado
    - Requer autenticação
  - `PUT /:id` - Atualiza um exercício existente
    - Requer autenticação
    - Registra log da operação
  - `GET /patient/:patientId` - Lista todos os exercícios de um paciente específico
    - Requer autenticação
  - `DELETE /:id` - Remove um exercício pendente
    - Requer autenticação
    - Registra log da operação

## Avaliações do Fonoaudiólogo
- **Base URL**: `/therapist-evaluations`
- **Descrição**: Avaliações realizadas pelos fonoaudiólogos sobre as respostas dos pacientes
- **Arquivo**: `therapistEvaluation.routes.ts`
- **Rotas**:
  - `POST /` - Cria uma nova avaliação do terapeuta
    - Requer autenticação
    - Registra log da operação
  - `GET /` - Lista todas as avaliações
    - Requer autenticação
  - `GET /:id` - Busca uma avaliação específica pelo ID
    - Requer autenticação
  - `PUT /:id` - Atualiza uma avaliação existente
    - Requer autenticação
    - Registra log da operação
  - `GET /patient-response/:patientResponseId` - Busca avaliações relacionadas a uma resposta específica do paciente
    - Requer autenticação

## Respostas do Paciente
- **Base URL**: `/patient-responses`
- **Descrição**: Gerenciamento das respostas dos pacientes aos exercícios
- **Arquivo**: `patientResponse.routes.ts`
- **Rotas**:
  - `POST /` - Cria uma nova resposta do paciente
    - Requer autenticação
    - Aceita upload de arquivo de áudio
  - `GET /` - Lista todas as respostas do paciente
    - Requer autenticação
  - `GET /:id` - Busca uma resposta específica pelo ID
    - Requer autenticação
  - `PUT /:id` - Atualiza uma resposta existente
    - Requer autenticação
    - Aceita upload de novo arquivo de áudio
  - `GET /audio/:id` - Obtém o arquivo de áudio de uma resposta
  - `GET /exercise/:patientExerciseId` - Busca respostas relacionadas a um exercício específico do paciente
    - Requer autenticação

## Relatórios do Paciente
- **Base URL**: `/patient-reports`
- **Descrição**: Gerenciamento dos relatórios e acompanhamento do progresso dos pacientes
- **Arquivo**: `patientReport.routes.ts`
- **Rotas**:
  - `POST /` - Cria um novo relatório do paciente
    - Requer autenticação
    - Registra log da operação
  - `GET /stats` - Obtém quantidade de relatórios total e por tipo
    - Requer autenticação
  - `GET /search` - Busca relatórios pelo nome do paciente
    - Requer autenticação
  - `GET /patient/:patientId` - Busca relatórios de um paciente específico
    - Requer autenticação
  - `GET /` - Lista todos os relatórios do usuário logado
    - Requer autenticação
  - `GET /:id` - Busca um relatório específico pelo ID
    - Requer autenticação
  - `PUT /:id` - Atualiza um relatório existente
    - Requer autenticação
    - Registra log da operação


## Categorias
- **Base URL**: `/categories`
- **Descrição**: Gerenciamento das categorias de exercícios fonoaudiológicos
- **Arquivo**: `category.routes.ts`
- **Rotas**:
  - `POST /` - Cria uma nova categoria
    - Requer autenticação
    - Registra log da operação
  - `GET /` - Lista todas as categorias do terapeuta logado
    - Requer autenticação
  - `GET /:id` - Busca uma categoria específica pelo ID
    - Requer autenticação
  - `PUT /:id` - Atualiza uma categoria existente
    - Requer autenticação
    - Registra log da operação
  - `DELETE /:id` - Remove uma categoria
    - Requer autenticação
    - Registra log da operação

## Agenda
- **Base URL**: `/agenda`
- **Descrição**: Gerenciamento de agendamentos e consultas
- **Arquivo**: `agenda.routes.ts`
- **Rotas**:
  - `GET /` - Lista agendamentos
  - `POST /` - Cria novo agendamento
  - `GET /future` - Lista agendamentos futuros
  - `GET /:id` - Busca agendamento por ID
  - `GET /patient/:patientId` - Busca agendamento de um paciente específico
  - `PUT /:id` - Atualiza agendamento
  - `DELETE /:id` - Remove agendamento

## Mensagens
- **Base URL**: `/messages`
- **Descrição**: Sistema de mensagens e conversas entre usuários
- **Arquivo**: `message.routes.ts`
- **Rotas**:
  - `POST /` - Cria uma nova conversa
  - `GET /:userId` - Lista todas as conversas de um usuário
  - `GET /:conversationId/messages` - Lista todas as mensagens de uma conversa
  - `POST /:conversationId/messages` - Adiciona uma nova mensagem em uma conversa

## Faturas
- **Base URL**: `/invoices`
- **Descrição**: Visualização das faturas e histórico de pagamentos
- **Arquivo**: `invoice.routes.ts`
- **Rotas**:
  - `GET /` - Lista todas as faturas do usuário
    - Requer autenticação

## Checkout
- **Base URL**: `/checkout`
- **Descrição**: Processamento de pagamentos e gerenciamento de sessões de checkout
- **Arquivo**: `checkoutRoutes.ts`
- **Rotas**:
  - `POST /:userId/create-checkout` - Cria uma nova sessão de checkout para um usuário
    - Recebe o ID do usuário como parâmetro
    - Inicia o processo de pagamento

## Logs
- **Base URL**: `/logs`
- **Descrição**: Visualização dos registros de atividades do sistema
- **Arquivo**: `logRoutes.ts`
- **Rotas**:
  - `GET /logs` - Lista todos os logs do sistema
    - Requer autenticação

