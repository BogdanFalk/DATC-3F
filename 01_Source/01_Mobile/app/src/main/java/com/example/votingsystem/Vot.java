package com.example.votingsystem;

import android.app.Activity;
import android.content.Context;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;

import android.util.Log;
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

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

public class Vot extends BaseActivity {
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

        Event event = (Event)getIntent().getSerializableExtra("Event");

        Log.i("666", event.nume);

        createText_vot(event);
            vot_btnVot.setOnClickListener(new View.OnClickListener() {
                RadioGroup radioGroup = (RadioGroup)findViewById(R.id.vot_groupButtons);
                Event event = (Event)getIntent().getSerializableExtra("Event");
                @Override
                public void onClick(View v) {
                    View radioButtonSelected = radioGroup.getChildAt(radioGroup.getChildCount()-1);
                    RadioButton nullBtn = (RadioButton)radioButtonSelected;
                    if(nullBtn.isChecked())
                    {
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
                    else
                    {
                        if(radioGroup.getCheckedRadioButtonId()== -1) {
                            Toast.makeText(getApplicationContext(),
                                    "You need to vote one.", Toast.LENGTH_SHORT).show();
                            radioGroup.clearCheck();
                        }
                        String url ="";
                        if(radioGroup.getCheckedRadioButtonId()!=-1) {
                            JSONObject jsonBodyObj = new JSONObject();
                            if(event.candidates.size()>0)
                            {
                                try {
                                    jsonBodyObj.put("id",event.candidates.get((radioGroup.getCheckedRadioButtonId())-1).id);
                                    url="https://voting-system-3f.herokuapp.com/api/candidate/addVote";

                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                            else
                            {
                                try {
                                    jsonBodyObj.put("id",event.party.get((radioGroup.getCheckedRadioButtonId())-1).id);
                                    url="https://voting-system-3f.herokuapp.com/api/party/addVote";

                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }


                            final String requestBody = jsonBodyObj.toString();
                            StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                                    new Response.Listener<String>() {
                                        @Override
                                        public void onResponse(String response) {
                                            Log.d("123123", response);
                                            if(response.equals("Vote Ok"))
                                            {
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
                                            else {
                                                Toast.makeText(getApplicationContext(),
                                                        "Server Error", Toast.LENGTH_SHORT).show();
                                            }
                                        }
                                    },
                                    new Response.ErrorListener() {
                                        @Override
                                        public void onErrorResponse(VolleyError error) {
                                            Log.e("23", "onErrorResponse: " + error.toString());
                                            Toast.makeText(getApplicationContext(),
                                                    "Server Error", Toast.LENGTH_SHORT).show();
                                        }
                                    }) {
                                @Override
                                public Map<String, String> getHeaders() throws AuthFailureError {
                                    HashMap<String, String> headers = new HashMap<String, String>();
                                    headers.put("Content-Type", "application/json; charset=utf-8");
                                    headers.put("User-agent", "My useragent");
                                    return headers;
                                }

                                @Override
                                public byte[] getBody() {
                                    try {
                                        Log.i("90",requestBody);
                                        return requestBody == null ? null : requestBody.getBytes("utf-8");

                                    } catch (UnsupportedEncodingException uee) {
                                        VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s",
                                                requestBody, "utf-8");
                                        return null;
                                    }
                                }

                            };
                            RequestQueue requestQueue = Volley.newRequestQueue(Vot.this);
                            requestQueue.add(stringRequest);

                        }
                    }


                }
            });
    }

    public void createText_vot(Event data) {
        int i;
        RadioGroup radioGroup = (RadioGroup)findViewById(R.id.vot_groupButtons);
        //numara cati candidati ia din baza de date si formeaza text
//        String candidates_name[]= {"0","1","2","3","4","5","6","7","8","9"};
//        int nr_candidati= candidates_name.length; //numara cate alegeri ia din baza de date
//        for (i = 0; i < nr_candidati; i++) {
//            RadioButton vot_btnCandidati = new RadioButton(this);
//            vot_btnCandidati.setText("Press me"); //ia din baza de date numele
//            vot_btnCandidati.setTextColor(Color.parseColor("#FCF7F7"));
//            vot_btnCandidati.setTextSize(18);
//            radioGroup.addView(vot_btnCandidati);
//
//            }
        if(data.candidates.size()>0)
        {

            for (int k = 0; k<data.candidates.toArray().length;k++)
            {
                RadioButton vot_btnCandidati = new RadioButton(this);
                vot_btnCandidati.setText(data.candidates.get(k).nume); //ia din baza de date numele
                vot_btnCandidati.setTextColor(Color.parseColor("#FCF7F7"));
                vot_btnCandidati.setTextSize(18);
                radioGroup.addView(vot_btnCandidati);
            }
        }
        else
        {
            for (int k = 0; k<data.party.toArray().length;k++)
            {
                RadioButton vot_btnCandidati = new RadioButton(this);
                vot_btnCandidati.setText(data.party.get(k).nume); //ia din baza de date numele
                vot_btnCandidati.setTextColor(Color.parseColor("#FCF7F7"));
                vot_btnCandidati.setTextSize(18);
                radioGroup.addView(vot_btnCandidati);
            }
        }

        RadioButton vot_btnNull = new RadioButton(this);
        vot_btnNull.setText("Vot NULL"); //ia din baza de date numele
        vot_btnNull.setTextColor(Color.parseColor("#FCF7F7"));
        vot_btnNull.setTextSize(18);
        radioGroup.addView(vot_btnNull);


    }

}
