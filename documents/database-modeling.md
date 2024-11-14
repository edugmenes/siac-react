# SIAC Db Model

Tabela `usuario` :

```sql
CREATE TABLE `usuario` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(350) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nomeUser` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `celular` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `perfil` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `id_perfil` int DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  KEY `id_perfil` (`id_perfil`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id`),
  CONSTRAINT `usuario_chk_1` CHECK ((`perfil` in (_utf8mb4'paciente',_utf8mb4'administrador',_utf8mb4'psicologo',_utf8mb4'gestor',_utf8mb4'recepcionista')))
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
```

Tabela `perfil` :

```sql
CREATE TABLE `perfil` (
  `id` int NOT NULL,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

Tabela `permissao` :

```sql
CREATE TABLE `permissao` (
  `id` int NOT NULL,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

Tabela `usuario_perfil` :

```sql
CREATE TABLE `usuario_perfil` (
  `id_usuario` int NOT NULL,
  `id_perfil` int NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_perfil`),
  KEY `id_perfil` (`id_perfil`),
  CONSTRAINT `usuario_perfil_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`idUser`),
  CONSTRAINT `usuario_perfil_ibfk_2` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

Tabela `perfil_permissao` :

```sql
CREATE TABLE `perfil_permissao` (
  `id_perfil` int NOT NULL,
  `id_permissao` int NOT NULL,
  PRIMARY KEY (`id_perfil`,`id_permissao`),
  KEY `id_permissao` (`id_permissao`),
  CONSTRAINT `perfil_permissao_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id`),
  CONSTRAINT `perfil_permissao_ibfk_2` FOREIGN KEY (`id_permissao`) REFERENCES `permissao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```
