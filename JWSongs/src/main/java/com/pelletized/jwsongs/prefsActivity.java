package com.pelletized.jwsongs;

import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.preference.CheckBoxPreference;
import android.preference.Preference;
import android.preference.PreferenceActivity;
import android.preference.PreferenceManager;
import android.util.Log;

public class prefsActivity extends PreferenceActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        addPreferencesFromResource(R.xml.prefs);

        PreferenceManager.setDefaultValues(this, R.xml.prefs, false);

        final CheckBoxPreference sleepPrefs = (CheckBoxPreference) getPreferenceManager().findPreference("sleepPrefs");
        sleepPrefs.setOnPreferenceChangeListener(new Preference.OnPreferenceChangeListener() {
            public boolean onPreferenceChange(Preference preference, Object newValue) {
                Log.d("prefsactivity","thing got clicked");

                if (sleepPrefs.isChecked()){
                    Log.d("prefsactivity","thing IS CHECKED");
                    getWindow().addFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

                } else {
                    Log.d("prefsactivity","thing is NOT");
                    getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                }
                return true;
            }

        });




    }
}
