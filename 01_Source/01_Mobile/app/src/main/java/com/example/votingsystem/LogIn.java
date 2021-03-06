package com.example.votingsystem;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
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

import java.io.Console;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

public class LogIn extends BaseActivity {
    Button log_btnLog;
    EditText log_editName, log_editCNP;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);
        log_btnLog = (Button) findViewById(R.id.log_buttonLog);
        log_editName = (EditText) findViewById(R.id.log_editName);
        log_editCNP = (EditText) findViewById(R.id.log_editCNP);

        log_btnLog.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i("21", log_editName.getText().toString() + log_editCNP.getText().toString());
                loginCheck(log_editName.getText().toString(), log_editCNP.getText().toString());

            }
        });
    }

    private void loginCheck(final String name, final String cnp) {
        //if (log_editName.getText().toString().equals("admin") && log_editCNP.getText().toString().equals("1234567891234")) {
        Log.i("10",String.valueOf(log_editName.getText().toString().length()));
        Log.i("11",String.valueOf(cnp_check()));

     if (log_editName.getText().toString().length() > 7 && cnp_check() == true) {
         Log.i("23",cnp);
//         Toast.makeText(getApplicationContext(),
//                   "Redirecting...", Toast.LENGTH_SHORT).show();
//           startActivity(new Intent(LogIn.this, Alegeri.class));
         JSONObject jsonBodyObj = new JSONObject();
         try {
             jsonBodyObj.put("cnp", cnp);

         } catch (JSONException e) {
             e.printStackTrace();
         }
         final String requestBody = jsonBodyObj.toString();
         Log.i("89",requestBody);
         StringRequest stringRequest = new StringRequest(Request.Method.POST, "https://voting-system-3f.herokuapp.com/api/user/addNewUser",
                 new Response.Listener<String>() {
                     @Override
                     public void onResponse(String response) {
                         Log.d("123123", response);
                         if(response.equals("Can't Vote!"))
                         {  Toast.makeText(getApplicationContext(),
                                 "Login Failed! This CNP can't vote.", Toast.LENGTH_SHORT).show();

                         }
                         else {
                            userData = response;
                             Toast.makeText(getApplicationContext(),
                                     "Redirecting...", Toast.LENGTH_SHORT).show();
                             startActivity(new Intent(LogIn.this, Alegeri.class));
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

         RequestQueue requestQueue = Volley.newRequestQueue(this);
         requestQueue.add(stringRequest);
     }
     else if(log_editName.getText().toString().length() < 7 && cnp_check() == true )
     {
         Toast.makeText(getApplicationContext(),
                    "Wrong Name...", Toast.LENGTH_SHORT).show();
     }

    }
    public boolean cnp_check() {
        String text = log_editCNP.getText().toString();
        int nr_caractere = text.length();
        String nr_sex = text.substring(0, 1);
        String nr_year = text.substring(1, 3);
        String nr_month = text.substring(3, 5);
        String nr_day = text.substring(5,7);
        String nr_judet = text.substring(7,9);
        String nr_NNN = text.substring(9,12);
        String cifra_control = text.substring(12,13);
        int sex = Integer.parseInt(nr_sex.toString());

        int year = Integer.parseInt(nr_year.toString());
        int year_1  = Integer.parseInt(text.substring(1,2).toString());
        int year_2  = Integer.parseInt(text.substring(2,3).toString());

        int month = Integer.parseInt(nr_month.toString());
        int month_1  = Integer.parseInt(text.substring(3,4).toString());
        int month_2  = Integer.parseInt(text.substring(4,5).toString());

        int day = Integer.parseInt(nr_day.toString());
        int day_1  = Integer.parseInt(text.substring(5,6).toString());
        int day_2  = Integer.parseInt(text.substring(6,7).toString());

        int judet = Integer.parseInt(nr_judet.toString());
        int judet_1  = Integer.parseInt(text.substring(7,8).toString());
        int judet_2  = Integer.parseInt(text.substring(8,9).toString());

        int nnn = Integer.parseInt(nr_NNN.toString());
        int nnn_1  = Integer.parseInt(text.substring(9,10).toString());
        int nnn_2  = Integer.parseInt(text.substring(10,11).toString());
        int nnn_3  = Integer.parseInt(text.substring(11,12).toString());

        int cod = Integer.parseInt(cifra_control.toString());
        int cod_verify = (2*sex + 7*year_1 + 9*year_2+1*month_1+4*month_2+day_1*6+day_2*3+judet_1*5+judet_2*8+2*nnn_1+7*nnn_2+9*nnn_3)%11;
        if (nr_caractere == 13) {
            if (sex >= 1 && sex <= 8) {
                if((year <= 99 && year >= 60) || (year <=01 && year >= 00)){
                    if(month > 01 && month < 12){
                        if(day >= 01 && day <=31){
                            if(judet >=01 && judet <= 41) {
                                if(nnn >= 001 && nnn <= 999) {
                                    if (cod == cod_verify) {
                                        return true;
                                    }
                                    else
                                    {
                                        Toast.makeText(getApplicationContext(),
                                                "Wrong cod(last character)!", Toast.LENGTH_SHORT).show();
                                        return false;
                                    }
                                }
                                else
                                {
                                    Toast.makeText(getApplicationContext(),
                                            "Wrong NNN!", Toast.LENGTH_SHORT).show();
                                }
                            }
                            else
                            {
                                Toast.makeText(getApplicationContext(),
                                        "Wrong judet!", Toast.LENGTH_SHORT).show();
                            }
                        }
                        else
                        {
                            Toast.makeText(getApplicationContext(),
                                    "Wrong day!", Toast.LENGTH_SHORT).show();
                        }
                    }
                    else
                    {
                        Toast.makeText(getApplicationContext(),
                                "Wrong month!", Toast.LENGTH_SHORT).show();
                    }
                }
                else
                {
                    Toast.makeText(getApplicationContext(),
                            "Wrong year!", Toast.LENGTH_SHORT).show();
                }

            }
        }
        else {
            Toast.makeText(getApplicationContext(),
                    "CNP has 13 caracters!", Toast.LENGTH_SHORT).show();
        }
        return false;
    }

}
