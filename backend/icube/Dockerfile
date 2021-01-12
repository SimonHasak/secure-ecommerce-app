FROM openjdk:11
EXPOSE 8080
# copy the packaged jar file into our docker image
COPY target/icube-0.0.1-SNAPSHOT.jar /icube.jar

# set the startup command to execute the jar
CMD ["java", "-jar", "/icube.jar"]