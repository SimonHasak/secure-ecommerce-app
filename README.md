# icube_website

Requirements: Java 11

Launch the app within the Ide or with the maven. (mvn clean install and mvn spring:boot-run)

Backend is running on port 8080 on localhost.

http://localhost:8080

Automatic redirection to swagger / OpenAPI.

Credentials: 
   Admin: 
      -name: admin@admin.com 
      -password: admin123
   User:
      -name: user@user.com
      -password: user123

User can be created with Rest Api. Admin only as insertion to the database with data.sql for example.

## Docker-compose 

> docker-compose up -d # logs on the background 

> docker-compose up

> docker-compose down 

> docker-compose down -v # if volumes'll be mounted 

> docker-compose rm -v 

> docker-compose restart 
