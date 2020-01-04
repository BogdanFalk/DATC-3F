package com.example.votingsystem;

import android.app.Activity;
import android.content.Context;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;

import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CompoundButton;
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
            vot_btnVot.setOnClickListener(new View.OnClickListener() {
                RadioGroup radioGroup = (RadioGroup)findViewById(R.id.vot_groupButtons);
                @Override
                public void onClick(View v) {
                    if(radioGroup.getCheckedRadioButtonId()== -1) {
                        Toast.makeText(getApplicationContext(),
                                "You need to vote one.", Toast.LENGTH_SHORT).show();
                        radioGroup.clearCheck();
                    }
                    if(radioGroup.getCheckedRadioButtonId()!=-1) {
                        Toast.makeText(getApplicationContext(),
                                "Voting...", Toast.LENGTH_SHORT).show();
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
                                radioGroup.clearCheck();
                                startActivity(new Intent(Vot.this, Alegeri.class));
                            }
                        });

                        vot_PopupWindow.showAtLocation(vot_RelativeLayout, Gravity.CENTER, 0, 0);

                    }

                }
            });
    }

    public void createText_vot() {
        int i;
        RadioGroup radioGroup = (RadioGroup)findViewById(R.id.vot_groupButtons);
        //numara cati candidati ia din baza de date si formeaza text
        String candidates_name[]= {"0","1","2","3","4","5","6","7","8","9"};
        int nr_candidati= candidates_name.length; //numara cate alegeri ia din baza de date
        for (i = 0; i < nr_candidati; i++) {
            RadioButton vot_btnCandidati = new RadioButton(this);
            vot_btnCandidati.setText("Press me"); //ia din baza de date numele
            vot_btnCandidati.setTextColor(Color.parseColor("#FCF7F7"));
            vot_btnCandidati.setTextSize(18);
            radioGroup.addView(vot_btnCandidati);

            }
        RadioButton vot_btnNull = new RadioButton(this);
        vot_btnNull.setText("Vot NULL"); //ia din baza de date numele
        vot_btnNull.setTextColor(Color.parseColor("#FCF7F7"));
        vot_btnNull.setTextSize(18);
        radioGroup.addView(vot_btnNull);


    }

}
