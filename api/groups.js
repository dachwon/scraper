// api/groups.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Configura os cabeçalhos CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Se for uma requisição OPTIONS, retorna imediatamente
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const userId = req.query.userId; // Obtém o userId da query string

    if (!userId) {
        return res.status(400).json({ error: 'O parâmetro userId é obrigatório.' });
    }

    const url = `https://groups.roblox.com/v2/users/${userId}/groups/roles`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar grupos:", error);
        res.status(500).json({ error: 'Erro ao buscar grupos' });
    }
};
