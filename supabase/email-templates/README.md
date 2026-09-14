# MyBreakeven transactional email setup

## Custom SMTP

- Sender name: `MyBreakeven`
- Sender email: `support@mybreakeven.com`
- SMTP host: `smtp.hostinger.com`
- SMTP port: `465`
- SMTP username: `support@mybreakeven.com`
- SMTP password: enter only in Supabase; never commit it to GitHub.

If SSL port 465 is rejected, use STARTTLS port 587.

## Supabase subjects and templates

- Confirm signup — Subject: `Verify your MyBreakeven account` — `confirmation.html`
- Reset password — Subject: `Reset your MyBreakeven password` — `recovery.html`
- Change email — Subject: `Confirm your new MyBreakeven email` — `email-change.html`
- Password changed notification — Subject: `Your MyBreakeven password was changed` — `password-changed.html`

Keep Site URL `https://mybreakeven.com` and the existing dashboard/reset redirect URLs. After configuration, test signup and password recovery with an email address you control.
