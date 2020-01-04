package com.example.votingsystem;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.PopupMenu;
import android.widget.PopupWindow;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

public class Referendum extends Activity {
    Button referendum_btnVot;
    LinearLayout.LayoutParams referendum_params;
    private Context referendum_Context;
    private Activity referendum_Activity;
    private LinearLayout referendum_RelativeLayout;
    private PopupWindow referendum_PopupWindow;
    private RadioGroup referendum_btnRadioGroup;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.referendum);
        referendum_Context = getApplicationContext();
        referendum_Activity = Referendum.this;
        referendum_RelativeLayout = (LinearLayout) findViewById(R.id.referendum_layout);
        referendum_btnVot = (Button) findViewById(R.id.referendum_btnVote);
        createText_referendum();

        referendum_btnVot.setOnClickListener(new View.OnClickListener() {
            RadioGroup radioGroup2 = (RadioGroup)findViewById(R.id.referendum_groupButtons);
            @Override
            public void onClick(View v) {
                if(radioGroup2.getCheckedRadioButtonId()== -1) {
                    Toast.makeText(getApplicationContext(),
                            "You need to vote one.", Toast.LENGTH_SHORT).show();
                    radioGroup2.clearCheck();
                }
                if(radioGroup2.getCheckedRadioButtonId()!=-1) {
                    Toast.makeText(getApplicationContext(),
                            "Voting...", Toast.LENGTH_SHORT).show();
                    LayoutInflater inflater = (LayoutInflater) referendum_Context.getSystemService(LAYOUT_INFLATER_SERVICE);
                    View customView = inflater.inflate(R.layout.custom_layout, null);
                    referendum_PopupWindow = new PopupWindow(
                            customView,
                            referendum_params.WRAP_CONTENT,
                            referendum_params.WRAP_CONTENT
                    );
                    ImageButton custom_closeButton = (ImageButton) customView.findViewById(R.id.custom_btnClose);
                    custom_closeButton.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            // Dismiss the popup window
                            referendum_PopupWindow.dismiss();
                            radioGroup2.clearCheck();
                            startActivity(new Intent(Referendum.this, Alegeri.class));
                        }
                    });

                    referendum_PopupWindow.showAtLocation(referendum_RelativeLayout, Gravity.CENTER, 0, 0);

                }

            }
        });
    }
    public void createText_referendum() {

        TextView referendum_intrebare = new TextView(this);
        referendum_intrebare.setText("Vreti o prajiturica :o3 ?");//baza de date
        referendum_intrebare.setTextColor(Color.parseColor("#FCF7F7"));
        referendum_intrebare.setTextSize(20);
        RadioGroup radioGroup2 = (RadioGroup)findViewById(R.id.referendum_groupButtons);
        radioGroup2.addView(referendum_intrebare);
        RadioButton vot_btnCandidati = new RadioButton(this);
        vot_btnCandidati.setText("Da "); //ia din baza de date numele
        vot_btnCandidati.setTextColor(Color.parseColor("#FCF7F7"));
        vot_btnCandidati.setTextSize(18);
        radioGroup2.addView(vot_btnCandidati);

    }
}
