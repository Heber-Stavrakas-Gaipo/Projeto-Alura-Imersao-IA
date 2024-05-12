# Projeto Alura - Imersão IA + Google

<div aLign="center">
  
  ![brasil_flag](./public/images/BrasilFlag.png)
  
</div>

<p align="center">O desafio final da Imersão tem por objetivo desenvolver algo que seja útil, criativo e eficaz. Por meio desse documento apresento a minha proposta de resolução do desafio, envolvendo a utilização da API do Google, web scraping para gerar respostas relacionadas e limitadas ao conteúdo em questão.</p>

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

O objetivo desse projeto é, utilizando a IA Generativa do Google, gerar um quiz com fins educativos sobre países, trazendo dicas e curiosidades geradas artificialmente com base em web scraping.

Através desse método pode-se gerar rotas com quizes sobre diversos assuntos, principalmente de fins escolares.

<div aLign="center">

![BrasilFlag_with_curiosity](./public/images/BrasilFlagCuriosity.png)

</div>

## Sobre

Quando a página inicia é sortido um índice dentro do arquivo `countries.json` e seleciona o nome do país de acordo com esse índice e armazena em `country_name`.

É solicitado para a API do Gemini que gere uma dica, da seguinte forma: `` const result = await chat.sendMessage(
      `Escreva uma dica em uma frase sobre "${country_name}", mas que não contenha a palavra "${country_name}". Extraia essa informação do texto "${page_content}", sem incluir informações que não estejam presentes nele.`
    );  ``.

A imagem gerada no frontend recebe o src como `https://static.significados.com.br/flags/` incluindo o sufixo relacionado com a `sigla2` presente no mesmo índice do `country_name` em `countries.json` e é armazenada em `countrySG`:

- `` const imgURL = `https://static.significados.com.br/flags/${countrySG.toLowerCase()}.svg`; ``
- Esse link segue o mesmo padrão para todas as siglas dos países em letras minúsculas (`.toLowerCase()`)

Com o `country_name` é feito um tratamento da variável para que se inclua no endereço da Wikipédia, que segue um padrão, sendo `https://pt.wikipedia.org/wiki/ + Nome_Do_País`.

Relacionado ao web scraping, o conteúdo da página Wikipédia é armazenado na variável `page_content` e a curiosidade gerada na tela depois de submetida a resposta do quiz é gerada pelo comando `` const result = await chat.sendMessage(`Escreva uma breve curiosidade sobre "${page_content}" apenas utilizando o conteúdo do texto. Adote um linguajar interessante e carismático.`); ``

- Web scraping
  - Trata-se de um método digital que extrai dados de sites específicos para transformá-los em informações úteis.
  - Agora, vamos ver alguns dos usos mais legais do web scraping:
    - Análise de mercado: monitorar preços e tendências para tomar decisões estratégicas no seu negócio.
    - Pesquisa de dados: coletar informações para pesquisas acadêmicas ou projetos pessoais.
    - Automação de tarefas: automatizar tarefas repetitivas, como atualizar planilhas com dados de sites.

O `result` também recebe tratamento para remover os caracteres especiais de Markdown que recebe no output.

Com esse método, por mais que um país seja sorteado mais de uma vez, a dica e a curiosidade será sempre uma novidade!

Os 4 botões do quiz são 1 para a resposta correta e os outros 3 possuem valores sorteados aleatoriamente de índices no `countries.json` e a posição dos botões também é gerada aleatoriamente.

---

Arquivos mencionados na seção:

<div aLign="center" style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 8px;">
  <a href="./countries.json"><img src="https://img.shields.io/badge/countries.json-5E5C5C?style=for-the-badge&logo=json&logoColor=white"/></a>
  <a href="./server.js"><img src="https://img.shields.io/badge/server.js-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/></a>
</div>

---

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
  <img style="width: 500px;" alt="Chile" src="./public/images/Chile.png" />
  <img style="width: 500px;" alt="Equador" src="./public/images/Equador.png" />
  <img style="width: 500px;" alt="Gana" src="./public/images/Gana.png" />
  <img style="width: 500px;" alt="Honduras" src="./public/images/Honduras.png" />
  <img style="width: 500px;" alt="Kuwait" src="./public/images/Kuwait.png" />
  <img style="width: 500px;" alt="Noruega" src="./public/images/Noruega.png" />
</div>
