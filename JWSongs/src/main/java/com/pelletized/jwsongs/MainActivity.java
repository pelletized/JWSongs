package com.pelletized.jwsongs;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.app.Activity;
import android.preference.PreferenceManager;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //the webview
        WebView webView = (WebView) findViewById(R.id.webView);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDefaultFontSize(getFontSize());
        webView.loadUrl("file:///android_asset/index.html");

        //the home button
        //getActionBar().setHomeButtonEnabled(true);
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
            case R.id.action_settings:
                Intent intent = new Intent("com.pelletized.jwsongs.PREFS");
                startActivityForResult(intent, R.id.action_settings);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onActivityResult(int req, int result, Intent data) {
        switch( req ) {
            case R.id.action_settings:
                WebView webView = (WebView) findViewById(R.id.webView);
                WebSettings webSettings = webView.getSettings();
                webSettings.setDefaultFontSize(getFontSize());
                webView.reload();
            break;
        }
    }


}
