import tkinter as tk
from tkinter import messagebox, simpledialog

class QuizApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Gerenciador de Perguntas")
        
        # Variáveis
        self.mesa_nome = tk.StringVar(value="Mesa 1")
        self.grupo_nome = tk.StringVar(value="Grupo A")
        self.alunos = []
        self.perguntas = []
        self.respostas = {}

        # Layout
        self.create_widgets()

    def create_widgets(self):
        # Nome da Mesa
        tk.Label(self.root, text="Nome da Mesa:").grid(row=0, column=0, sticky="w")
        tk.Entry(self.root, textvariable=self.mesa_nome).grid(row=0, column=1, sticky="w")

        # Nome do Grupo
        tk.Label(self.root, text="Nome do Grupo:").grid(row=1, column=0, sticky="w")
        tk.Entry(self.root, textvariable=self.grupo_nome).grid(row=1, column=1, sticky="w")

        # Botões para adicionar alunos e perguntas
        tk.Button(self.root, text="Adicionar Aluno", command=self.adicionar_aluno).grid(row=2, column=0, pady=5)
        tk.Button(self.root, text="Adicionar Pergunta", command=self.adicionar_pergunta).grid(row=2, column=1, pady=5)

        # Lista de Alunos
        tk.Label(self.root, text="Alunos:").grid(row=3, column=0, sticky="w")
        self.lista_alunos = tk.Listbox(self.root)
        self.lista_alunos.grid(row=4, column=0, columnspan=2, sticky="w")

        # Lista de Perguntas
        tk.Label(self.root, text="Perguntas:").grid(row=3, column=2, sticky="w")
        self.lista_perguntas = tk.Listbox(self.root)
        self.lista_perguntas.grid(row=4, column=2, columnspan=2, sticky="w")

        # Botão para registrar respostas
        tk.Button(self.root, text="Registrar Resposta", command=self.registrar_resposta).grid(row=5, column=0, pady=5)

        # Botão para visualizar respostas
        tk.Button(self.root, text="Visualizar Respostas", command=self.visualizar_respostas).grid(row=5, column=1, pady=5)

    def adicionar_aluno(self):
        nome_aluno = simpledialog.askstring("Adicionar Aluno", "Nome do Aluno:")
        if nome_aluno:
            self.alunos.append(nome_aluno)
            self.lista_alunos.insert(tk.END, nome_aluno)

    def adicionar_pergunta(self):
        pergunta = simpledialog.askstring("Adicionar Pergunta", "Digite a Pergunta:")
        if pergunta:
            self.perguntas.append(pergunta)
            self.lista_perguntas.insert(tk.END, pergunta)

    def registrar_resposta(self):
        aluno_selecionado = self.lista_alunos.curselection()
        pergunta_selecionada = self.lista_perguntas.curselection()

        if not aluno_selecionado or not pergunta_selecionada:
            messagebox.showwarning("Seleção Incompleta", "Selecione um aluno e uma pergunta.")
            return

        aluno = self.alunos[aluno_selecionado[0]]
        pergunta = self.perguntas[pergunta_selecionada[0]]
        resposta = simpledialog.askstring("Registrar Resposta", f"Resposta de {aluno} para '{pergunta}':")

        if resposta is not None:
            if aluno not in self.respostas:
                self.respostas[aluno] = {}
            self.respostas[aluno][pergunta] = resposta
            messagebox.showinfo("Resposta▌