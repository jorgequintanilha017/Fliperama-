/* Resources.js
 * Esta � apenas uma funcionalidade de carregamento de imagens.
 * Facilita o processo de carregamento de imagens para que elas
 * possam ser usadas em seu jogo. Tamb�m inclui uma camada
 * simples de "caching", para que imagens cujo "cache" foi 
 * feito sejam reutilizadas caso voc� tente carregar a mesma
 * imagem v�rias vezes.
 * 
 */
(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /* Esta � a fun��o de carregamento de imagens dispon�vel
     * publicamente. Ela aceita uma array de strings que leva
     * a arquivos de imagem ou uma string de uma s� imagem.
     * Depois, chama nossa fun��o privada de carregamento 
     * de imagens de maneira adequada.
     */
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* Se o desenvolvedor passar uma array de imagens,
             * fa�a o loop por cada valor e chame nosso
             * carregador de imagens no arquivo de imagem.
             */
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            /* O desenvolvedor n�o passou uma array para esta
             * fun��o; suponha que o valor seja uma string
             * e chame nosso carregador de imagens diretamente.
             */
            _load(urlOrArr);
        }
    }

    /* Esta � a fun��o do carregador de imagens privado, que
     * � chamado pela fun��o do carregador de imagens p�blico.
     */
    function _load(url) {
        if(resourceCache[url]) {
            /* Se esta URL j� tiver sido carregada, ela
             * existir� em nossa array resourceCache. Basta
             * retornar aquela imagem em vez de recarreg�-la.
             */
            return resourceCache[url];
        } else {
            /* Esta URL n�o foi carregada anteriormente e n�o
             * est� em nosso cache; precisaremos carreg�-la.
             */
            var img = new Image();
            img.onload = function() {
                /* Depois que a imagem tiver sido carregada,
                 * adicione-a ao cache para que possamos apenas
                 * retorn�-la caso o desenvolvedor tente
                 * carregar o arquivo novamente no futuro.
                 */
                resourceCache[url] = img;

                /* Depois que a imagem tiver mesmo sido
                 * carregada e seu cache tiver sido feito,
                 * chame todos os callbacks de onReady()
                 * que definimos.
                 */
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* Define o valor inicial do cache como false, isso
             * mudar� quando o manipulador do evento onload da
             * imagem for chamado. Por fim, direcione o atributo
             * src da imagem para a URL definida.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* Isto � usado por desenvolvedores para pegar refer�ncias
     * de imagens que eles sabem que j� foram carregadas. Se o 
     * cache de uma imagem � feito, isso tem o mesmo efeito
     * que chamar load() naquela URL.
     */
    function get(url) {
        return resourceCache[url];
    }

    /* Esta fun��o determina se todas as imagens solicitadas
     * para carregamento foram carregadas corretamente.
     */
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* Essa fun��o adicionar� uma fun��o ao stack de
     * callback que � chamado quando todas as imagens
     * solicitadas forem corretamente carregadas.
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* Este objeto define as fun��es acess�veis
     * publicamente aos desenvolvedores ao criar
     * um ojeto de Recursos global.
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();