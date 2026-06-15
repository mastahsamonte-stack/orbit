# Orbit — Google Sheets cloud sync setup

This connects your Orbit app to a private Google Sheet so your deals sync across
every device. It takes about 5 minutes, once.

**How it works (plain English):** Your Orbit page can't run server code (GitHub
Pages only serves static files). So we put a tiny script — a "doorman" — inside a
Google Sheet you own. The app calls that doorman to read and write your data. A
passcode (stored inside *your* script, never in the public code) keeps everyone
else out. Until you connect, the app keeps working on this device alone.

---

## Part 1 — Create the backend (in your Google account)

1. Go to **sheet.new** (creates a blank Google Sheet). Name it something like
   "Orbit Data".
2. In that sheet: **Extensions → Apps Script**. A code editor opens in a new tab.
3. Delete the sample `function myFunction() {}` so the editor is empty.
4. Open **orbit-backend.gs** (in your Orbit Project folder), copy *everything*,
   and paste it into the Apps Script editor. Click the **save** icon (💾).
5. Near the top of the code, find this line:
   `PropertiesService.getScriptProperties().setProperty('ORBIT_PASS', 'change-this-passcode');`
   Change `change-this-passcode` to a passcode only you know. Save again.
6. In the function dropdown (top toolbar, says something like `doGet`), pick
   **SETUP_setPasscode**, then click **Run**.
   - Google will ask for permission the first time → **Review permissions** →
     pick your account → it may warn "Google hasn't verified this app" →
     **Advanced → Go to (project name)** → **Allow**. (It's your own script, on
     your own sheet — this is normal.)
   - You should see "Passcode set" in the log.
7. **Deploy → New deployment**. Click the gear ⚙ → **Web app**. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
   Click **Deploy**, approve if asked, then **copy the Web app URL** (it ends in
   `/exec`).

> Optional, slightly safer: after step 6 you can blank the passcode back out in
> the code (set it to `''`) and save, so the passcode isn't sitting in the script
> text. It's already stored securely once you've run it.

---

## Part 2 — Connect Orbit

1. Open your Orbit site and go to **Settings** (gear, top right, or your name).
2. Under **Cloud sync · Google Sheet**, paste the Web app URL and your passcode.
3. Click **Connect & sync**.
4. You should see the cloud icon turn green (☁✓ "Synced"). Your current deals are
   pushed up to the sheet, and a readable **Leads** tab appears in your Google
   Sheet.

On any other device (phone, Mac Mini): open the site → Settings → paste the same
URL + passcode → Connect. Your deals load right in.

---

## Day-to-day

- Everything you do saves to this device instantly **and** pushes to your Sheet a
  second later. The cloud icon shows status: green = synced, grey = offline (it
  retries), red = needs login.
- Your Google Sheet has two tabs: **OrbitData** (the app's raw data — leave it
  alone) and **Leads** (a friendly table you can read/sort; it rebuilds on each
  save, so don't hand-edit it — make changes in the app).
- **Settings → Export backup** still works as an extra safety copy.
- **Log out this device** removes the passcode from that browser only.

## Troubleshooting

- *"Backend reached, but no passcode is set"* → you skipped step 6 (Run
  SETUP_setPasscode).
- *"Couldn't reach that URL"* → the deployment isn't set to "Anyone," or you
  copied the wrong URL (it must end in `/exec`, not `/dev`).
- *Wrong passcode* → it's case-sensitive; re-check what you set in step 5.
- Changed the code later? You must **Deploy → Manage deployments → Edit (pencil)
  → Version: New version → Deploy** for changes to go live.

*Note: this is a personal-use setup. The passcode + the hard-to-guess script URL
are your locks. For anything you'd consider truly sensitive, keep seller PII out
or ask me to add stronger auth.*
