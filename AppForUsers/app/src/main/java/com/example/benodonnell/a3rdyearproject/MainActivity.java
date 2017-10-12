package com.example.benodonnell.a3rdyearproject;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        login();

    }


    public User login() {
        Button btn;
        btn = (Button) findViewById(R.id.bLogin);
        btn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                EditText email = (EditText) findViewById(R.id.editText);
                EditText password = (EditText) findViewById(R.id.editText2);


                String emailtext = String.valueOf(email.getText());
                String passwordsText = String.valueOf(password.getText());

                if (emailtext.length() < 1) {
                    Toast.makeText(getApplicationContext(), "Enter email", Toast.LENGTH_SHORT).show();
                } else if (passwordsText.length() < 1) {
                    Toast.makeText(getApplicationContext(), "Enter Password", Toast.LENGTH_SHORT).show();

                } else {
                    User x = new User(emailtext, passwordsText);

                }

            }
        });
        return null;
    }

    public void onButtonClick(View v) {
        if (v.getId() == R.id.bRegister) {
            Intent i = new Intent(MainActivity.this, Register.class);
            startActivity(i);
        }
    }

}
