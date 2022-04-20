# TP_Reader
TP_Reader je lokalny http service urceny pre OS Windows, ktory umoznuje akemukolvek lokalnemu IS citat pomocou pripojenej citacky zaznamy z elektronickeho (cipoveho) technickeho preukazu motoroveho vozidla.

Implementacia pre ine OS (Linux, MAC OS) je planovana do buducna (zatial mam len WIN)

Pomocou jednoducheho HTTP GET volania na localhost obdrzi volajuci IS kompletnu informaciu o vozidle ktoreho elektronicky technicky preukaz (maly TP s chipom) je zasunuty v citacke.

Do buducna zvazujem aj lokalne poskytovany WS, kde by boli distribuovane aj eventy o tom, ked sa karta zasunie ci vysunie z citacky...

Priklad volania jednoducheho volania z vannila js:

```
let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:26453/technicak");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4 && xhr.status == 200) {
      var jsonResponse = JSON.parse(xhr.responseText);
      console.log(jsonResponse);
   }};

xhr.send();
```

Vysledny JSON objekt:

```
{
   "s_ATR":"3BD21802C10A31FE58C80D51",
   "s_Doklad":"Registracne osvedcenie pre vozidlo",
   "s_Krajina":"Slovenska Republika",
   "r_Obalka_A":{
      "s_verzia":"1.0",
      "s_stat":"Slovenska republika",
      "s_stat2":"",
      "s_organ":"Ministerstvo vnutra Slovenskej republiky",
      "s_sub_organ":"",
      "s_charset":"00",
      "s_id_dokladu":"ALA00000",
      "s_ecv":"HD999SH",
      "s_d_p_reg":"YYYYMMDD",
      "r_osobne_udaje":{
         "r_drzitel":{
            "s_priezvisko":"DEMO DRZITEL s.r.o.",
            "s_ine":"",
            "s_adresa":"Horna Dolna c.999"
         },
         "s_rola":"01"
      },
      "r_vozidlo":{
         "s_znacka":"PORSCHE",
         "s_typ":"CAYENNE GTS 9PA/EP22/-",
         "s_oznacenie":"PORSCHE"
      },
      "s_ICV":"WP1VINVINVINVINVI",
      "s_hmotnost_max":"3080 kg",
      "s_hmotnost_pohot":"2320 kg",
      "s_platnost":"YYYYMMDD",
      "s_d_reg":"YYYYMMDD",
      "s_tschval":"e13*2001/*116*0089*08",
      "r_motor":{
         "s_objem":"4806.0 cm3",
         "s_max_vykon":"298.00 kW",
         "s_palivo":"BA 98 B"
      },
      "s_vykon_hm":"",
      "r_miesta":{
         "s_sedenie":"5",
         "s_statie":"0"
      }
   },
   "r_Obalka_B":{
      "s_verzia":"0",
      "r_osobne_udaje_A7":{
         "s_priezvisko":"VUB Leasing, a.s.",
         "s_ine":"",
         "s_adresa":"Bratislava - Ruzinov, Mlynske Nivy 1"
      },
      "r_osobne_udaje_A8":{
         "s_priezvisko":"",
         "s_ine":"",
         "s_adresa":""
      },
      "r_osobne_udaje_A9":{
         "s_priezvisko":"",
         "s_ine":"",
         "s_adresa":""
      },
      "s_kategoria_vozidla":"M1G",
      "s_pocet_naprav":"2",
      "s_razvor":"2855 mm",
      "s_hm_nal_vozidla1":"",
      "s_hm_nal_vozidla2":"6580 kg",
      "s_vaha_napr1":"1455 kg",
      "s_vaha_napr2":"1680 kg",
      "s_vaha_napr3":"",
      "s_vaha_napr4":"",
      "s_vaha_napr5":"",
      "s_tahane_brzdene":"3500 kg",
      "s_tahane_nebrzdene":"750 kg",
      "s_max_kr_otacky":"6500 min-1",
      "s_cislo_motora":"4MXXXXX",
      "s_farba":"ZLTA METALIZA - ZLATA/METALLIC GOLDEN YELLOW",
      "s_max_konstrukcna_rych":"251 km.h-1",
      "s_hluk1":"80.0 dB(A)",
      "s_hluk2":"4000 min-1",
      "s_hluk3":"75.0 dB(A)",
      "s_emis_co":".2250 g.km-1",
      "s_emis_hc":".0640 g.km-1",
      "s_emis_nox":".3230 g.km-1",
      "s_emis_hcnox":"",
      "s_emis_d_part":"",
      "s_emis_d_abs":"",
      "s_emis_co2":"310 g.km-1",
      "s_spotreba_komb":"13.9 l.100 km-1",
      "s_spotreba_ec_kat":"51-02",
      "s_nadrz":"100.0 l"
   }
}
```
