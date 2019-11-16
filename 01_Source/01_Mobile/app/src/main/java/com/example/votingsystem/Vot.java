package com.example.votingsystem;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RadioButton;

import android.widget.Toast;

public class Vot extends Activity {
    Button vot_btnVot;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.vot);
        vot_btnVot = (Button) findViewById(R.id.vot_btnVote);
        createText_vot();
        vot_btnVot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if( onRadioButtonClicked(v)  )
                {
                    Toast.makeText(getApplicationContext(),
                            "Voting...",Toast.LENGTH_SHORT).show();
                    ///pop-up si buton sa te duca la LogIn back
//                    startActivity(new Intent(LogIn.this, LogIn.class));
                }
            }
        });
    }
    public void createText_vot(){
        int i;
        int nr_candidati=3; //numara cati candidati ia din baza de date si formeaza text
        for(i=0; i<nr_candidati;i++) {
            RadioButton myButton = new RadioButton(this);
            myButton.setText("Press Me"); //ia din baza de date numele
            LinearLayout layout = (LinearLayout) findViewById(R.id.vot_layoutCandidates);
            layout.addView(myButton);
        }
    }
    public boolean onRadioButtonClicked(View view) {
        // Is the button now checked?
        boolean flag;
        boolean checked = ((RadioButton) view).isChecked();
        // Check which radio button was clicked
                if (checked)
                {
                    flag =true;

                }
                else
                {
                    flag=false;
                }
                return flag;

    }
}
