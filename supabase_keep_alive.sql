-- ====================================================================
-- Supabase Keep-Alive via pg_cron + pg_net (Opcional via SQL Editor)
-- ====================================================================
-- O Supabase monitora requisições HTTP externas no API Gateway.
-- Usando a extensão pg_net, o Postgres dispara uma requisição HTTP externa
-- para a própria API REST do projeto a cada 3 dias, simulando atividade real.
-- ====================================================================

-- 1. Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Agendar requisição HTTP para a cada 3 dias às 03:00 da manhã
SELECT cron.schedule(
  'supabase-keep-alive',
  '0 3 */3 * *',
  $$
  SELECT net.http_get(
    url := 'https://xqppzwzeykwlitwzutcn.supabase.co/rest/v1/page_visits?select=count&limit=1',
    headers := jsonb_build_object(
      'apikey', 'sb_publishable_s95BhjIiSkKqbOGIunbCaA_f5-OqaW6',
      'Authorization', 'Bearer sb_publishable_s95BhjIiSkKqbOGIunbCaA_f5-OqaW6'
    )
  );
  $$
);

-- Para verificar se o agendamento foi criado com sucesso:
-- SELECT * FROM cron.job;

-- Caso queira remover o agendamento no futuro:
-- SELECT cron.unschedule('supabase-keep-alive');
