document.addEventListener('DOMContentLoaded', () => {
    const listaMesas = document.getElementById('lista-mesas');
    const mesaNomeInput = document.getElementById('mesa-nome');
    const mesaParticipantesList = document.getElementById('mesa-participantes');
    const novoParticipanteInput = document.getElementById('novo-participante');
    const adicionarParticipanteBtn = document.getElementById('adicionar-participante');
    const mesaPerguntasList = document.getElementById('mesa-perguntas');
    const novaPerguntaInput = document.getElementById('nova-pergunta');
    const adicionarPerguntaBtn = document.getElementById('adicionar-pergunta');
    const notaSelect = document.getElementById('nota');
    const salvarMesaBtn = document.getElementById('salvar-mesa');
    const removerMesaBtn = document.getElementById('remover-mesa');
    const mesas = [];
    let mesaSelecionadaIndex = null;

    function atualizarListaMesas() {
        listaMesas.innerHTML = '';
        mesas.forEach((mesa, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = mesa.nome;
            listItem.dataset.index = index;
            listItem.className = mesaSelecionadaIndex === index ? 'selected' : '';
            listItem.addEventListener('click', () => selecionarMesa(index));
            listaMesas.appendChild(listItem);
        });
    }

    function selecionarMesa(index) {
        mesaSelecionadaIndex = index;
        carregarDetalhesMesa(index);
        document.getElementById('mesa-info').style.display = 'block';
    }


    function carregarDetalhesMesa(index) {
        if (index === null) return;
        const mesa = mesas[index];
        mesaNomeInput.value = mesa.nome;
        mesaParticipantesList.innerHTML = '';
        mesa.participantes.forEach((participante, idx) => {
            const listItem = document.createElement('li');
            listItem.textContent = participante;

            const removerBtn = document.createElement('button');
            removerBtn.textContent = 'Remover';
            removerBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                removerParticipante(idx);
            });

            listItem.appendChild(removerBtn);
            listItem.dataset.index = idx;
            listItem.className = 'participante';
            listItem.addEventListener('click', () => selecionarParticipante(idx));
            mesaParticipantesList.appendChild(listItem);
        });
        novoParticipanteInput.value = '';

        mesaPerguntasList.innerHTML = '';
        for (const pergunta in mesa.perguntas) {
            const listItem = document.createElement('li');
            listItem.textContent = `${pergunta}: ${mesa.perguntas[pergunta]}`;

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.addEventListener('click', () => editarPergunta(pergunta));

            const removerBtn = document.createElement('button');
            removerBtn.textContent = 'Remover';
            removerBtn.addEventListener('click', () => removerPergunta(pergunta));

            listItem.appendChild(editarBtn);
            listItem.appendChild(removerBtn);
            mesaPerguntasList.appendChild(listItem);
        }
        novaPerguntaInput.value = '';
        notaSelect.value = mesa.nota || 'I'; // Definindo a nota existente
    }

    function adicionarMesa() {
        const nomeMesa = prompt('Digite o nome da nova mesa:');
        if (nomeMesa) {
            mesas.push({
                nome: nomeMesa,
                participantes: [],
                perguntas: {},
                nota: 'I' // Nota padrão
            });
            atualizarListaMesas();
        }
    }

    function salvarMesa() {
        if (mesaSelecionadaIndex === null) return;
        const mesa = mesas[mesaSelecionadaIndex];
        mesa.nome = mesaNomeInput.value;
        mesa.nota = notaSelect.value;
        atualizarListaMesas();
    }

    function removerMesa() {
        if (mesaSelecionadaIndex === null) return;
        mesas.splice(mesaSelecionadaIndex, 1);
        mesaSelecionadaIndex = null;
        atualizarListaMesas();
        mesaNomeInput.value = '';
        mesaParticipantesList.innerHTML = '';
        mesaPerguntasList.innerHTML = '';
        notaSelect.value = 'I';
    }

    function adicionarParticipante() {
        if (mesaSelecionadaIndex === null) return;
        const participante = novoParticipanteInput.value;
        if (participante) {
            mesas[mesaSelecionadaIndex].participantes.push(participante);
            carregarDetalhesMesa(mesaSelecionadaIndex);
        }
    }

    function selecionarParticipante(index) {
        if (mesaSelecionadaIndex === null) return;
        const participante = mesas[mesaSelecionadaIndex].participantes[index];
        const novoNome = prompt('Digite o novo nome do participante:', participante);
        if (novoNome) {
            mesas[mesaSelecionadaIndex].participantes[index] = novoNome;
            carregarDetalhesMesa(mesaSelecionadaIndex);
        }
    }

    function removerParticipante(index) {
        if (mesaSelecionadaIndex === null) return;
        mesas[mesaSelecionadaIndex].participantes.splice(index, 1);
        carregarDetalhesMesa(mesaSelecionadaIndex);
    }

    function adicionarPergunta() {
        if (mesaSelecionadaIndex === null) return;
        const pergunta = novaPerguntaInput.value;
        if (pergunta) {
            mesas[mesaSelecionadaIndex].perguntas[pergunta] = '';
            carregarDetalhesMesa(mesaSelecionadaIndex);
        }
    }

    function editarPergunta(perguntaOriginal) {
        if (mesaSelecionadaIndex === null) return;
        const novaPergunta = prompt('Digite a nova pergunta:', perguntaOriginal);
        if (novaPergunta && novaPergunta !== perguntaOriginal) {
            const mesa = mesas[mesaSelecionadaIndex];
            const resposta = mesa.perguntas[perguntaOriginal];
            delete mesa.perguntas[perguntaOriginal];
            mesa.perguntas[novaPergunta] = resposta;
            carregarDetalhesMesa(mesaSelecionadaIndex);
        }
    }

    function removerPergunta(pergunta) {
        if (mesaSelecionadaIndex === null) return;
        const mesa = mesas[mesaSelecionadaIndex];
        delete mesa.perguntas[pergunta];
        carregarDetalhesMesa(mesaSelecionadaIndex);
    }

    adicionarParticipanteBtn.addEventListener('click', adicionarParticipante);
    adicionarPerguntaBtn.addEventListener('click', adicionarPergunta);
    salvarMesaBtn.addEventListener('click', salvarMesa);
    removerMesaBtn.addEventListener('click', removerMesa);
    document.getElementById('adicionar-mesa').addEventListener('click', adicionarMesa);
});
