```sql
INSERT INTO perfil_permissao (id_perfil, id_permissao) VALUES
-- Administrador
(1, 6), -- full_access

-- Paciente
(2, 8), -- agendar_consulta
(2, 16), -- cancelar_consulta
(2, 17), -- remarcar_consulta

-- Professor
(4, 1), -- criar_prontuario
(4, 2), -- ler_prontuario
(4, 3), -- editar_prontuario
(4, 4), -- deletar_prontuario
(4, 11), -- criar_relatorio
(4, 12), -- ler_relatorio
(4, 13), -- editar_relatorio
(4, 14), -- deletar_relatorio

-- Psicólogo
(5, 1), -- criar_prontuario
(5, 2), -- ler_prontuario
(5, 3), -- editar_prontuario
(5, 4), -- deletar_prontuario
(5, 5), -- criar_agenda
(5, 9), -- deletar_agenda
(5, 18), -- editar_agenda
(5, 11), -- criar_relatorio
(5, 12), -- ler_relatorio
(5, 13), -- editar_relatorio
(5, 14), -- deletar_relatorio

-- Recepcionista
(3, 7), -- criar_usuario
(3, 10), -- editar_usuario
(3, 15), -- deletar_usuario

-- Estagiário
(6, 1), -- criar_prontuario
(6, 2), -- ler_prontuario
(6, 3), -- editar_prontuario
(6, 4), -- deletar_prontuario
(6, 5), -- criar_agenda
(6, 9), -- deletar_agenda
(6, 18), -- editar_agenda
(6, 11), -- criar_relatorio
(6, 12), -- ler_relatorio
(6, 13), -- editar_relatorio
(6, 14); -- deletar_relatorio
```
