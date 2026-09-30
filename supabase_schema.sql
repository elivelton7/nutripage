-- ============================================================
-- NutriVida – Supabase Schema
-- Execute este SQL no SQL Editor do seu projeto Supabase
-- ============================================================

-- Tabela de leads (pedidos de contacto)
CREATE TABLE IF NOT EXISTS leads (
  id          uuid              DEFAULT gen_random_uuid() PRIMARY KEY,
  nome        text              NOT NULL,
  telefone    text              NOT NULL,
  modalidade  text              CHECK (modalidade IN ('Presencial', 'Online')),
  mensagem    text,
  created_at  timestamptz       DEFAULT now() NOT NULL
);

-- RLS: Habilitar Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Qualquer pessoa pode inserir (formulário público)
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Policy: Apenas utilizadores autenticados (admins) podem ler
CREATE POLICY "Allow authenticated read" ON leads
  FOR SELECT
  USING (auth.role() = 'authenticated');
