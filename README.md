# Weather Client

Aplicação de clima desenvolvida com `Next.js`, com foco em uma interface limpa, responsiva e consistente, utilizando `MUI` como base visual e arquitetura orientada por feature.

## Visão Geral

O projeto exibe clima atual e previsão para 7 dias a partir de uma cidade selecionada ou da localização atual do usuário. A interface foi estruturada como um dashboard, com destaque para temperatura, condição climática, métricas principais e previsão semanal.

Principais pontos da aplicação:

- busca de cidades com autocomplete
- uso da localização atual com reverse geocoding
- armazenamento de cidades recentes no `localStorage`
- alternância de unidade entre `°C` e `°F`
- conversão local de unidades sem nova requisição para a API
- tema ajustado automaticamente com base em `isDay` da cidade selecionada

## Stack

- `Next.js 16.2.3` com App Router
- `React 19`
- `TypeScript`
- `MUI` + `Emotion` para interface e estilização
- `React Query` para busca e cache de dados
- `Axios` para chamadas HTTP
- `Vitest` + `Testing Library` + `happy-dom` para testes
- `ESLint` para lint

## Arquitetura

O projeto mantém a página principal enxuta e concentra a implementação na feature `weather`.

- [src/app](./src/app): layout, página principal, estilos globais e rota interna
- [src/features/weather](./src/features/weather): implementação completa da feature de clima
- [src/providers](./src/providers): providers globais da aplicação
- [src/theme](./src/theme): tema MUI e controle de modo `day/night`
- [tests](./tests): suíte de testes organizada fora de `src`

Dentro da feature `weather`, os componentes seguem o padrão por componente:

- `city-selector/index.tsx` + `styles.ts`
- `forecast-list/index.tsx` + `styles.ts`
- `unit-toggle/index.tsx` + `styles.ts`
- `weather-dashboard/index.tsx` + `styles.ts`
- `weather-icon/index.tsx` + `styles.ts`
- `weather-summary/index.tsx` + `styles.ts`

## Estrutura de Pastas

```text
src/
  app/
    api/
      reverse-geocode/
        route.ts
    globals.css
    layout.tsx
    page.tsx
  features/
    weather/
      components/
      hooks/
      lib/
      utils/
      types.ts
  providers/
    app-providers.tsx
  theme/
    app-theme.ts
    theme-mode-provider.tsx

tests/
  app/
  features/
  providers/
  theme/
```

## Fluxo da Aplicação

- A página principal renderiza apenas o dashboard da feature `weather`
- A busca de cidades utiliza a Open-Meteo Geocoding API
- A previsão utiliza a Open-Meteo Forecast API
- A geolocalização utiliza uma rota interna em `/api/reverse-geocode`
- O reverse geocoding é resolvido com Nominatim / OpenStreetMap
- As cidades recentes são persistidas no `localStorage`
- A troca entre `°C` e `°F` acontece no cliente, sem nova chamada à API

## Tema e Interface

A interface utiliza `MUI` como base principal de estilização.

- tema centralizado em [src/theme/app-theme.ts](./src/theme/app-theme.ts)
- controle de modo em [src/theme/theme-mode-provider.tsx](./src/theme/theme-mode-provider.tsx)
- estilos globais e ambientação visual em [src/app/globals.css](./src/app/globals.css)
- fontes carregadas com `next/font`

O projeto não utiliza Tailwind. A estilização é baseada em:

- tema do `MUI`
- prop `sx`
- `styles.ts` por componente
- CSS global apenas para base visual e animações leves

## Como Executar

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts Disponíveis

```bash
npm run dev
npm run build
npm run start
npm run lint
npm test
npm run test:watch
```

## Testes

Os testes estão centralizados na pasta [tests](./tests) e cobrem:

- componentes da interface
- hooks
- utilitários
- providers
- tema
- página principal
- rota interna de reverse geocoding

A cobertura atual está acima do mínimo configurado no projeto:

- `Statements: 96.93%`
- `Branches: 93.16%`
- `Functions: 96.47%`
- `Lines: 96.77%`

O threshold configurado no `Vitest` é de `80%` para todas as métricas principais.

## Qualidade e Decisões Técnicas

- arquitetura por feature preservada
- `page.tsx` enxuto e com responsabilidade única
- separação clara entre lógica, apresentação e estilos
- organização dos componentes em `index.tsx + styles.ts`
- suíte de testes isolada em `tests/`
- interface pensada para manter simplicidade e boa leitura em desktop e mobile

## APIs Utilizadas

- [Open-Meteo Geocoding API](https://open-meteo.com/)
- [Open-Meteo Forecast API](https://open-meteo.com/)
- [Nominatim / OpenStreetMap](https://nominatim.org/)
