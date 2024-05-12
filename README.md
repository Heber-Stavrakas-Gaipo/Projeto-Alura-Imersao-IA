# Projeto Alura - Imersão IA + Google

<div aLign="center">
  
  ![image](https://github.com/Heber-Stavrakas-Gaipo/Projeto-Alura-Imersao-IA/assets/134441744/363f9892-57f5-456e-8fc8-47847b2926e9)
  
</div>

<p align="center">O desafio final da Imersão tem por objetivo desenvolver algo que seja útil, criativo e eficaz. Por meio desse documento apresento a minha proposta de resolução do desafio, envolvendo a utilização da API do Google, web scrapping para gerar respostas relacionadas e limitadas ao conteúdo em questão.</p>


<p align="center">
  <a href="#autor">Autor</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#objetivo">Objetivo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#referencias">Referências</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp
  <a href="#exemplos">Exemplos</a>
</p>

## Autor
Meu nome é Héber Stavrakas Gaipo, sou estudante de Engenharia da Computação e estou participando da Imersão Alura + Google, 2ª edição - 2024.

<div aLign="center" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 8px;">
  <a href="https://www.linkedin.com/in/heber-stavrakas-gaipo/" style="margin: 0.4rem 0;"><img aLign="center" alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="https://www.instagram.com/heber_stavrakas/" style="margin: 0.4rem 0;"><img aLign="center" alt="Instagram" src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a>
  <a href="https://github.com/Heber-Stavrakas-Gaipo" style="margin: 0.4rem 0;"><img aLign="center" alt="GitHub" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://github.com/Heber-Stavrakas-Gaipo/Portfolio" style="margin: 0.4rem 0;"><img aLign="center" alt="Portfolio" src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://heber-stavrakas-gaipo.github.io/DevLinksTree/" style="margin: 0.4rem 0;"><img aLign="center" alt="DevLinksTree" src="https://img.shields.io/badge/DevLinksTree-hhh?style=for-the-badge" /></a>
  <a href="mailto:contatohebergaipo@gmail.com" style="margin: 0.4rem 0;"><img aLign="center" alt="Gmail" src="https://img.shields.io/badge/Gmail-333333?style=for-the-badge&logo=gmail&logoColor=red" /></a>
</div>

## Objetivo
O objetivo desse projeto é, utilizando a IA Generativa do Google, gerar um quiz com fins educativos sobre países, trazendo dicas e curiosidades geradas artificialmente com base em web-scrapping.

Através desse método pode se gerar rotas com quizes sobre diversos assuntos, principalmente de fins escolares.

<div aLign="center">

  ![image](https://github.com/Heber-Stavrakas-Gaipo/Projeto-Alura-Imersao-IA/assets/134441744/27964152-fd60-4b26-aa1c-ff7059855488)
  
</div>

## Sobre
Quando a página inicia é sortido um índice dentro do arquivo ```countries.json``` e seleciona o nome do país de acordo com esse índice e armazena em ```country_name```.

É solicitado para a API do Gemini que gere uma dica, da seguinte forma: ```const result = await chat.sendMessage(`Escreva uma dica em uma frase sobre ${country_name}, mas que não contenha a palavra ${country_name}`);```.

Com o ```country_name``` é feito um tratamento da variável para que se inclua no endereço da Wikipédia, que segue um padrão, sendo ```https://pt.wikipedia.org/wiki/ + Nome_Do_País```.

Relacionado ao web scrapping, o conteúdo da página Wikipédia é armazenado na variável ```page_content``` e a curiosidade gerada na tela depois de submetida a resposta do quiz é gerada pelo comando ```const result = await chat.sendMessage(`Escreva uma breve curiosidade sobre ${page_content}`);```

O ```page_content``` também recebe tratamento para remover os caracteres especiais de Markdown que recebe no output.

Com esse método, por mais que um país seja sorteado mais de uma vez, a dica e a curiosidade será sempre uma novidade!

## Tecnologias
<div aLign="center" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 8px">
  <img aLign="center" alt="ExpressJS" src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img aLign="center" alt="Gemini" src="https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=fff" />
  <img aLign="center" alt="Git" src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" />
  <img aLign="center" alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" />
  <img aLign="center" alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
  <img aLign="center" alt="Markdown" src="https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white" />
  <img aLign="center" alt="NodeJS" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img aLign="center" alt="VSCode" src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" />
</div>

## Referencias
<div aLign="center" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 8px">
  <img aLign="center" alt="FreeCodeCamp" src="https://img.shields.io/badge/Freecodecamp-%23123.svg?&style=for-the-badge&logo=freecodecamp&logoColor=green" />
  <img aLign="center" alt="NPM" src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" />
  <img aLign="center" alt="W3Schools" src="https://img.shields.io/badge/W3Schools-04AA6D?style=for-the-badge&logo=W3Schools&logoColor=white" />
  <img aLign="center" alt="Wikipedia" src="https://img.shields.io/badge/Wikipedia-%23000000.svg?style=for-the-badge&logo=wikipedia&logoColor=white" />
</div>

## Exemplos
<div aLign="center" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 8px;">
  <img style="width: 500px;" alt="Brunei" src="https://github.com/Heber-Stavrakas-Gaipo/Projeto-Alura-Imersao-IA/assets/134441744/418159f1-474c-42a7-8001-37eea0d226bb" />
  <img style="width: 500px;" alt="Macau" src="https://github.com/Heber-Stavrakas-Gaipo/Projeto-Alura-Imersao-IA/assets/134441744/4cdc5b77-d738-48cb-8ac9-944d9671eddc" />
  <img style="width: 500px;" alt="Haiti" src="https://github.com/Heber-Stavrakas-Gaipo/Projeto-Alura-Imersao-IA/assets/134441744/e6f20c30-ea46-432e-b021-19da0e9ba616" />
  <img style="width: 500px;" alt="China" src="https://github.com/Heber-Stavrakas-Gaipo/Projeto-Alura-Imersao-IA/assets/134441744/a7432790-b6a9-4f3c-aa6f-0d7efe99481e" />
</div>
