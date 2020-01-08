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

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import android.os.Handler;

class Associate implements Serializable{
    public Associate(String nume, int id) {
        this.nume = nume;
        this.id = id;
    }

    public String nume;
    public int id;

    @Override
    public String toString() {
        return "Associate{" +
                "nume='" + nume + '\'' +
                ", id=" + id +
                '}';
    }
}



class Event implements Serializable {

   public String nume;
    public ArrayList<Associate> candidates = new ArrayList<Associate>();
    public ArrayList<Associate> party = new ArrayList<Associate>();
    public ArrayList<Associate> questions = new ArrayList<Associate>();
    public int index = 0;

    @Override
    public String toString() {
        return "Event{" +
                "nume='" + nume + '\'' +
                ", candidates=" + candidates +
                ", party=" + party +
                ", questions=" + questions +
                ", index=" + index +
                '}';
    }
}
public class Alegeri extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.alegeri);
        createButtons_alegeri();


    }
    public void createButtons_alegeri(){
        int i;
//        final String events_name[];
        final Event event1 = new Event();
        final Event event2 = new Event();
        final Event event3 = new Event();
        final ArrayList<String> events_name = new ArrayList<String>();
        StringRequest stringRequest = new StringRequest(Request.Method.POST, "https://voting-system-3f.herokuapp.com/api/event/getAllEventsWithAssociates",
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("123123", response);
//                        events_name=response;
                        try{
                            JSONObject eventData = new JSONObject(response);
                            JSONArray presidentials =  eventData.getJSONArray("eventPresident");
                            JSONArray parliamentary =  eventData.getJSONArray("eventParliamentary");
                            JSONArray referendum =  eventData.getJSONArray("eventReferendum");
                            for(int i=0;i<presidentials.length();i++)
                            {
                                JSONObject ps = presidentials.getJSONObject(i);
                                events_name.add(ps.getString("type"));
                                event1.nume=ps.getString("type");
                                JSONArray candidates = ps.getJSONArray("candidate");
                                for(int j=0;j<candidates.length();j++)
                                {
                                    JSONObject candidat = candidates.getJSONObject(j);
                                    event1.candidates.add(new Associate(candidat.getString("name"),candidat.getInt("id")));
                                }

                                Log.i("907",ps.getString("id"));
                            }
                            for(int i=0;i<parliamentary.length();i++)
                            {
                                JSONObject ps = parliamentary.getJSONObject(i);
                                events_name.add(ps.getString("type"));

                                event2.nume=ps.getString("type");

                                JSONArray candidates = ps.getJSONArray("party");
                                for(int j=0;j<candidates.length();j++)
                                {
                                    JSONObject candidat = candidates.getJSONObject(j);
                                    event2.party.add(new Associate(candidat.getString("name"),candidat.getInt("id")));
                                }
                                Log.i("907",ps.getString("id"));
                            }
                            for(int i=0;i<referendum.length();i++)
                            {
                                JSONObject ps = referendum.getJSONObject(i);
                                events_name.add(ps.getString("type"));

                                event3.nume=ps.getString("type");
                                JSONArray candidates = ps.getJSONArray("referendum");
                                for(int j=0;j<candidates.length();j++)
                                {
                                    JSONObject candidat = candidates.getJSONObject(j);
                                    event3.questions.add(new Associate(candidat.getString("question"),candidat.getInt("id")));
                                }
                                Log.i("907",ps.getString("id"));
                            }

                            for(String nume : events_name)
                            {

                                Log.i("1227",nume);
                                final Button aleg_btnEvents = new Button(Alegeri.this);
                                aleg_btnEvents.setText(nume); // ia in baza de date numele
                                aleg_btnEvents.setTextSize(18);
                                aleg_btnEvents.setLayoutParams(new LinearLayout.LayoutParams(600, 200));
                                ViewGroup.MarginLayoutParams params = (ViewGroup.MarginLayoutParams) aleg_btnEvents.getLayoutParams();
                                params.leftMargin = 250;
                                params.topMargin = 50;
                                aleg_btnEvents.setLayoutParams(params);
                                aleg_btnEvents.setBackgroundColor(getResources().getColor(R.color.colorAccent));
                                LinearLayout layout = (LinearLayout) findViewById(R.id.aleg_layout);
                                layout.addView(aleg_btnEvents);
                                String btnref= "referendum";
                                String btnpre= "presidential";
                                String btnpar= "parliamentary";

                                if(aleg_btnEvents.getText().toString().equals(btnref)) {

                                    aleg_btnEvents.setOnClickListener(new View.OnClickListener() {
                                        @Override
                                        public void onClick(View v) {
                                            Toast.makeText(getApplicationContext(),
                                                    "Redirecting...", Toast.LENGTH_SHORT).show();

                                            Intent vot = new Intent(Alegeri.this, Referendum.class);
                                            vot.putExtra("Event",event3);
                                            startActivity(vot);
                                        }
                                    });
                                }
                                else  if(aleg_btnEvents.getText().toString().equals(btnpre))
                                {
                                    aleg_btnEvents.setOnClickListener(new View.OnClickListener() {
                                        @Override
                                        public void onClick(View v) {
                                            Log.i("65", event1.nume+event1.candidates.get(0).nume);
                                            Toast.makeText(getApplicationContext(),
                                                    "Redirecting...", Toast.LENGTH_SHORT).show();

                                            Intent vot = new Intent(Alegeri.this, Vot.class);
                                            vot.putExtra("Event",event1);
                                            startActivity(vot);
                                        }
                                    });
                                }
                                else
                                if(aleg_btnEvents.getText().toString().equals(btnpar))
                                {
                                    aleg_btnEvents.setOnClickListener(new View.OnClickListener() {
                                        @Override
                                        public void onClick(View v) {
                                            Log.i("657", event2.toString());
                                            Toast.makeText(getApplicationContext(),
                                                    "Redirecting...", Toast.LENGTH_SHORT).show();

                                            Intent vot = new Intent(Alegeri.this, Vot.class);
                                            vot.putExtra("Event",event2);
                                            startActivity(vot);
                                        }
                                    });
                                }

                            }

                        }
                        catch (final JSONException e) {
                           Log.e("987",e.getMessage());
                        }

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

        Log.i("456", "run: Next");


        }

}
