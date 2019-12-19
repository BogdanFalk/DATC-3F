package com.example.votingsystem;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.core.content.ContextCompat;

public class Alegeri extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.alegeri);
        createButtons_alegeri();

    }
    public void createButtons_alegeri(){
        int i;
        int nr_alegeri=5; //numara cate alegeri ia din baza de date
        for(i=0; i<nr_alegeri;i++) {
            Button aleg_btnEvents = new Button(this);
            aleg_btnEvents.setText("Prezidentiale"); // ia in baza de date numele
            aleg_btnEvents.setTextSize(18);
            aleg_btnEvents.setLayoutParams(new LinearLayout.LayoutParams(600,200));
            ViewGroup.MarginLayoutParams params = (ViewGroup.MarginLayoutParams) aleg_btnEvents.getLayoutParams();
            params.leftMargin = 250;
            params.topMargin = 50;
            aleg_btnEvents.setLayoutParams(params);
            aleg_btnEvents.setBackgroundColor(getResources().getColor(R.color.colorAccent));
            LinearLayout layout = (LinearLayout) findViewById(R.id.aleg_layout);
            layout.addView(aleg_btnEvents);
            aleg_btnEvents.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(getApplicationContext(),
                            "Redirecting...",Toast.LENGTH_SHORT).show();
                    startActivity(new Intent(Alegeri.this, Vot.class));
                }
            });

        }
    }

}
