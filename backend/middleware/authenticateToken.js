const jwt = require('jsonwebtoken');

// Middleware para verificar e decodificar o token JWT
const authenticateToken = (request, response, next) => {
  const authHeader = request.headers['authorization'];

  // Verifica se o cabeçalho contém o esquema Bearer e o token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }

  // Extrai o token do cabeçalho
  const token = authHeader.split(' ')[1];

  // Verifica e decodifica o token
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return response.status(403).json({ message: 'Token inválido ou expirado' });
    }

    // Armazena as informações do usuário (como idUser) na requisição
    request.user = user;
    next(); // Continua para o próximo middleware ou rota
  });
};

module.exports = authenticateToken;
