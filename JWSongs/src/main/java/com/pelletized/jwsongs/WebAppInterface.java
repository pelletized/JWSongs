package com.pelletized.jwsongs;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by Ed on 3/3/14.
 */
public class WebAppInterface {
    Context mContext;
    String language;
    /** Instantiate the interface and set the context */
    WebAppInterface(Context c) {
        mContext = c;
        //language = getClass();
    }

    /** Show a toast from the web page */

    /*
    public void loadToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }
    */

    @JavascriptInterface
    public String setLanguage() {
        language = "blah blah blah";
        //this.language = "blah blah blah";
        return language;
    }

}


