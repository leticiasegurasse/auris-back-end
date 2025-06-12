# Sistema de Cache

## Visão Geral
O sistema de cache implementado utiliza Redis como solução de armazenamento em cache para otimizar a performance da aplicação. O sistema foi projetado para armazenar automaticamente as respostas das requisições GET e atualizar o cache quando houver alterações nos dados.

## Componentes

### 1. CacheService (`src/services/cache.service.ts`)
Serviço principal que gerencia todas as operações de cache:
- Implementa o padrão Singleton para garantir uma única instância do Redis
- Fornece métodos para manipulação do cache (set, get, delete, clear)
- Gerencia a conexão com o Redis e tratamento de erros
- Implementa logging para monitoramento

### 2. CacheMiddleware (`src/middlewares/cache.middleware.ts`)
Middleware Express que gerencia o cache das requisições:
- Intercepta requisições GET
- Verifica se existe resposta em cache
- Armazena novas respostas no cache
- Permite configuração do tempo de expiração

### 3. Logger (`src/config/logger.ts`)
Sistema de logging para monitoramento:
- Registra eventos importantes do sistema de cache
- Armazena logs em arquivos separados
- Configuração diferente para ambiente de produção e desenvolvimento

## Configuração

### Variáveis de Ambiente
Adicione as seguintes variáveis ao seu arquivo `.env`:
```env
REDIS_HOST=seu_host_redis
REDIS_PORT=6379
REDIS_PASSWORD=sua_senha_redis
```

### Instalação do Redis
1. Instale o Redis em seu servidor ou use um serviço em nuvem
2. Instale as dependências do projeto:
```bash
npm install redis ioredis
```

## Uso

### Em Rotas GET
```typescript
router.get('/sua-rota', cacheMiddleware(300), seuController);
```

### Em Rotas de Escrita (POST, PUT, DELETE)
```typescript
const cacheService = CacheService.getInstance();
await cacheService.delete('__express__/sua-rota');
```

### Tempos de Cache Comuns
- 5 minutos: `cacheMiddleware(300)`
- 1 hora: `cacheMiddleware(3600)`
- 1 dia: `cacheMiddleware(86400)`

## Funcionalidades

### Cache Automático
- Todas as requisições GET são automaticamente cacheadas
- Respostas são armazenadas com uma chave única baseada na URL
- Cache é atualizado automaticamente após o tempo de expiração

### Atualização Dinâmica
- Cache é limpo automaticamente em operações de escrita
- Permite manter os dados sempre atualizados
- Evita dados desatualizados no cache

### Tratamento de Erros
- Logs detalhados para monitoramento
- Tratamento de erros de conexão
- Retry strategy para reconexão automática

## Boas Práticas

1. **Tempo de Cache**
   - Ajuste o tempo de cache de acordo com a frequência de atualização dos dados
   - Dados que mudam frequentemente devem ter cache mais curto
   - Dados estáticos podem ter cache mais longo

2. **Limpeza de Cache**
   - Limpe o cache em operações de escrita
   - Use o método `clear()` com cautela
   - Prefira limpar apenas as chaves específicas

3. **Monitoramento**
   - Monitore os logs para identificar problemas
   - Ajuste as configurações conforme necessário
   - Verifique o uso de memória do Redis

## Troubleshooting

### Problemas Comuns

1. **Cache não está funcionando**
   - Verifique a conexão com o Redis
   - Confirme se as variáveis de ambiente estão corretas
   - Verifique os logs de erro

2. **Dados desatualizados**
   - Verifique se o cache está sendo limpo corretamente
   - Ajuste o tempo de expiração
   - Confirme se as operações de escrita estão limpando o cache

3. **Erros de conexão**
   - Verifique se o Redis está rodando
   - Confirme as credenciais de acesso
   - Verifique a rede e firewall 