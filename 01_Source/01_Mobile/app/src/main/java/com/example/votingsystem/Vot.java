package com.example.votingsystem;

import android.app.Activity;
import android.content.Context;

import android.content.Intent;
import android.os.Bundle;

import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.RadioButton;


import android.widget.RadioGroup;
import android.widget.Toast;

public class Vot extends Activity {
    Button vot_btnVot;
    LinearLayout.LayoutParams vot_params;
    private Context vot_Context;
    private Activity vot_Activity;
    private LinearLayout vot_RelativeLayout;
    private PopupWindow vot_PopupWindow;
    private RadioGroup vot_btnRadioGroup;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.vot);
        vot_Context = getApplicationContext();
        vot_Activity = Vot.this;
        vot_RelativeLayout = (LinearLayout) findViewById(R.id.vot_layout);
        vot_btnVot = (Button) findViewById(R.id.vot_btnVote);
        createText_vot();
        RadioButton vot_btnNull = new RadioButton(this);
        vot_btnNull.setText("Vot NULL"); //ia din baza de date numele
        vot_btnNull.setTextSize(18);
        LinearLayout layout = (LinearLayout) findViewById(R.id.vot_layoutCandidates);
        layout.addView(vot_btnNull);
        vot_btnVot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getApplicationContext(),
                        "Voting...",Toast.LENGTH_SHORT).show();


                    LayoutInflater inflater = (LayoutInflater) vot_Context.getSystemService(LAYOUT_INFLATER_SERVICE);
                    View customView = inflater.inflate(R.layout.custom_layout, null);
                    vot_PopupWindow = new PopupWindow(
                            customView,
                            vot_params.WRAP_CONTENT,
                            vot_params.WRAP_CONTENT
                    );
                    ImageButton custom_closeButton = (ImageButton) customView.findViewById(R.id.custom_btnClose);
                    custom_closeButton.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            // Dismiss the popup window
                            vot_PopupWindow.dismiss();
                            startActivity(new Intent(Vot.this, Alegeri.class));
                        }
                    });

                    vot_PopupWindow.showAtLocation(vot_RelativeLayout, Gravity.CENTER, 0, 0);

//                else
//                {
//                    Toast.makeText(getApplicationContext(),
//                            "You need to pick one...",Toast.LENGTH_SHORT).show();
//                }


            }
//                else
//                {
//                    Toast.makeText(getApplicationContext(),
//                            "You need to pick one...",Toast.LENGTH_SHORT).show();
//                }



            ///pop-up si buton sa te duca la LogIn back
//                    startActivity(new Intent(LogIn.this, LogIn.class));

        });


    }
    public void createText_vot(){
        int i;
        int nr_candidati=3; //numara cati candidati ia din baza de date si formeaza text
        for(i=0; i<nr_candidati;i++) {
            RadioButton vot_btnCandidati= new RadioButton(this);
            vot_btnCandidati.setText("Press Me"); //ia din baza de date numele
            vot_btnCandidati.setTextSize(18);
            LinearLayout layout = (LinearLayout) findViewById(R.id.vot_layoutCandidates);
            layout.addView(vot_btnCandidati);

        }
    }
    public boolean onRadioButtonClicked(View v) {
        // Is the button now checked?
        int check;
        boolean checked = ((RadioButton) v).isChecked();
        // Check which radio button was clicked
        if (checked) {
            return true;

        } else {
            return false;
        }


    }
}
