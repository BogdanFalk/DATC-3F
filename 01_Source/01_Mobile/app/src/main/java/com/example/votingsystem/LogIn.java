package com.example.votingsystem;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class LogIn extends Activity {
    Button log_btnLog;
    EditText log_editName, log_editCNP;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);
        log_btnLog = (Button) findViewById(R.id.log_buttonLog);
        log_editName =(EditText) findViewById(R.id.log_editName);
        log_editCNP =(EditText) findViewById(R.id.log_editCNP);

        log_btnLog.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i("21",log_editName.getText().toString()+log_editCNP.getText().toString());
                loginCheck(log_editName.getText().toString(),log_editCNP.getText().toString());

            }
        });
    }
    private void loginCheck( final String name, final String cnp) {
        if(log_editName.getText().toString().equals("admin") && log_editCNP.getText().toString().equals("admin")){
            //correcct password
            Toast.makeText(getApplicationContext(),
                    "Redirecting...",Toast.LENGTH_SHORT).show();
            startActivity(new Intent(LogIn.this, Alegeri.class));
        }else {
            //wrong password
            Toast.makeText(getApplicationContext(),
                    "Wrong Credentials...",Toast.LENGTH_SHORT).show();
        }

    }
}
