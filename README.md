setup data base using cmd:
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d -p 3306:3306 mysql:8.0
 
setup database manager using cmd:
docker run --name phpmyadmin -d --link some-mysql:db -p 8081:80 phpmyadmin

when containers have started in docker start the server in the folder.

run "npm i" to install packages and then "npm run dev"
