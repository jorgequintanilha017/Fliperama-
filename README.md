# Fliperama-
Projeto do fliperama Classico da udacity 

Jogo arcade
Um projeto simples requerido pelo Udacity Advanced Front-End Nanodegree .
O projeto é sobre recriar um jogo clássico baseado no famoso jogo de arcade Frogger dos anos 80.

texto alternativo

Começando
Acesse http://jorgequintanilha.com.br/blog/fliperama/

Você também pode:

Clone este repositório em execução git clone https://github.com/jorgequintanilha017/Fliperama-
Baixe este repositório para o seu computador
Como o jogo funciona
A área do jogo consiste em 20 blocos, e o jogador está livre para se mover através de todos eles, exceto através de objetos fixos (árvore e planta). O objetivo principal do jogo é fazer com que o jogador chegue ao lado oposto sem ser atingido por nenhum dos inimigos.

Se o usuário escolhe um novo jogo, ele começa com:

jogadoras	inimigos	vidas	Ponto	nível
1	3	5	0	1
Os dados do jogo são salvos no localStorage.

Se o usuário optar por carregar o jogo, o jogo começa com as configurações anteriores que foram salvas.

Há um atraso intencional para o usuário estar pronto para começar de novo. O atraso acontece quando:

O jogo é reiniciado
O jogador foi atingido
O jogador alcançou o outro lado
Descrição do Jogo
Inimigos aparecem aleatoriamente na área de pedras
Cada nível que o jogador atinge, a velocidade do inimigo é aumentada
A cada 2 níveis, 1 novo inimigo é adicionado ao jogo
O número máximo de inimigos é 6
Se o jogador atingir o lado oposto sem ser atingido, o nível será aumentado para +1
A pontuação é relativamente aumentada conforme o jogador sobe de nível. Ex: se o nível for 2, a pontuação é 138, se o nível for 3 é 276 ...
Se o jogador foi atingido, o número de vidas é diminuído -1
Se o total de vidas do jogador for zero, a tela de introdução deve aparecer para o usuário jogar novamente
Não há bônus para vidas
Não há limite de pontuação
Não há limite de nível
Como jogar
texto alternativo

Use o mouse para escolher seu personagem.
Clique no botão novo jogo ou pressione enter para começar.
Use as ←↑→↓teclas para mover o jogador.
Tente atravessar a área de pedras sem ser atingido.
Diverta-se rindo
Controles
Tecla de atalho	Descrição
←	Move o jogador para a esquerda.
↑	Move o jogador para cima.
→	Move o jogador para a direita.
↓	Move o jogador para baixo.
M	Silencie o jogo.
R	Reinicia o jogo.
space	Jogue / pause o jogo.