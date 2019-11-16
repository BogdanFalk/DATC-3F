package com.example.votingsystem;

import android.app.Activity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.LinearLayout;

public class Alegeri extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.alegeri);
        createButtons_alegeri();

    }
    public void createButtons_alegeri(){
        int i;
        int nr_alegeri=3; //numara cate alegeri ia din baza de date
        for(i=0; i<nr_alegeri;i++) {
            Button myButton = new Button(this);
            myButton.setText("Press Me"); // ia in baza de date numele
            LinearLayout layout = (LinearLayout) findViewById(R.id.aleg_layout);
            layout.addView(myButton);
        }
    }
}
