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
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.PopupMenu;
import android.widget.PopupWindow;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

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
        Event event = (Event)getIntent().getSerializableExtra("Event");
        createText_referendum( event);

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
                    Event event = (Event)getIntent().getSerializableExtra("Event");
                    JSONObject jsonBodyObj = new JSONObject();
                    try {
                        JSONArray votes = new JSONArray();
                        for(int k=0;k<event.questions.size();k++)
                        {
                            JSONObject vote = new JSONObject();
                            vote.put("id",event.questions.get(k).id);
                            View radioButtonSelected = radioGroup2.getChildAt(radioGroup2.getChildCount()-1);
                            RadioButton noBtn = (RadioButton)radioButtonSelected;
                            if(noBtn.isChecked())
                            {
                                vote.put("vote","no");
                            }
                            else
                            {
                                vote.put("vote","yes");
                            }
                            votes.put(vote);
                        }
                        jsonBodyObj.put("votes",votes);

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    final String requestBody = jsonBodyObj.toString();
                    Log.i("89",requestBody);
                    StringRequest stringRequest = new StringRequest(Request.Method.POST, "https://voting-system-3f.herokuapp.com/api/referendum/addVote",
                            new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {
                                    Log.d("123123", response);
                                    if(response.equals("Votes Ok"))
                                    {
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

                    RequestQueue requestQueue = Volley.newRequestQueue(Referendum.this);
                    requestQueue.add(stringRequest);



                }

            }
        });
    }
    public void createText_referendum(Event event) {

//        TextView referendum_intrebare = new TextView(this);
//        referendum_intrebare.setText("Vreti o prajiturica :o3 ?");//baza de date
//        referendum_intrebare.setTextColor(Color.parseColor("#FCF7F7"));
//        referendum_intrebare.setTextSize(20);
//        RadioGroup radioGroup2 = (RadioGroup)findViewById(R.id.referendum_groupButtons);
//        radioGroup2.addView(referendum_intrebare);
//        RadioButton vot_btnCandidati = new RadioButton(this);
//        vot_btnCandidati.setText("Da "); //ia din baza de date numele
//        vot_btnCandidati.setTextColor(Color.parseColor("#FCF7F7"));
//        vot_btnCandidati.setTextSize(18);
//        radioGroup2.addView(vot_btnCandidati);


            for (int k = 0; k<event.questions.toArray().length;k++)
            {
                TextView referendum_intrebare = new TextView(this);
        referendum_intrebare.setText(event.questions.get(k).nume);//baza de date
        referendum_intrebare.setTextColor(Color.parseColor("#FCF7F7"));
        referendum_intrebare.setTextSize(20);
                RadioGroup radioGroup2 = (RadioGroup)findViewById(R.id.referendum_groupButtons);
        radioGroup2.addView(referendum_intrebare);
        RadioButton referendum_btnYes = new RadioButton(this);
                referendum_btnYes.setText("Da "); //ia din baza de date numele
                referendum_btnYes.setTextColor(Color.parseColor("#FCF7F7"));
                referendum_btnYes.setTextSize(18);
                RadioButton referendum_btnNo = new RadioButton(this);
                referendum_btnNo.setText("Nu"); //ia din baza de date numele
                referendum_btnNo.setTextColor(Color.parseColor("#FCF7F7"));
                referendum_btnNo.setTextSize(18);

        radioGroup2.addView(referendum_btnYes);
                radioGroup2.addView(referendum_btnNo);
            }


    }
}
