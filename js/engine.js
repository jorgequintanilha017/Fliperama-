/* Engine.js
 * Este arquivo mostra a funcionalidade do loop do jogo (render e entidades
 * de update), esbo�a o tabuleiro inicial do jogo na tela e, depois, chama
 * os m�todos update e render para os objetos dos inimigos e de seu jogador
 * (definidos em seu app.js).
 *
 * Um mecanismo de jogo desenha toda a tela do jogo v�rias vezes, meio
 * como um foliosc�pio, que d� a ilus�o de "anima��o" �s imagens.
 * Quando seu jogador se move pela tela, pode parecer que apenas aquele(a)
 * imagem/personagem est� se movendo ou sendo desenhado(a), mas esse n�o �
 * o caso. O que realmenbte ocorre � que toda a "cena" est� sendo desenhada
 * diversas vezes, dando a ilus�o de anima��o.
 *
 * Este mecanismo disponibiliza globalmente o objeto context (ctx)
 * do canvas, a fim de escrever app.js mais simples de lidar.
 */

var Engine = (function(global) {
    /* Pr�-defina as vari�veis que usaremos neste escopo,
     * crie o elemento canvas, pegue o contexto 2D desse
     * canvas, configure a altura/largura dos elementos do
     * canvas e adicione isso ao DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* Esta fun��o age como o ponto de largada do loop do jogo em si e
     * lida com as chamadas dos m�todos render e update de forma adequada.
     */
    function main() {
        /* Obtenha a informa��o delta de tempo, que � exigida caso seu jogo
         * requeira uma anima��o fluida. Como cada computador processa
         * instru��es em velocidades diferentes, precisamos de um valor
         * de constante que seja o mesmo para todos (independentemente da
         * velocidade do computador).
         * 
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Chame suas fun��es update/render e passe o delta de tempo para a
         * fun��o update, pois ele pode ser usado para melhorar a anima��o.
         */
        update(dt);
        render();

        /* Defina a vari�vel lastTime, que ser� usada para definir o delta
         * de tempo na pr�xima vez em que essa fun��o for chamada.
         */
        lastTime = now;

        /* Use a fun��o requestAnimationFrame do navegador para chamar essa
         * fun��o novamente quando o navegador puder desenhar outro frame.
         */
        win.requestAnimationFrame(main);
    }

    /* Esta fun��o faz algumas configura��es iniciais que s� devem ocorrer
     * uma vez, especialmente a defini��o da vari�vel lastTime, que �
     * exigida para o loop do jogo.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* Esta fun��o � chamada pela principal (o loop de nosso jogo), e ela
     * mesma chama todas as fun��es possivelmente necess�rias para
     * atualizar os dados da entidade. Com base na implementa��o de sua
     * detec��o de colis�o (quando duas entidades ocupam o mesmo espa�o -
     * por exemplo, quando seu personagem deve morrer), voc� pode achar
     * necess�rio adicionar mais uma chamada de fun��o aqui. Por enquanto,
     * s� fizemos coment�rios - voc� pode implementar essa funcionalidade
     * dessa maneira ou n�o (tamb�m pode implementar a detec��o de colis�o
     * apenas nas pr�prias entidades, em seu arquivo app.js).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /* � chamada pela fun��o update, faz loops por todos os objetos dentro
     * de sua array allEnemies, como definido no app.js, e chama
     * seus m�todos update(). Ent�o, chama a fun��o update do objeto de
     * seu jogador. Esses m�todos update devem focar apenas em atualizar
     * os dados/propriedades relacionados ao objeto. Fa�a seus desenhos
     * nos m�todos render.
     */
    function updateEntities(dt) {

        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        
    }

    /* Esta fun��o primeiro deseha o "n�vel do jogo" e, depois, chama a
     * fun��o renderEntities. Lembre-se de que esta fun��o � chamada a
     * cada "tique" do jogo (ou loop do mecanismo do jogo), pois � como os
     * jogos funionam - s�o foliosc�pios que geram a ilus�o de anima��o,
     * mas est�o apenas desenhando a mesma tela v�rias vezes.
     */
    function render() {
        /* Esta array armazena a URL relativa � imagem usada
         * para aquela linha espec�fica do n�vel do jogo.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        
        // Antes de fazer os desenhos, limpe os canvas existentes
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Fa�a o loop pelo n�mero de linhas e colunas que definimos acima
         * e, usando a array rowImages, desenhe a imagem correta para
         * aquela parte da "grade"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* A fun��o drawImage do elemento do contexto do canvas
                 * exige 3 par�metros: a imagem, a coordenada x e a 
                 * coordenada y a serem desenhadas. Estamos usando nossa 
                 * ajuda, dos recursos, para nos referirmos �s imagens
                 * de forma a obtermos os benef�cios de fazer seu cache,
                 * j� que as usamos o tempo todo.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* Esta fun��o � chamada pela fun��o render, e isso ocorre a cada tique
     * do jogo. Seu prop�sito � chamar as fun��es render que voc� definiu
     * nas entidades de seu jogador e seus inimigos dentro do app.js
     */
    function renderEntities() {
        /* Fa�a o loop por todos os objetos dentro da array allEnemies
         * e chame a fun��o render que voc� definiu.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    /* Esta fun��o n�o faz nada, mas pode ser um bom local para lidar com os
     * estados de reinicializa��o do jogo - talvez, um novo menu de jogo, uma
     * tela de fim de jogo ou coisas assim. � chamada s� uma vez pelo
     * m�todo init().
     */
    function reset() {

    }

    /* V� em frente e carregue todas as imagens que sabemos que ser�o
     * necess�rias para desenhar o n�vel do jogo. Depois, defina init como o
     * m�todo de callback para que, quando todas essas imagens forem
     * adequadamente carregadas, nosso jogo comece.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/Heart.png',
        'images/gameover.png',
        'images/enemy-bug.png',
        'images/char-horn-girl.png'
    ]);
    Resources.onReady(init);

    /* Aloque o objeto context do canvas na vari�vel global (o objeto
     * window quando executado em um navegador) para que desenvolvedores
     * possam us�-lo com mais facilidade em seus arquivos app.js.
     */
    global.ctx = ctx;
})(this);