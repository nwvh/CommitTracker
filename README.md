# ⚙️ CommitTracker
This web server listens for incoming GitHub webhook payloads triggered by repository events. When a commit, issue or an PR is pushed, the server processes the payload and sends an embed message to a Discord channel using a webhook.
<br>
In the payloads/ folder you will find the default payloads samples that are being sent to your webhook by GitHub.
# Setup
```sh
git clone https://github.com/nwvh/CommitTracker/
cd CommitTracker
# Edit your config in src/config/config.ts
npm i
npm start
```

# Usage
* Upon starting the webserver, you're going to see the payload listener url and port. You will need to replace the "localhost" with your public IP address. Make sure the port you've set in your config file is accessible to everybody!
* Go to any github repo of your choice
* Click **Settings** on in the top navbar
* Go to **Webhooks**
* Select **Add Webhoo**k
* Set the payload url to **http://ip:port/webhook**
* Set the Content Type to **application/json**
* Leave everything else as it is and save the settings
* Now, when the repo receives any commit, PR or an issue (depending on your config), the webserver will handle the payload and send an embed message to your discord webhook!

# Screenshot
![image](https://github.com/nwvh/CommitTracker/assets/76164598/9623a872-4afc-4d66-ae50-4aa27bfc9d9d)
