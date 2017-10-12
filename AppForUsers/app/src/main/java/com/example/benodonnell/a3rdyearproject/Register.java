package com.example.benodonnell.a3rdyearproject;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

/**
 * Created by benodonnell on 12/10/2017.
 */

public class Register extends Activity {

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.register_page);
    }

    public void onButtonClick2(View v) {
        if (v.getId() == R.id.bWelcome) {
            Intent l = new Intent(Register.this, Welcome.class);
            startActivity(l);
        }
    }


}
