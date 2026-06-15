/*  ============================================================
    ORBIT — Google Sheets backend (Google Apps Script)
    ============================================================
    This script turns a Google Sheet into the private database
    for your Orbit app. It does three things:
      • load  — hand the app your saved data
      • save  — store the app's data + refresh a readable "Leads" tab
      • ping  — check the passcode at login

    SETUP (do this once):
    1. Make a new Google Sheet (sheet.new).
    2. Extensions → Apps Script. Delete any sample code.
    3. Paste THIS whole file in. Save.
    4. In the function dropdown choose  SETUP_setPasscode , change the
       passcode on the line below, then press Run. Approve the
       permission prompt (it's your own sheet).
    5. Deploy → New deployment → type "Web app".
         Execute as:  Me
         Who has access:  Anyone
       Deploy, copy the Web app URL (ends in /exec).
    6. Open Orbit → Settings → Cloud sync, paste that URL + your
       passcode, click Connect.
    ============================================================ */

// >>> CHANGE THE PASSCODE HERE, run SETUP_setPasscode once, then you can blank it again. <<<
function SETUP_setPasscode() {
  PropertiesService.getScriptProperties().setProperty('ORBIT_PASS', 'change-this-passcode');
  Logger.log('Passcode set. You can now connect Orbit.');
}

var DATA_SHEET  = 'OrbitData';   // hidden cell A1 holds the full app data (JSON)
var LEADS_SHEET = 'Leads';       // human-readable mirror you can eyeball/sort

function doGet(e)  { return handle_(e); }
function doPost(e) { return handle_(e); }

function handle_(e) {
  var params = (e && e.parameter) ? e.parameter : {};
  var body = {};
  if (e && e.postData && e.postData.contents) {
    try { body = JSON.parse(e.postData.contents); } catch (err) { body = {}; }
  }
  var action   = body.action   || params.action   || 'load';
  var pass     = body.pass      || params.pass     || '';
  var callback = body.callback  || params.callback || '';

  var stored = PropertiesService.getScriptProperties().getProperty('ORBIT_PASS');

  // No passcode configured yet → tell the app to finish setup.
  if (!stored) {
    return out_({ ok: false, error: 'no-passcode-set' }, callback);
  }
  // Wrong passcode → refuse everything.
  if (pass !== stored) {
    return out_({ ok: false, error: 'unauthorized' }, callback);
  }

  if (action === 'ping') {
    return out_({ ok: true }, callback);
  }
  if (action === 'load') {
    return out_({ ok: true, state: loadState_() }, callback);
  }
  if (action === 'save') {
    saveState_(body.state);
    return out_({ ok: true }, callback);
  }
  return out_({ ok: false, error: 'unknown-action' }, callback);
}

/* Return JSON, or JSONP if a callback name was supplied (used for cross-site reads). */
function out_(obj, callback) {
  var json = JSON.stringify(obj);
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function loadState_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(DATA_SHEET);
  if (!sh) return null;
  var raw = sh.getRange('A1').getValue();
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (err) { return null; }
}

function saveState_(state) {
  if (!state) return;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(DATA_SHEET) || ss.insertSheet(DATA_SHEET);
  sh.getRange('A1').setValue(JSON.stringify(state));
  try { writeLeadsMirror_(ss, state); } catch (err) { /* mirror is best-effort */ }
}

/* Rebuild a friendly Leads tab so you can read your pipeline in the sheet. */
function writeLeadsMirror_(ss, state) {
  var sh = ss.getSheetByName(LEADS_SHEET) || ss.insertSheet(LEADS_SHEET);
  sh.clear();
  var headers = ['Lead ID','Address','City','State','Buyer (Planet)','Structure','Status',
                 'Asking','Balance','Your %','Est. Profit','Your Payout','Last Update'];
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');

  var pmap = {};
  (state.planets || []).forEach(function (p) { pmap[p.id] = p.name; });

  var rows = (state.leads || []).map(function (l) {
    var payout = l.payout || Math.round((Number(l.estProfit) || 0) * (Number(l.splitYou) || 0) / 100);
    return [l.id, l.address, l.city, l.state, pmap[l.planetId] || '', l.structure, l.status,
            Number(l.asking) || 0, l.freeClear ? 0 : (Number(l.balance) || 0),
            l.splitYou, Number(l.estProfit) || 0, payout, l.lastUpdate || ''];
  });
  if (rows.length) sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sh.setFrozenRows(1);
}
