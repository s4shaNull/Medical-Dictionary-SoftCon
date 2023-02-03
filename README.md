# Medical-Dictionary-SoftCon
MedDict is a translation tool designed for healthcare professionals and students. It allows users to look up medical terms in both English and Vietnamese, with the option to listen to the pronunciation of the terms through text-to-speech functionality. With a user-friendly interface and comprehensive coverage of medical terminology, MeDict aims to improve communication and understanding in multilingual medical settings like VinUniversity or VinMec. The tool is constantly updated to ensure the accuracy and relevance of its content.

## Step 1: Install Docker Desktop
**Linux**: Go to [this link](https://docs.docker.com/desktop/install/linux-install/)

**MacOS**: Go to [this link](https://docs.docker.com/desktop/install/mac-install/)

**Windows**: Go to [this link](https://docs.docker.com/desktop/install/windows-install/)

## Step 2: Clone this repository
```
$ git clone https://github.com/s4shaNull/Medical-Dictionary-SoftCon --config core.autocrlf=input
```
The **--config core.autocrlf** option is required since line endings between Windows and Linux/macOS are different.

## Step 3: Run docker-compose up
Change your working directory to Medical-Dictionary-SoftCon/ and run this command to deploy:

```
> cd Medical-Dictionary-SoftCon/ 
> docker compose up -d --build
```

After finishing all these steps, you can access the website via browser using the following URL:
```
http://localhost:3000/
```
![image](https://user-images.githubusercontent.com/84661482/210073977-a431250a-e4f7-4e44-8e6f-9c8abbaf4204.png)
