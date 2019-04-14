The purpose of this repository is to update a file in my GitHub account based on a git push.

It was also an interesting way to learn more about GitHub webhooks.

- https://github.com/aizatto/gitbook-public/blob/master/SUMMARY.md
- https://github.com/aizatto/gitbook-public/blob/master/table-of-contents.md
- https://github.com/KostyaTretyak/marked-ts
- https://github.com/settings/apps
- https://developer.github.com/webhooks/
- https://developer.github.com/v3/activity/events/

# Update locally

```sh
sls invoke local -s prod -r ap-southeast-1 --function forceUpdate --data '{"owner":"aizatto","repo":"gitbook-public"}'
```

# Update remotely

```sh
aws lambda invoke --function-name gitbook-summary-prod-forceUpdate --payload '{"owner":"aizatto","repo":"gitbook-public"}' /dev/stdout
```

# Deploy

```sh
sls deploy -s prod -r ap-southeast-1
```
