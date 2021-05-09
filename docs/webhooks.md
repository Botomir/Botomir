## Webhooks

Webhooks are a really cool way of registering for callbacks from a service. 
They let you tell some service, say [Github] for example, that you want to be told every time there is a new push to the `main` branch on [SoorajModi/Botomir](https://github.com/SoorajModi/Botomir). 
You can register a callback URL and Github will send a payload whenever the event happens. 
This is super useful if you want to recieve a new notification for a project your working on or something like that. 

Currently Botomir has supports for a couple types of webhook events, although we are planning on adding support for more soon.
- [Github webhooks](https://docs.github.com/en/developers/webhooks-and-events/about-webhooks)
- [Gitlab webhooks](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html)


#### Adding your webhook

To add a webhook its pretty simple:

1. You need to go to [botomir.com/settings](https://botomir.com/settings) and login if you need to
2. Select the server that you want to configure, **Note: you can only configure servers that you have the botomir admin role on.**
3. Select webhooks
4. Click the `New Webhook button`
5. Select the channel that you want the webhook to send the message in (this can be edited later)
6. Select the type of webhook that you are adding, this is important so the message can be handled properly, and it can not be updated later. 
7. Fill in the message that you want to have sent when the event happens. You are able to include any of the fields from the original payload from the provider, see their documentation to see what they are called. The message can be updated later.
8. Click save.
9. Enter the `webhook URL` that you are given into the URL field for webhook provider, and make sure that you also enter the secret key, you will not be able to get that value again once you leave the page.
10. Done, you can now start receiving webhooks for any of your events. 

#### Webhook Message format

Instead of sending the exact same message every time the webhook happens you are able to configure it a little bit based off of the information that is included within the event.
For example, if you were to sign up for the [Github issue event](https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#issues), you can have a message like:

```
A new issue has been created by {{issue.user.login}} on the {{repository.name}} repo.
```

This would send the following messages:
- `A new issue has been created by MarshallAsch on the botomir repo.`
- `A new issue has been created by SoorajModi on the botomir repo.`

**NOTE: the variable needs to be surrounded by `{{ }}` and it MUST exist in the payload otherwise it will not send.** 


#### Updating the webhook

After the webhook is created you can update the channel that the message as well as the message contents, but nothing else. 
You also will not be able to get a new secret without deleting it and making a new one. 

The process to update the webhook is really similar to the process of creating it. 
1. Navigate to the webhooks page for the server
2. Find the webhook that you wish to update
3. Click edit
4. Edit the fields.
5. Click save.

#### Removing the webhook

Deleting a webhook is the same as update, except you click delete instead of edit.
1. Navigate to the webhooks page for the server
2. Find the webhook that you wish to update
3. Click delete
