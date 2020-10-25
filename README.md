# Find My Pizza

Projeto final da Semana Super Full Stack #3 da [OneBitCode](https://onebitcode.com/).

A aplicação permite que o usuário encontre e dê review nas pizzarias mais próximas através da integração com o Google Maps. Disponível na **web** (React) e em formato **mobile** (React Native), utilizando uma API desenvolvida em Ruby on Rails.

## Como utilizar

### Pré-requisitos

#### Iniciando a API

**Passos necessários tanto para Web quanto Mobile.**

---

Entre na pasta referente à API.
```sh
$ cd api
``` 
Rode a API especificando a porta 3001.
```sh
$ rails s -p 3001
``` 

### Web
Em uma outra janela - ainda com a primeira, referente à API - aberta, entre na pasta _web_ do projeto.
```sh
$ cd web
``` 
Inicie a aplicação web. 
```sh
$ yarn start
```  
A mesma estará disponível no endereço [http:localhost:3000/](http:localhost:3000/).

### Mobile
Em uma outra janela - ainda com a primeira, referente à API - aberta, entre na pasta _mobile_ do projeto.
```sh
$ cd mobile
```
Inicie o serviço do Expo.
```sh
$ expo start
```
Em uma janela separada, navegue ao diretório onde o **Ngrok** está localizado. Em seguida, inicie o mesmo especificando a porta 3001.
```sh
$ ./ngrok http 3001
```
Copie um dos endereços gerados pelo Ngrok gerados após a realização do passo 3.
```sh
$ ./ngrok http 3001

ngrok by @inconshreveable                       (Ctrl+C to quit)
                                                                         
Session Status      online                                                          
Session Expires     7 hours, 59 minutes                                             
Version             2.3.35                                                          
Region              United States (us)                                              
Web Interface       http://127.0.0.1:4040   
# Copie um dos endereços abaixo
Forwarding          http://12106e8d08f5.ngrok.io -> http://localhost:3001           
Forwarding          https://12106e8d08f5.ngrok.io -> http://localhost:3001          

Connections         ttl     opn     rt1     rt5     p50     p90                                          
                    0       0       0.00    0.00    0.00    0.00          
```

Cole a URL na **baseURL** do arquivo `api.js`, localizado no diretório `/src/services`.

```javascript
// src > services > api.js
import axios from 'axios';

const Api = axios.create({
  baseURL: <sua_url>
})

export default Api;
```

No total, devem existir 3 janelas abertas:
* **Expo**, no qual está rodando a aplicação mobile;
* **Servidor Rails**, no qual está rodando a API;
* **Servidor Ngrok**, no qual está disponibilizando a API de forma pública na web.
