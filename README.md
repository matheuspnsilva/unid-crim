# unid-crim
Calculador de distâncias para unidades de criminalística

Link: https://akira-pak.github.io/unid-crim/mapa.html

Instruções de utilização na própria página.

Baseado no projeto Store Locator: https://github.com/googlemaps/js-store-locator 

Modificações implementadas:

1 - alteração da fonte de dados: arquivo "unidades2.csv" contendo os dados das unidades de criminalística obtidos a partir da página pf.gov.br e coordenadas a partir do Google Maps. Arquivo foi formatado de forma a ser lido pelo parser do script "medicare-static-ds.js".

2 - foi criado um projeto no Google API Console para obtenção de chave API, sendo habilitadas as APIs Places API Web Service, Maps Javascript API, Maps Directions API e Maps Geocoding API.

3 - panel.js modificado para o carregamento inicial seja centralizado em Brasília, com o nível de zoom apropriado para exibir o país inteiro.

4 - medicare-statis-ds.js modificado para carregar os dados do arquivo unidades2.csv (endereço do arquivo + colunas da tabela), deixando de fora as colunas que seriam utilizadas para os filtros.

5 - store-locator.min.js modificado para que a unidade de criminalística seja definida como origem da rota, e não destino.

6 - mapas.html modificado para carregar os arquivos acima, e para utilizar a chave API gerada para o projeto.

