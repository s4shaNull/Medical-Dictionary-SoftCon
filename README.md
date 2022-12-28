# Medical-Dictionary-SoftCon
An online medical dictionary developed by the SoftCon Team of VinUni.

## Step 1: Virtualization
**Linux**: Does not required

**MacOS**: Does not required

**Windows**:
If you have already enabled WSL2 on your Windows machine, but haven't installed any Linux distro, I suggest going to [this link](https://ubuntu.com/wsl) to install Ubuntu on WSL.

It you haven't enabled WSL2. You must be running Windows 10 version 2004 and higher (Build 19041 and higher) or Windows 11 to use the commands below. Go to [this link](https://learn.microsoft.com/en-us/windows/wsl/install) to figure out how to do this. Ubuntu should be automatically installed on your WSL after this.

## Step 2: Install Docker
**Linux/ WSL**: Go to [this link](https://docs.docker.com/engine/install/ubuntu/). You will also have to install the **docker-compose** utility using the following Bash  command:
```
$ sudo apt-get install docker-compose
```
<br>

**MacOS**: Go to [this link](https://docs.docker.com/desktop/install/mac-install/)

## Step 3: Turn on Docker service
```
$ sudo service docker start
```
## Step 4: Clone this repository
```
$ git clone https://github.com/s4shaNull/Medical-Dictionary-SoftCon
```

## Step 5: Change the IP addresses in the HTTP requests in the Search.js and Result.js files
First, get the WSL's IPv4 address on eth0 interface using this command:
```
$ ifconfig
```
The output will be like this:

![image](https://user-images.githubusercontent.com/89685724/209780540-5cf9367b-0ad2-440d-9aa1-d01f5066c591.png)

Paste that IP address into the HTTP requests of the **handleOnSearch()** and **handleOnSelect()** functions of the **Search.js** file located in **frontend/src/components/EnPage/**:

![image](https://user-images.githubusercontent.com/89685724/209781261-20131492-b847-455e-a855-b36932a21633.png)
![image](https://user-images.githubusercontent.com/89685724/209781216-7dfa4f52-bacc-477a-81c3-f888d5f178ff.png)

and the **function1()** and **function2()** of the **Result.js** file located in **frontend/src/components/EnPage/**:

![image](https://user-images.githubusercontent.com/89685724/209781433-691cf5ff-cc9b-4e9a-99a3-cea1829cad42.png)

## Step 6: Run docker-compose up
```
$ sudo docker-compose up -d --build
```

If you want to apply new changes to the containers, run the following commands:
```
$ sudo docker-compose rm --all &&
$ sudo docker-compose pull &&
$ sudo docker-compose build --no-cache &&
$ sudo docker-compose up -d --force-recreate &&
```

After finishing all these steps, you can access the website via browser using the following URL:
```
http://[WSL_IP_ADDR_ON_ETH0]:3000/
```




