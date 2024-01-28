import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import Config from "./config/config"
const app = express();

if (Config.Webhook == "") {
  console.log("[ERROR] Your Webhook is not set!")
} else if (!Config.Port) {
  console.log("[ERROR] Your port is set incorrectly!")
} 

app.use(bodyParser.json());

app.post('/webhook', async (req: Request, res: Response) => {
    let data = req.body

    // Check if accepted payload is valid
    if (!data.repository || !data.repository.full_name) {
      console.log("[INFO] Invalid payload received! " + JSON.stringify(data));
      return;
    }
    console.log(`[INFO] Received payload from ${data.repository.full_name}`);
    const repo = data.repository.name
    const currentTimestamp = new Date();
    const formattedDate = currentTimestamp.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const formattedTime = currentTimestamp.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    
    const addedFiles: string[] = data.head_commit.added;
    const modifiedFiles: string[] = data.head_commit.modified;
    const removedFiles: string[] = data.head_commit.removed;
    
    const formatFileList = (files: string[]) => {
      return files.length > 0
        ? files.join('\n')
        : "None";
    };
    
    const addedFilesList: string = formatFileList(addedFiles);
    const modifiedFilesList: string = formatFileList(modifiedFiles);
    const removedFilesList: string = formatFileList(removedFiles);
    
    try {
      const payload = {
        embeds: [
          {
            author: {
              name: data.sender.login,
              url: data.sender.html_url,
              icon_url: data.sender.avatar_url
            },
            footer: {
              text: `🌠 CommitTracker by WX | ${formattedDate} - ${formattedTime}`,
            },
            title: `New Commit - ${data.head_commit.id.substring(0, 8)}`,
            url: `${data.head_commit.url}`,
            description: `\`📝\` Message \`\`\`${data.head_commit.message}\`\`\`\n`,

            fields: [
              {
                name: '`📁` Repository',
                value: `[${repo}](${data.repository.html_url})`,
                inline: false,
              },
              {
                name: '`✅` Added Files',
                value: `\`\`\`${addedFilesList}\`\`\``,
                inline: true,
              },
              {
                name: '`❌` Removed Files',
                value: `\`\`\`${removedFilesList}\`\`\``,
                inline: true,
              },
              {
                name: '`❓` Modified Files',
                value: `\`\`\`${modifiedFilesList}\`\`\``,
                inline: true,
              },
            ],
            color: 10053324,
          },
        ],
      };
    
        await axios.post(Config.Webhook, payload);
      } catch (error) {
        console.error('[ERROR] Discord webhook couldn\'t be sent. ', error);
      }
    res.sendStatus(200);
});

app.listen(Config.Port, () => {
  console.log(`Webhook listener is running at http://localhost:${Config.Port}/webhook`);
});
