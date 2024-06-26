# Step 1: Install bcryptjs
### Run the following command to install bcryptjs:
```npm install bcryptjs```


# Step 2: Ensure All Dependencies are Installed
### To make sure all required dependencies are installed, run the following command:

```shell
npm install
```



# ```SLQ``` & ```DATABASE```
### RUTN THE SCRIPT

[fitAura.sql](./fitAura_db/fitAura.sql)


# INSTALL LATEST MYSQL MODULE
```shell
npm install mysql@latest
```

### IN SQL SERVER CREATE THE FOLLOWING USER TO INSURE THE CONNECTION TO THE DATABASE
WILL WORK


* PASSWORD EXAPMLE ```P@ssw0rd```
--------------------

## 1. Step-by-Step Process
### Open MySQL terminal:
```shell
mysql -u root -p
```


## 2. Run the following SQL commands:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_root_password';
FLUSH PRIVILEGES;
```


# 3. Create a new user if needed:

```sql
CREATE USER 'fitaura_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'strong_password';
GRANT ALL PRIVILEGES ON fitAura_DB.* TO 'fitaura_user'@'localhost';
FLUSH PRIVILEGES;
```



# Update ```db.js```

### Make sure your db.js file uses the correct user credentials.



##
# Step 3: Start the Server
### Now you can start the server with:

# RUN THE APP

# ```npm start```

### If everything is set up correctly, you should see a message indicating that the server is running:

```shell
Server is running on port 3000
```

## ```Verify the Application```
### CHECK THE FILE 
[Verify the Application](./Verify_the_Application.md)