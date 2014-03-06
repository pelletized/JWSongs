package com.pelletized.jwsongs;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

public class MainActivity extends Activity {
    WebView webView;
    String appUrl = "file:///android_asset/index.html";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        getWebView();
        getScreenPrefs();

        //the home button
        getActionBar().setHomeButtonEnabled(true);
        getActionBar().setDisplayHomeAsUpEnabled(true);
    }

    public int getFontSize() {
        SharedPreferences getPrefs = PreferenceManager.getDefaultSharedPreferences(getBaseContext());
        Integer fontSize = Integer.parseInt(getPrefs.getString("fontsize", "14"));
        Integer fontSizeValue;

        switch (fontSize) {
            case 18:
                fontSizeValue = 18;
                break;
            case 22:
                fontSizeValue = 22;
                break;
            case 26:
                fontSizeValue = 26;
                break;
            default:
                fontSizeValue = 14;
                break;
        }
        return fontSizeValue;
    }

    public String getLanguage() {
        SharedPreferences getPrefs = PreferenceManager.getDefaultSharedPreferences(getBaseContext());
        String language = getPrefs.getString("language","English");

        if (language.equals("English")) {
            //set english js file
            language = "songdata.js";
        } else if (language.equals("Spanish")) {
            //set as spanish
            language = "songdata-es.js";
        }

        return language;
    }

    private void getWebView() {
        //the webview
        webView = (WebView) findViewById(R.id.webView);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDefaultFontSize(getFontSize());
        webSettings.setDefaultTextEncodingName("utf-8");
        //appUrl = "file:///android_asset/index.html";
        webView.loadUrl(appUrl);
        webView.addJavascriptInterface(new WebAppInterface(this), "Android");
    }

    private boolean getScreenPrefs() {
        SharedPreferences getPrefs = PreferenceManager.getDefaultSharedPreferences(getBaseContext());
        boolean screenPrefs = getPrefs.getBoolean("sleepPrefs", false);

        if(screenPrefs) {
            //Log.d("mainactivity","screen should stay ON");
            getWindow().addFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        } else {
            //Log.d("mainactivity","screen should be OFF");
            getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        }

        return true;
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        switch (item.getItemId()) {
            //settings menu item
            case R.id.action_settings:
                Intent intent = new Intent("com.pelletized.jwsongs.PREFS");
                startActivityForResult(intent, R.id.action_settings);
                return true;
            case R.id.about:
                //Intent i = new Intent(this, AboutActivity.class);
                //startActivity(i);
                startActivity(new Intent(this, AboutActivity.class));
            break;
            //home button
            case android.R.id.home:
                webView.loadUrl(appUrl);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onActivityResult(int req, int result, Intent data) {
        //when coming back from prefsActivity, this runs
        switch( req ) {
            case R.id.action_settings:
                getScreenPrefs();
                getWebView();
            break;
        }
    }

    private static long back_pressed;

    @Override
    public void onBackPressed()
    {
        if (back_pressed + 2000 > System.currentTimeMillis()) {
            super.onBackPressed();
        }

        else {
            webView.reload();
            Toast.makeText(getBaseContext(), "Press back again to exit", Toast.LENGTH_SHORT).show();
        }
        back_pressed = System.currentTimeMillis();
    }

}
