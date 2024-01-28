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

# Check if your server is working
You run the following CURL command in your terminal to see if your webhook is working:

```
curl -X POST -H "Content-Type: application/json" -d "{\"ref\":\"refs/heads/main\",\"before\":\"57c352fc6cd0241ac1ff84553682aa551f057c4e\",\"after\":\"f75a6761cf17076e3fb4d3d5b67630e4b503df3c\",\"repository\":{\"id\":749471848,\"node_id\":\"R_kgDOLKwIaA\",\"name\":\"webhookdatatest\",\"full_name\":\"nwvh/webhookdatatest\",\"private\":true,\"owner\":{\"name\":\"nwvh\",\"email\":\"76164598+nwvh@users.noreply.github.com\",\"login\":\"nwvh\",\"id\":76164598,\"node_id\":\"MDQ6VXNlcjc2MTY0NTk4\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/76164598?v=4\",\"gravatar_id\":\"\",\"url\":\"https://api.github.com/users/nwvh\",\"html_url\":\"https://github.com/nwvh\",\"followers_url\":\"https://api.github.com/users/nwvh/followers\",\"following_url\":\"https://api.github.com/users/nwvh/following{/other_user}\",\"gists_url\":\"https://api.github.com/users/nwvh/gists{/gist_id}\",\"starred_url\":\"https://api.github.com/users/nwvh/starred{/owner}{/repo}\",\"subscriptions_url\":\"https://api.github.com/users/nwvh/subscriptions\",\"organizations_url\":\"https://api.github.com/users/nwvh/orgs\",\"repos_url\":\"https://api.github.com/users/nwvh/repos\",\"events_url\":\"https://api.github.com/users/nwvh/events{/privacy}\",\"received_events_url\":\"https://api.github.com/users/nwvh/received_events\",\"type\":\"User\",\"site_admin\":false},\"html_url\":\"https://github.com/nwvh/webhookdatatest\"},\"sender\":{\"login\":\"nwvh\",\"id\":76164598,\"node_id\":\"MDQ6VXNlcjc2MTY0NTk4\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/76164598?v=4\",\"gravatar_id\":\"\",\"url\":\"https://api.github.com/users/nwvh\",\"html_url\":\"https://github.com/nwvh\"},\"head_commit\":{\"id\":\"f75a6761cf17076e3fb4d3d5b67630e4b503df3c\",\"distinct\":true,\"message\":\"Create aaa.txt\",\"timestamp\":\"2024-01-28T18:33:18+01:00\",\"url\":\"https://github.com/nwvh/webhookdatatest/commit/f75a6761cf17076e3fb4d3d5b67630e4b503df3c\",\"added\":[\"aaa.txt\",\"bbb.txt\",\"ccc.txt\"],\"removed\":[\"aaa.txt\",\"bbb.txt\",\"ccc.txt\"],\"modified\":[\"aaa.txt\",\"bbb.txt\",\"ccc.txt\"]}}" http://localhost:3000/webhook
```
If it's working, the webhook will be sent

If not, you will see an error in your console

# Screenshot
![image](https://github.com/nwvh/CommitTracker/assets/76164598/db462616-096e-4ccc-84d4-565193708566)
