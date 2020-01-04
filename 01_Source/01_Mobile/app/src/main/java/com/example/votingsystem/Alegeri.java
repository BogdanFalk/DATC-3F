package com.example.votingsystem;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.core.content.ContextCompat;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

public class Alegeri extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.alegeri);
        createButtons_alegeri();


    }
    public void createButtons_alegeri(){
        int i;
        final String events_name[]={"1","2","3"};
        StringRequest stringRequest = new StringRequest(Request.Method.POST, "https://voting-system-3f.herokuapp.com/api/user/addNewUser",
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("123123", response);
//                        events_name=response;
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.e("23", "onErrorResponse: " + error.toString());
                        Toast.makeText(getApplicationContext(),
                                "Login Failed", Toast.LENGTH_SHORT).show();
                    }
                }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<String, String>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                headers.put("User-agent", "My useragent");
                return headers;
            }

        };

        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(stringRequest);


        int nr_alegeri= events_name.length; //numara cate alegeri ia din baza de date

            for (i = 0; i < nr_alegeri; i++) {
                Button aleg_btnEvents = new Button(this);
                aleg_btnEvents.setText(events_name[i]); // ia in baza de date numele
                aleg_btnEvents.setTextSize(18);
                aleg_btnEvents.setLayoutParams(new LinearLayout.LayoutParams(600, 200));
                ViewGroup.MarginLayoutParams params = (ViewGroup.MarginLayoutParams) aleg_btnEvents.getLayoutParams();
                params.leftMargin = 250;
                params.topMargin = 50;
                aleg_btnEvents.setLayoutParams(params);
                aleg_btnEvents.setBackgroundColor(getResources().getColor(R.color.colorAccent));
                LinearLayout layout = (LinearLayout) findViewById(R.id.aleg_layout);
                layout.addView(aleg_btnEvents);
                String btntext= "Referendum";

                if(aleg_btnEvents.getText().toString().equals(btntext)) {

                    aleg_btnEvents.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            Toast.makeText(getApplicationContext(),
                                    "Redirecting...", Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(Alegeri.this, Referendum.class));
                        }
                    });
                }
                else
                {
                    aleg_btnEvents.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            Toast.makeText(getApplicationContext(),
                                    "Redirecting...", Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(Alegeri.this, Vot.class));
                        }
                    });
                }

            }
        }

}
