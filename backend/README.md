:+1: **Dockerize frontend**

:+1: **Mount volumes via docker-compose.yml**

:+1: **PhpMyAdmin?** 

### Local machine (path): 

---
```
C:/{USER}/{DESKTOP}/icube_website\backend\icube\> mvn package   
C:/{USER}/{DESKTOP}/icube_website\backend\icube\> cd ../../
C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker-compose up -d --build
C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker ps -a #Verify if the docker-compose succeeded
```
---
### if not check logs: 
```
C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker logs backend-icube_website  #backend
C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker logs frontend-icube_website #frontend
C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker logs database-icube_website #database
```
---
### docker inspect:
```
C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker inspect backend-icube_website  #backend
C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker inspect frontend-icube_website #frontend
C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker inspect database-icube_website #database
```
---
### You can get an error if you are not using Linux, but Win, then you need via VM setttings to set up up port forwarding on default port for database which is 3306. 
---
### docker image list: 
`C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker image ls 
`
---
### docker image rm:
`C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker image rm icube_website_backend-icube
`
---
### If you need to stop: 
---
`C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker-compose down 
`
---
### I think it's needed to set up volumes for docker-compose.yml f.e: /opt/apps/<icube_website>
---
### Use database-icube_website docker container as root
---
`C:/{USER}/{DESKTOP}/icube_website\backend\icube\> docker exec -it -u root database-icube_website bash
root@<containerID>:/# mysql -u root -p
Enter password: -> rootadmin
`
---
### Check database-icube_website database, tables
`mysql> show DATABASES;`
`mysql> use icube_website;`
`mysql> show tables;`
---


 

