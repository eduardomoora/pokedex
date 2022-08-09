<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

#Execute in development

1. clone repository
2. execute
```js
run yarn install
```
3. install nestjs CLI
```js
npm install -g nestjs/cli
```

4. start database

``` 
docker-compose up -d
```

5.clone file __.env.template__ and rename to __.env__


6.insert seed - This will create data in the database 
```
GET  /api/v2/seed
```

