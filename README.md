# p05 by YNCA

## Roster
- Tim Ng (Project Manager)
- Aditya Anand
- Jason Chao
- Stella Yampolsky

## Description
Our project is a recreation of Project 0 (the storytelling website), designed to be more interactive and “fun.” The registration page mimics The Password Game, requiring users to complete a minigame to create a valid password. After logging in, users will navigate the site and encounter obstacles while progressing through different storytelling pages. Upon navigating through the website, the user will receive a reward.

## Install Guide
  To install, go to the top of the page and click the green button that says "Code". In the dropdown that appears, click "Download Zip" at the bottom. Extract the zip from your downloads into your home directory. <br>

OR
  
  To clone the repository, go to the top of the page and click the green button that says "Code". In the dropdown that appears, choose either "HTTPS" or "SSH" under the "Clone" section and copy the provided URL. Open up your computer's terminal and type "git clone {URL HERE}"
  
## Launch Codes
Site can be viewed at https://tinyboxtim.tech/

OR

  1. Make a python virtual environment

      a. Open up your device's terminal

      b. Type ```$ python3 -m venv {path name}``` or ```$ py -m venv {path name}```

      c. Type in one of the commands into your terminal for your specific OS to activate the environment

      - Linux: ```$ . {path name}/bin/activate```
    
      - Windows Command Prompt: ```> {path name}\Scripts\activate```

      - Windows PowerShell: ```> . .\{path name}\Scripts\activate```

      - MacOS: ```$ source {path name}/bin/activate```

      (If successful, the command line should display the name of your virtual environment: ```({path name})$ ```)

      d. When done, type ```$ deactivate``` to deactivate the virtual environment

  3. Ensure your virtual environment is activated

  4. Access the repository by typing ```$ cd p05```

  5. Type ```$ pip install -r requirements.txt``` to install the required modules

 - If terminal returns ```zsh: command not found: pip```, type ```$ pip3 install -r requirements.txt``` because ```$ pip``` is for python2.

  6. Navigate to app by typing ```$ cd app/```
    
  8. Type ```$ python3 __init__.py``` to run the application

  9. Copy / type "http://127.0.0.1:5000" or "http://localhost" onto a browser to view the website

----
Credit: Install Guide and Launch Codes from CoolBeans P00



